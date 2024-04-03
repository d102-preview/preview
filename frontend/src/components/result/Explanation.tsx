interface IExplanation {
  message?: string;
  tipTitle: string;
  tipContent: string;
}

const Explanation = ({ message, tipTitle, tipContent }: IExplanation) => {
  return (
    <div className="px-5">
      <p className="text-BLACK text-xl py-1 mb-3 whitespace-pre-line">{message}</p>
      <div className="bg-[#FEF9E6] rounded-xl p-5 border-[#F9D654] border-r-8 border-b-8">
        <h3 className="font-semibold text-xl text-[#696969] pt-1">💡 {tipTitle}의 중요성</h3>
        <p className="text-UNIMPORTANT_TEXT text-lg p-3">{tipContent}</p>
      </div>
    </div>
  );
};
export default Explanation;
