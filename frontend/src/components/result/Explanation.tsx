interface IExplanation {
  message?: string;
  tipTitle: string;
  tipContent: string;
}

const Explanation = ({ message, tipTitle, tipContent }: IExplanation) => {
  return (
    <div className="px-3">
      <p className="text-BLACK p-2 mb-3 whitespace-pre-line text-sm">{message}</p>
      <div className="bg-[#FEF9E6] rounded-xl p-3  pt-3 border-[#F9D654] border-r-4 border-b-4">
        <h3 className="font-semibold text-[#696969] pt-1">💡 {tipTitle}의 중요성</h3>
        <p className="text-UNIMPORTANT_TEXT text-sm p-3">{tipContent}</p>
      </div>
    </div>
  );
};
export default Explanation;
