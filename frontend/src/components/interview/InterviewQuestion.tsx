const InterviewQuestion = () => {
  return (
    <div className="absolute top-0 left-0 right-0 mx-[9.2rem] px-5 bg-[#1D1D1D] rounded-b-xl ">
      <div className="flex justify-between items-center font-bold gap-5 my-2">
        <div className="whitespace-nowrap bg-white rounded-2xl py-1 px-3">
          <p>질문</p>
        </div>
        <p className="text-white">지원자의 강점(장점)은 무엇입니까?</p>
        <div className="flex justify-center items-center gap-2 text-white border border-white rounded-2xl py-1 px-3">
          <div className="w-[0.3rem] h-[0.3rem] bg-red-700 rounded-full"></div>
          <p>00:27</p>
        </div>
      </div>
    </div>
  );
};

export default InterviewQuestion;
