import { TbArrowBigRightFilled } from 'react-icons/tb';
interface IHasKeywordsProps {
  text: string;
  keywords: string[];
  totalNum: number;
  includedNum: number;
}

const HasKeywords = ({ text, keywords, totalNum, includedNum }: IHasKeywordsProps) => {
  const highlightText = (text: string, keywords: string[]) => {
    // 정규표현식: 키워드 뒤에 올 수 있는 한국어 조사 처리
    const regex = new RegExp(
      `(${keywords.join('|')})(은|는|이|가|을|를|과|와|의|으로|로|에게|께|에서|에게서|고|이라고|라고|처럼|입니다|습니다|로서|로써)?`,
      'g',
    );

    // 정규표현식을 통해 텍스트 분할(키워드, 조사, 그외의 텍스트 분할)
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          keywords.includes(part) ? (
            <span className="text-lg text-MAIN1 font-semibold" key={index}>
              {part}
            </span>
          ) : (
            <span className="text-lg text-BLACK" key={index}>
              {part}
            </span>
          ),
        )}
      </>
    );
  };

  return (
    <div className="p-3">
      <h4 className="text-2xl text-[#696969] font-bold pb-3">답변 내용</h4>
      <div className="border rounded-lg p-7">{highlightText(text, keywords)}</div>
      <h4 className="text-2xl text-[#696969] font-bold pt-7">핵심 키워드</h4>
      <div className="pt-1 text-lg">
        {/* 포함된 키워드 스타일 */}
        {keywords.map((keyword, index) => (
          <span
            className="inline-flex items-center px-3 py-1 m-1 font-medium  rounded-full ring-1 ring-inset bg-blue-50 text-MAIN1 ring-blue-700/10"
            key={index}
          >
            {keyword}
          </span>
        ))}

        {/* 포함 안 된 키워드 스타일 */}
        {keywords.map((keyword, index) => (
          <span
            className="inline-flex items-center px-3 py-1 m-1 font-medium  rounded-full ring-1 ring-inset bg-gray-50 text-gray-600 ring-gray-500/10"
            key={index}
          >
            {keyword}
          </span>
        ))}
      </div>
      <p className="flex items-center gap-2 text-BLACK text-xl mt-4 mx-3">
        <TbArrowBigRightFilled size={25} color='#404040' />
        {`미리 작성된 핵심 키워드 ${totalNum} 중 ${includedNum}개가 포함되어 있습니다. `}
      </p>
    </div>
  );
};
export default HasKeywords;
