import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { IIntent } from '@/types/result';

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
  intentList: IIntent[];
}

const BarChart = ({ title, intentList }: IBarChartProps) => {
  // 원본 데이터
  const originalData = intentList.map(item => item.ratio);
  const labels = intentList.map(item => item.expression);
  const category = intentList.map(item => item.category);
  const borderColor = ['#FFE0E6', '#D7ECFB', '#FFF5DD', '#DBF2F2', '#EBE0FF'];

  // 가장 큰 값 찾기
  const maxValue = Math.max(...originalData);

  // 데이터를 최대값으로 나누어 비율 계산
  const adjustedData = originalData.map(value => (value / maxValue) * 100);

  // 막대 그래프 데이터와 설정
  const data = {
    labels: labels,
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
        ],
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          // color: '#5A8AF2', // 레이블 색상 조정
          font: {
            size: 14,
            weight: 'bold',
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
        display: false,
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
      <div>
        <h4 className="text-2xl text-[#696969] font-bold pb-3">주요 {title}</h4>
        <Bar data={data} options={options} />
      </div>
      <div className="flex flex-wrap gap-3 justify-center py-5 items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-full w-fit p-6 text-center" style={{ backgroundColor: borderColor[i] }}>
            <p className="text-sm text-[#696969]">{category[i]}</p>
            <p>{labels[i]}</p>
            <p className="text-xl font-bold text-BLACK pt-1">{originalData[i]}%</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default BarChart;
