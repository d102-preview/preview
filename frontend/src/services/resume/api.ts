import { axiosFileInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { IPostResumeRes } from '@/types/resume';

export const postResume = async (resume: FormData): Promise<APIResponse<IPostResumeRes>> => {
  const res = await axiosFileInstance.post('/file/upload/resume', resume);
  return res.data;
};

export const getResume = async (resumeId: string): Promise<string> => {
  const res = await axiosFileInstance.get(`/file/download/resume/${resumeId}`, {
    responseType: 'blob',
  });
  return res.data;
};

export const deleteResume = async (resumeId: string): Promise<APIResponse<null>> => {
  const res = await axiosFileInstance.delete(`/file/manage/resume/${resumeId}`);
  return res.data;
};
