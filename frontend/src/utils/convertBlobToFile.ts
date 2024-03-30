// Blob 객체를 파일로 변환
export const convertBlobToFile = (theBlob: Blob[], fileName: string): File => {
  const file = new File([...theBlob], fileName, { type: 'video/mp4' });
  return file;
};
