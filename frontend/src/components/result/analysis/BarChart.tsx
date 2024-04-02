import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels, // 플러그인 등록
);

interface IBarChartProps {
  title: string;
}

const BarChart = ({ title }: IBarChartProps) => {
  const uniqueKey = new Date().getTime();
  // 원래 데이터
  const originalData = [12, 19, 3, 5, 2, 3];

  // 가장 큰 값 찾기
  const maxValue = Math.max(...originalData);

  // 데이터를 최대값으로 나누어 비율 계산
  const adjustedData = originalData.map(value => (value / maxValue) * 100);

  // 막대 그래프 데이터와 설정
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '',
        data: adjustedData, // 조정된 데이터 사용
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#FE777B', // 레이블 색상 조정
          font: {
            size: 14, // 폰트 크기 조정
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        color: '#FE777B',
        anchor: 'end',
        align: 'end',
        formatter: (value: number) => value,
      },
    },
    indexAxis: 'y',
  };

  return (
    <>
      <div className="p-3">
        <h4 className="text-2xl text-[#696969] font-bold pb-7">주요 {title}</h4>
        <Bar data={data} options={options} key={uniqueKey} />
      </div>
    </>
  );
};

export default BarChart;
