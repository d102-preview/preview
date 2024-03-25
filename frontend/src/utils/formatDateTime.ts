// 면접 시간 fomat 함수 - ex) 2024. 03. 24. 오후 05:05
export const formatInterviewTime = (dateTimeString: string | Date): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const date = typeof dateTimeString === 'string' ? new Date(dateTimeString) : dateTimeString;
  return date.toLocaleDateString('ko-KR', options);
};

// 면접 세트 시간 fomat 함수 - ex) 2024. 03. 24.
export const formatInterviewSetTime = (dateString: string | Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  return date.toLocaleDateString('ko-KR', options);
};
