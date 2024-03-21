interface IResultItemProps {
  result: 'ok' | 'fail';
  id: number;
  imagePath: string;
  type: 'mock' | 'main';
  date: Date;
  question: string;
  time: string;
}

const ResultItem = ({ result, id, imagePath, type, date, question, time }: IResultItemProps) => {
  const formatDate = dateString => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };

  return (
    <div className="bg-white rounded-lg py-1">
      <div className="relative">
        <div className="text-xs text-white text-center bg-BLACK p-1 w-10 rounded-md z-10 absolute right-2 bottom-2">
          <span>{time}</span>
        </div>
        <img
          src={imagePath}
          alt={`Profile of user ${id}`}
          className="bg-cover bg-center rounded-lg bg-inherit shadow-md"
        />
      </div>
      <div className="flex justify-between mx-1 mt-2">
        <span className="text-sm text-MAIN1">{type == 'mock' ? '모의 면접' : '실전 면접'}</span>
        <span className="text-xs text-UNIMPORTANT_TEXT mr-1">{formatDate(date)}</span>
      </div>
      <span className="font-semibold text-BLACK text-lg mx-1">Q. {question}</span>
    </div>
  );
};

export default ResultItem;
