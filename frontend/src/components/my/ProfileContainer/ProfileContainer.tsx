import EtcButton from '../EtcButton/EtcButton';
import MyInfo from '../MyInfo/MyInfo';
import Resume from '../Resume/Resume';

const ProfileContainer = () => {
  return (
    <div className="w-[40%] min-w-[400px] mx-auto py-10 animate-showUp">
      <h1 className="text-2xl py-6">프로필</h1>
      <MyInfo />
      <Resume />
      <EtcButton />
    </div>
  );
};

export default ProfileContainer;
