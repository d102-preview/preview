import { APIResponse, interviewType } from '@/types/model';
import { axiosAuthInstance } from '@/apis/axiosInstance';
import { IResultListRes, IDealsResultListInfiniteReq } from '@/types/result';

// 분석 결과 목록 조회
export const getResultListReq = async ({
  type,
  page,
  size,
  sort,
}: IDealsResultListInfiniteReq): Promise<APIResponse<IResultListRes>> => {
  const res = await axiosAuthInstance.get(`/api/analysis/list/${type}`, {
    params: {
      page: page,
      size: size,
      sort: sort,
    },
  });
  return res.data;
};

export const getResultTotal = async (type: interviewType) => {
  const res = await axiosAuthInstance.get(`/api/analysis/list/${type}`);
  return res.data.data.interviewList.totalElements;
};
