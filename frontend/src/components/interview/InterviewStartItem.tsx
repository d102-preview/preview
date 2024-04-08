import Lottie, { Options as LottieOptions } from 'react-lottie';

interface IInterviewStartItemProps {
  tittle: string;
  subTitle: string;
  animationOptions: LottieOptions;
  advantageList: string[];
  children: React.ReactNode;
}

const InterviewStartItem = ({
  tittle,
  subTitle,
  animationOptions,
  advantageList,
  children,
}: IInterviewStartItemProps) => {
  return (
    <div className="w-80 flex flex-col gap-5 text-center">
      <div className="font-bold">
        <p className="text-sm text-BLACK">{subTitle}</p>
        <h2 className="text-6xl py-3">{tittle}</h2>
      </div>
      <Lottie options={animationOptions} height={200} width={250} />
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
