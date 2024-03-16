interface IInterviewStartItemProps {
  tittle: string;
  subTitle: string;
  imgSrc: string;
  advantageList: string[];
  children: React.ReactNode;
}

const InterviewStartItem = ({ tittle, subTitle, imgSrc, advantageList, children }: IInterviewStartItemProps) => {
  return (
    <div className="w-80 flex flex-col gap-5 text-center">
      <div className="font-bold">
        <p className="text-sm text-BLACK">{subTitle}</p>
        <h2 className="text-6xl py-3">{tittle}</h2>
      </div>
      <img src={imgSrc} className="w-56 mx-auto"></img>
      <ul className="flex flex-col gap-1 text-sm text-left list-disc px-5 pb-3 ">
        {advantageList.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
      {children}
    </div>
  );
};

export default InterviewStartItem;
