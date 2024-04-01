// ISO8601 형식의 현재 시간 return
export const getCurrentTime = (): string => {
  const timezoneOffset = new Date().getTimezoneOffset() * 60000;
  const timezoneDate = new Date(Date.now() - timezoneOffset);

  return timezoneDate.toISOString().split('.')[0];
};
