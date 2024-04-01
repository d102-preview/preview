// 면접 영상 시간 00:00
export const formatVideoLength = (length: number) => {
  const minutes = Math.floor(length / 60);
  const seconds = length % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
