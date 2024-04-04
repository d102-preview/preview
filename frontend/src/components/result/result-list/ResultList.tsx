import ResultItem from './ResultItem';
import { formatInterviewTime } from '@/utils/formatDateTime';
import { useIntersectionObserver } from '@/hooks/@common/userIntersectionObserver';
import { useResult } from '@/hooks/result/useResult';
import { interviewType } from '@/types/model';
import { IResultListItem, IAnalysisListItem } from '@/types/result';

const ResultList = ({ type }: { type: interviewType }) => {
  const { useGetListInfinite } = useResult();
  const { data, fetchNextPage, hasNextPage } = useGetListInfinite({ page: 0, size: 10, type });
  const { setTarget } = useIntersectionObserver({ hasNextPage, fetchNextPage });

  return (
    <div className="w-full">
      {data?.pages.map(page =>
        page?.data.interviewList.content.map(
          (interview: IResultListItem) =>
            // 조건부 렌더링: analysisList에 항목이 있으면 면접 세트를 렌더링8
            interview.analysisList.length > 0 && (
              <div key={interview.id}>
                {/* 면접 연습 세트 */}
                <div className="flex items-center my-3">
                  <p className="font-semibold text-[#B0B0B0] mt-3">
                    {formatInterviewTime(interview.startTime)}
                    <span className="text-MAIN1 font-bold ml-2">{interview.analysisList.length}</span>
                  </p>
                  <div className="flex-grow border-t border-[#B0B0B0] ml-3 mt-3"></div>
                </div>
                {/* 면접 영상 */}
                <div className="grid grid-cols-4 gap-9">
                  {interview.analysisList.map((analysis: IAnalysisListItem) => (
                    <ResultItem
                      key={analysis.id}
                      id={analysis.id}
                      thumbnailPath={analysis.thumbnailPath}
                      type={type}
                      date={analysis.startTime}
                      question={analysis.question}
                      videoLength={analysis.videoLength}
                      status={analysis.status}
                    />
                  ))}
                </div>
              </div>
            ),
        ),
      )}
      <div ref={setTarget} className="h-[1rem]" />
    </div>
  );
};

export default ResultList;
