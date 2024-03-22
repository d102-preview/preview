import { IoMdMegaphone } from 'react-icons/io';

const RecordSetting = () => {
  return (
    <>
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-52 h-52 rounded-full border-2 border-dashed border-white flex justify-center items-center text-white text-xl font-bold text-center">
          <p>
            얼굴을 화면 중앙에 <br />
            맞춰주세요
          </p>
        </div>
      </div>
      <div>
        <div className="absolute bottom-0 w-[40rem] ">
          <div className=" text-white m-6 p-5 text-center bg-black/70 rounded-lg">
            <div className="flex justify-center items-center gap-2">
              <IoMdMegaphone size={18}></IoMdMegaphone>
              <p>면접 연습은 카페나 시끄러운 곳이 아닌 조용한 장소에서 진행해주세요.</p>
            </div>
            <p>주변 소음이 섞이게 되면 정확한 분석이 어려울 수 있습니다</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecordSetting;
