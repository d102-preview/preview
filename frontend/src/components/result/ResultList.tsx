import ResultItem from './ResultItem';
import IMAGE1 from '@/assets/images/interview1.png';

const ResultList = () => {
  // 더미 데이터
  const setTime = new Date();
  const resultItemsData = [
    {
      result: 'fail',
      id: 1,
      imagePath: IMAGE1,
      type: 'mock',
      date: new Date(),
      question: '지원자의 강점(장점)은 무엇입니까?',
      time: '00:33',
    },
    {
      result: 'fail',
      id: 2,
      imagePath: IMAGE1,
      type: 'mock',
      date: new Date(),
      question: '지원자의 강점(장점)은 무엇입니까?',
      time: '00:33',
    },
    {
      result: 'ok',
      id: 3,
      imagePath: IMAGE1,
      type: 'mock',
      date: new Date(),
      question: '지원자의 강점(장점)은 무엇입니까?',
      time: '00:33',
    },
    {
      result: 'ok',
      id: 4,
      imagePath: IMAGE1,
      type: 'mock',
      date: new Date(),
      question: '지원자의 강점(장점)은 무엇입니까?',
      time: '00:33',
    },
    {
      result: 'ok',
      id: 5,
      imagePath: IMAGE1,
      type: 'mock',
      date: new Date(),
      question: '지원자의 강점(장점)은 무엇입니까?',
      time: '00:33',
    },
  ];

  const formatDate = (dateString: Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };

  return (
    <div>
      <div className="flex items-center mb-3">
        <p className="font-semibold text-[#B0B0B0] text-lg">{formatDate(setTime)}</p>
        <div className="flex-grow border-t-2 border-[#B0B0B0)] ml-3"></div>
      </div>
      <div className="grid grid-cols-3 gap-9">
        {resultItemsData.map(item => (
          <ResultItem
            key={item.id}
            result={item.result as 'ok' | 'fail'}
            id={item.id}
            imagePath={item.imagePath}
            type={item.type as 'mock' | 'main'}
            date={item.date}
            question={item.question}
            time={item.time}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultList;
