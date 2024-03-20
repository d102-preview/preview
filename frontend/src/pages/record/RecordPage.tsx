import Button from '@/components/@common/Button/Button';
import InterviewQuestion from '@/components/record/InterviewQuestion';
import RecordTimer from '@/components/record/RecordTimer';
import RecordSetting from '@/components/record/RecordSetting';
import { useInterview } from '@/hooks/interview/useInterview';
import { useCallback, useEffect, useRef, useState } from 'react';
import BackgroundOpacity from '@/components/record/BackgroundOpacity';

const RecordPage = () => {
  const { useGetMainInterviewQuestionList } = useInterview();
  const { data: questionList, mutate, isSuccess } = useGetMainInterviewQuestionList();
  /*
    stream 연결 전 상태는 stream으로 판단
    pending -> 카메라, 마이크 세팅 중 (사용자가 파란색 다음버튼을 눌렀을 때 다음 상태로 변경)
    preparing -> 질문을 받아와 녹화대기 중인 상태 (사용자가 녹화시작 버튼을 눌렀을 때 다음 상태로 변경)
    recording -> 이후 RecordTimer 컴포넌트에서 카운트 다운 시작하고 종료하면 녹화 시작
    uploading -> 녹화한 영상을 서버에 업로드하는 중 (사용자가 직접 다음을 누르거나 타이머가 다 지났을 때 다시 recording 상태로 변경)
  */
  const [status, setStatus] = useState<'pending' | 'preparing' | 'recording' | 'uploading'>('pending');
  const videoRef = useRef<HTMLVideoElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);

  const getMediaPermission = useCallback(async () => {
    try {
      const video = { audio: true, video: true };

      const videoStream = await navigator.mediaDevices.getUserMedia(video);
      setStream(videoStream);

      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const nextButtonClick = async () => {
    if (stream && !isSuccess) {
      mutate();
      setStatus('preparing');
    } else if (stream && isSuccess) {
      console.log('녹화하기');
      setStatus('recording');
    } else {
      alert('카메라와 마이크를 확인해보세요');
    }
  };

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

  useEffect(() => {
    console.log(questionList);
  }, [questionList]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full h-screen pb-10">
        <div className="w-[58rem] relative flex justify-end pb-5 text-center">
          <p className="absolute top-0 left-1/2 -translate-x-1/2 font-bold text-3xl">
            {!stream ? '카메라, 마이크를 준비중입니다' : !isSuccess ? '다음 버튼을 눌러주세요' : ''}
          </p>
          <Button
            text={isSuccess ? '녹화시작' : '다음'}
            height="h-9"
            backgroundColor={stream ? 'bg-MAIN1' : 'bg-gray-200'}
            textColor="text-white"
            onClick={() => nextButtonClick()}
          />
        </div>
        <div className="relative bg-black px-[9rem]">
          <video className="w-[40rem] h-[30rem]" ref={videoRef} autoPlay />
          {stream && status === 'pending' && <RecordSetting />}
          {stream && status === 'preparing' && (
            <>
              <InterviewQuestion />
              <BackgroundOpacity />
              <div className="absolute bottom-0 w-[40rem] ">
                <div className=" text-white m-6 p-5 text-center bg-black/70 rounded-lg">
                  <p>질문당 30초의 시간이 주어집니다</p>
                  <p>준비됐으면 녹화시작 버튼을 눌러주세요</p>
                </div>
              </div>
            </>
          )}
          {status === 'recording' && (
            <>
              <BackgroundOpacity />
              <RecordTimer />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordPage;
