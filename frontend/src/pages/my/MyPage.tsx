import Header from '@/components/@common/Header/Header';
import ProfileContainer from '@/components/user/ProfileContainer/ProfileContainer';

const MyPage = () => {
  return (
    <div className="h-screen overflow-y-scroll">
      <Header />
      <ProfileContainer />
    </div>
  );
};

export default MyPage;
