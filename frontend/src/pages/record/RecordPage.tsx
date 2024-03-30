import Button from '@/components/@common/Button/Button';
import InterviewQuestion from '@/components/record/InterviewQuestion';
import RecordTimer from '@/components/record/RecordTimer';
import RecordSetting from '@/components/record/RecordSetting';
import { useInterview } from '@/hooks/interview/useInterview';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import BackgroundOpacity from '@/components/record/BackgroundOpacity';
import RecordUploading from '@/components/record/RecordUploading';
import { useSpeechRecognition } from 'react-speech-kit';
import { GrNotes } from 'react-icons/gr';
import CheatSheetModal from '@/components/record/CheatSheetModal';
import { IInterviewAnalyzeRes } from '@/types/interview';
import { convertBlobToFile } from '@/utils/convertBlobToFile';
import { getCurrentTime } from '@/utils/getCurrentTime';

export type recordStatusType = 'pending' | 'preparing' | 'recording' | 'proceeding' | 'uploading';

const RecordPage = () => {
  const { useGetMainInterviewQuestionList, usePostInterviewAnalyze } = useInterview();
  const { data: questionList, mutate: getQuestionList, isSuccess } = useGetMainInterviewQuestionList();
  const { mutate: postInterviewAnalyze } = usePostInterviewAnalyze();
  const [questionIndex, setQuestionIndex] = useState<number>(0); // 질문 인덱스 상태 관리
  /*
    stream 연결 전 상태는 stream으로 판단
    pending -> 카메라, 마이크 세팅 중 (사용자가 파란색 다음버튼을 눌렀을 때 다음 상태로 변경)
    preparing -> 질문을 받아와 녹화대기 중인 상태 (사용자가 녹화시작 버튼을 눌렀을 때 다음 상태로 변경)
    recording -> 이후 RecordTimer 컴포넌트에서 카운트 다운 시작하고 종료하면 녹화 시작
    proceeding -> 녹화 진행중인 상태
    uploading -> 녹화한 영상을 서버에 업로드하는 중 (사용자가 직접 다음을 누르거나 타이머가 다 지났을 때 다시 recording 상태로 변경)
  */
  const [status, setStatus] = useState<recordStatusType>('pending');

  // "거울",  화면에 보여지는 역할
  const videoRef = useRef<HTMLVideoElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);

  // 면접 진행 시작 세트 타임 관리
  const [startTime, setStartTime] = useState<string>('');
  const getMediaPermission = useCallback(async () => {
    try {
      const video = { audio: true, video: true };

      const videoStream = await navigator.mediaDevices.getUserMedia(video);
      setStream(videoStream);
      setStartTime(getCurrentTime());

      if (videoRef.current) {
        console.log('세팅');
        videoRef.current.srcObject = videoStream;
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  // 버튼 상태 관리
  const [btnText, setBtnText] = useState<string>('다음');
  const getButtonText = useCallback(() => {
    switch (status) {
      case 'preparing':
        setBtnText('녹화시작');
        break;
      case 'uploading':
        setBtnText('');
        break;
      case 'proceeding':
        setBtnText('녹화종료');
        break;
      case 'recording':
        setBtnText('');
        break;
    }
  }, [status]);

  const nextButtonClick = async () => {
    if (!stream) {
      alert('카메라와 마이크를 확인해보세요');
      return;
    }

    if (status === 'pending') {
      // @TODO 이력서 선택 + 이력서 id 바꿔줘야함
      getQuestionList(3);
      setStatus('preparing');
    } else if (status === 'preparing') {
      setStatus('recording');
    } else if (status === 'proceeding') {
      setStatus('uploading');
      handleStopRecording();
    }
  };

  useEffect(() => {
    console.log(status);
    getButtonText();

    switch (status) {
      case 'preparing':
        break;
      case 'uploading':
        setIsOpen(false);
        break;
      case 'proceeding': // 녹화 및 STT 시작
        handleStartRecording();
        listen({ interimResults: false, lang: 'ko-KR' });
        break;
      case 'recording':
        setIsOpen(false);
        break;
    }
  }, [status]);

  // dom내부에선 보여지지 않지만, 내부에서 "녹화"에 대한 기능만을 수행합니다.
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);

  const handleStartRecording = () => {
    setRecordedBlobs([]);

    try {
      // MediaRecorder 생성자 호출
      mediaRecorderRef.current = new MediaRecorder(stream as MediaStream, {
        mimeType: 'video/webm; codecs=vp9',
      });
      console.log(mediaRecorderRef.current);

      // 전달받은 데이터를 처리
      // 녹화된 미디어 데이터가 사용 가능할 때 트리거됩니다. (handleStopRecording 호출 시)
      mediaRecorderRef.current.ondataavailable = event => {
        if (event.data && event.data.size > 0) {
          setRecordedBlobs(prev => [...prev, event.data]);
          console.log('데이터처리 Blob 객체 생성');
        }
      };
      mediaRecorderRef.current.start();
    } catch (e) {
      console.log('MediaRecorder error');
    }
  };

  // 녹화 종료 시
  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      stop();
      console.log(stt);

      mediaRecorderRef.current.stop();
    }
  };

  useEffect(() => {
    console.log(recordedBlobs);
    if (recordedBlobs.length) {
      const time = getCurrentTime();
      const filename = questionIndex + '_' + time + '.mp4';
      const videoFile = convertBlobToFile(recordedBlobs, filename);

      const check = questionList?.data.questionList[questionIndex];
      const req: IInterviewAnalyzeRes = {
        type: check!.type,
        question: check!.question,
        answer: stt,
        skip: skip,
        setStartTime: startTime,
        keywordList: check!.keywordList,
      };
      const formData = new FormData();
      const json = JSON.stringify(req);

      formData.append('analysisRequestDto', json);
      formData.append('video', videoFile);
      postInterviewAnalyze(formData);
    }
  }, [recordedBlobs]);

  useEffect(() => {
    // 아직 media stream이 설정되지 않았다면 호출
    if (!stream) {
      getMediaPermission();
    }

    // 페이지 이탈 또는 컴포넌트 언마운트 시 미디어 스트림 정지
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // STT 상태 관리
  const [stt, setStt] = useState<string>('');
  const { listen, stop } = useSpeechRecognition({
    onResult: (result: string) => {
      // 음성인식 결과가 value 상태값으로 할당
      setStt(prev => {
        return prev + ' ' + result;
      });
    },
  });

  // 모달 상태 관리
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 타이머 세팅 상태 관리
  const [timerSetting, setTimerSetting] = useState<number>(30);
  const radioHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTimerSetting(Number(e.target.value));
  };

  // skip 상태 관리 (10초 이내면 true)
  const [skip, setSkip] = useState<boolean>(false);

  return (
    <div>
      <div className="flex flex-col justify-center items-center min-w-[58rem] h-screen pb-10">
        <div className="w-[58rem] h-14 relative flex justify-end pb-5 text-center">
          <p className="absolute top-0 left-1/2 -translate-x-1/2 font-bold text-3xl">
            {!stream ? '카메라, 마이크를 준비중입니다' : !isSuccess ? '다음 버튼을 눌러주세요' : ''}
          </p>
          {btnText && (
            <Button
              text={btnText}
              height="h-9"
              backgroundColor={stream ? 'bg-MAIN1' : 'bg-gray-200'}
              textColor="text-white"
              onClick={() => nextButtonClick()}
            />
          )}
        </div>
        <div className="relative bg-black px-[9rem]">
          <video className="w-[40rem] h-[30rem] -scale-x-100" ref={videoRef} autoPlay />

          {stream && status === 'pending' && <RecordSetting />}

          {stream && status === 'preparing' && (
            <>
              <BackgroundOpacity />
              {questionList && (
                <InterviewQuestion
                  timerSetting={timerSetting}
                  question={questionList.data.questionList[questionIndex]}
                  setStatus={setStatus}
                  setSkip={setSkip}
                  status={status}
                  handleStopRecording={handleStopRecording}
                />
              )}
              <div className="absolute bottom-0 w-[40rem]">
                <div className="flex justify-around text-white m-6 p-5  text-center bg-black/50 rounded-lg">
                  <p>녹화 시간 설정</p>
                  <div className="flex gap-5">
                    <div className="flex gap-2">
                      <input id="thirty" type="radio" value={30} onChange={radioHandler} checked={timerSetting == 30} />
                      <label htmlFor="thirty">30초</label>
                    </div>
                    <div className="flex gap-2">
                      <input id="sixty" type="radio" value={60} onChange={radioHandler} checked={timerSetting == 60} />
                      <label htmlFor="sixty">60초</label>
                    </div>
                    <div className="flex gap-2">
                      <input id="ninety" type="radio" value={90} onChange={radioHandler} checked={timerSetting == 90} />
                      <label htmlFor="ninety">90초</label>
                    </div>
                  </div>
                </div>
              </div>
              <GrNotes
                onClick={() => setIsOpen(!isOpen)}
                size={20}
                color="white"
                className="absolute bottom-0 right-0 m-6 cursor-pointer"
              />
              {/* 모의면접일때만 modal 보여주기 */}
              {isOpen && questionList && (
                <CheatSheetModal question={questionList.data.questionList[questionIndex]} setIsOpen={setIsOpen} />
              )}
            </>
          )}

          {stream && status === 'recording' && (
            <>
              <BackgroundOpacity />
              <RecordTimer setStatus={setStatus} />
            </>
          )}

          {stream && questionList && status === 'proceeding' && (
            <>
              <InterviewQuestion
                timerSetting={timerSetting}
                question={questionList.data.questionList[questionIndex]}
                setStatus={setStatus}
                setSkip={setSkip}
                status={status}
                handleStopRecording={handleStopRecording}
              />
              <GrNotes
                onClick={() => setIsOpen(!isOpen)}
                size={20}
                color="white"
                className="absolute bottom-0 right-0 m-6 cursor-pointer"
              />
              {isOpen && questionList && (
                <CheatSheetModal question={questionList.data.questionList[questionIndex]} setIsOpen={setIsOpen} />
              )}
            </>
          )}

          {stream && questionList && status === 'uploading' && (
            <>
              <RecordUploading
                questionList={questionList.data.questionList}
                questionIndex={questionIndex}
                setQuestionIndex={setQuestionIndex}
                setStatus={setStatus}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordPage;
