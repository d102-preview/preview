import { useUser } from '@/hooks/user/useUser';
import EtcButton from '../EtcButton/EtcButton';
import MyInfo from '../MyInfo/MyInfo';
import Resume from '../Resume/Resume';

const ProfileContainer = () => {
  const { useGetUser } = useUser();
  const { data, isLoading, isError } = useGetUser();

  console.log(data);

  if (isLoading) return <div>로딩중</div>;
  if (!data) return <div>로딩</div>;
  if (isError) return <div>에러</div>;

  return (
    <div className="w-[40%] min-w-[400px] mx-auto py-10 animate-showUp">
      <h1 className="text-2xl py-6">프로필</h1>
      <MyInfo user={data?.data?.user} />
      <Resume resume={data?.data?.user?.resumeList} />
      <EtcButton />
    </div>
  );
};

export default ProfileContainer;
