interface IHasKeywordsProps {
  answer: string;
  keywords: string[];
}

const HasKeywords = ({ answer, keywords }: IHasKeywordsProps) => {
  // 정규표현식을 이용하여 키워드와 조사를 하이라이팅
  const highlightText = (text: string, keywords: string[]) => {
    const regex = new RegExp(
      `(${keywords.join('|')})(은|는|이|가|을|를|과|와|의|으로|로|에게|께|에서|에게서|고|이라고|라고|처럼|입니다|습니다|로서|로써)?`,
      'g',
    );
    const parts = text.split(regex);
    return parts.map((part, index) => (
      <span key={index} className={keywords.includes(part) ? 'text-MAIN1 font-semibold' : 'text-BLACK'}>
        {part}
      </span>
    ));
  };

  // 포함된 키워드 계산
  const includedKeywords = keywords.filter(keyword => answer.includes(keyword));
  const includedCount = includedKeywords.length;

  return (
    <div className="p-3">
      <h4 className=" text-[#696969] font-bold pb-3">답변 내용</h4>
      <div className="border rounded-lg p-7">{highlightText(answer, keywords)}</div>

      {keywords.length > 0 && (
        <>
          <div className="flex items-end pt-3">
            <h4 className=" text-[#696969] font-bold mt-3">
              핵심 키워드
              <span className="font-normal items-center gap-2 text-[#818181]  mx-1">
                : 미리 작성된 핵심 키워드 <span className="text-MAIN1 font-medium ">{keywords.length}개</span> 중{' '}
                <span className="text-MAIN1 font-medium">{includedCount}개의 키워드</span>가 포함되어 있습니다.
              </span>
            </h4>
          </div>
          <div className="pt-1  mt-3">
            {keywords.map((keyword, index) => (
              <span
                key={index}
                className={`inline-flex items-center px-3 py-1 m-1 font-medium rounded-full ring-inset ${
                  includedKeywords.includes(keyword)
                    ? 'bg-blue-50 text-MAIN1 ring-blue-700/10 ring-1'
                    : 'bg-red-50  text-red-600 ring-red-600/10 ring-1'
                }`}
              >
                {keyword}
              </span>
            ))}
          </div>
          {includedCount !== keywords.length && (
            <p className="text-sm pt-1 pl-3 text-red-600">
              * 빨간색으로 표시된 키워드는 '포함되지 않은 키워드' 입니다.
            </p>
          )}
        </>
      )}
    </div>
  );
};
export default HasKeywords;
