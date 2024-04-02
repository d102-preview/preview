import Footer from '@/components/@common/Footer/Footer';
import Header from '@/components/@common/Header/Header';
import HomeContent from '@/components/home/HomeContent';

const HomePage = () => {
  return (
    <div className="w-screen h-auto relative">
      <Header page={'main'} />
      <HomeContent />
      <Footer />
    </div>
  );
};

export default HomePage;
