import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import very_bad from '@/assets/images/very_bad.png';
import bad from '@/assets/images/bad.png';
import soso from '@/assets/images/soso.png';
import good from '@/assets/images/good.png';
import very_good from '@/assets/images/very_good.png';

const getBackgroundImage = (percent: number) => {
  if (percent >= 0 && percent <= 20) {
    return very_bad;
  } else if (percent > 20 && percent <= 40) {
    return bad;
  } else if (percent > 40 && percent <= 60) {
    return soso;
  } else if (percent > 60 && percent <= 80) {
    return good;
  } else {
    return very_good;
  }
};

const DoughnutChart = ({ percent }) => {
  const backgroundImage = getBackgroundImage(percent);

  const data = {
    labels: ['진행률', '남은 비율'],
    datasets: [
      {
        label: '면접 합격 가능성',
        data: [percent, 100 - percent],
        backgroundColor: ['#5A8AF2', 'transparent'],
        borderColor: ['#5A8AF2', 'transparent'],
        borderWidth: 0,
        borderRadius: 30,
      },
    ],
  };

  const options = {
    cutout: '90%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    hover: {
      mode: null,
    },
  };

  return (
    <div className="flex flex-col p-3">
      <div className="relative w-72 h-72">
        <div className="relative z-10">
          <Doughnut data={data} options={options} />
        </div>
        <img src={backgroundImage} className="absolute inset-0 w-full h-full z-0" />
        <div className="flex text-center justify-center items-center text-lg mt-3">
          <p className="text-[#B0B0B0] mr-2">면접 합격 가능성</p>
          <p className="text-UNIMPORTANT_TEXT font-bold">{percent}%</p>
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
