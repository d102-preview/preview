import { checkAnalysisStatus, getResultListReq, getResultTotal } from '@/services/result/api';
import { interviewType } from '@/types/model';
import { IDealsResultListInfiniteReq } from '@/types/result';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

export const useResult = () => {
  const useGetListInfinite = (props: IDealsResultListInfiniteReq) => {
    return useInfiniteQuery({
      queryKey: ['result', props],
      queryFn: ({ pageParam }) => {
        return getResultListReq({ ...props, page: pageParam - 1 });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        // 마지막 페이지면
        if (lastPage.data.interviewList.last) return;

        return nextPage;
      },
    });
  };

  const useResultTotal = (type: interviewType) => {
    return useQuery({
      queryKey: ['result total', type],
      queryFn: () => getResultTotal(type),
    });
  };

  const useGetAnalysisStatus = (analysisId: number) => {
    return useQuery({
      queryKey: ['analysis', analysisId],
      queryFn: () => checkAnalysisStatus(analysisId),
      refetchInterval: 5000, // 5초마다 다시 가져오기
      enabled: false, // 초기에 비활성화
    });
  };

  return { useGetListInfinite, useResultTotal, useGetAnalysisStatus };
};