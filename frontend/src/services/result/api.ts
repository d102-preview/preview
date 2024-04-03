import { APIResponse, IStatusRes, interviewType } from '@/types/model';
import { axiosAuthInstance } from '@/apis/axiosInstance';
import { IResultListRes, IDealsResultListInfiniteReq, IAnalysisDetailRes } from '@/types/result';

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

// 분석 결과 총 개수 조회
export const getResultTotal = async (type: interviewType) => {
  const res = await axiosAuthInstance.get(`/api/analysis/list/${type}`);
  return res.data.data.interviewList.totalElements;
};

// 분석 영상 상태 확인
export const checkAnalysisStatus = async (analysisId: number): Promise<APIResponse<IStatusRes>> => {
  const res = await axiosAuthInstance.get(`/api/task/analysis/list/${analysisId}`);
  return res.data;
};

// 분석 결과 상세 조회
export const getDetailResult = async (analysisId: number): Promise<APIResponse<IAnalysisDetailRes>> => {
  const res = await axiosAuthInstance.get(`/api/analysis/${analysisId}`, {params: {analysisId: analysisId}});
  return res.data;
};