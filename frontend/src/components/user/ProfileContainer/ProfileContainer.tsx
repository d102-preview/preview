import EtcButton from '@/components/user/EtcButton/EtcButton';
import MyInfo from '@/components/user/MyInfo/MyInfo';
import Resume from '@/components/user/Resume/Resume';
import { useUser } from '@/hooks/user/useUser';

const ProfileContainer = () => {
  const { useGetUser } = useUser();
  const { data, isLoading, isError } = useGetUser();

  if (isLoading) return <div>로딩중</div>;
  if (!data) return <div>회원 정보가 없습니다</div>;
  if (isError) return <div>에러</div>;

  return (
    <div className="w-[40%] min-w-[400px] h-[calc(100vh-3.5rem)] mx-auto py-10 animate-showUp">
      <h1 className="text-2xl py-6">프로필</h1>
      <MyInfo user={data.data.user} />
      <Resume resume={data.data.user.resumeList} />
      <EtcButton />
    </div>
  );
};

export default ProfileContainer;
