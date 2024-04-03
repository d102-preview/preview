import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions } from 'chart.js';
// import { IResult } from '@/types/result';

// interface IResult {
//   positive: number;
//   neutral: number;
//   negative: number;
// }

interface IPieChartProps {
  title: string;
  // result: IResult;
}

const PieChart = ({ title }: IPieChartProps) => {
  const uniqueKey = new Date().getTime() + 1516;
  const data = {
    labels: ['부정', '중립', '긍정'],
    datasets: [
      {
        label: `${title}`,
        // data: [result.positive, result.neutral, result.negative],
        data: [30, 20, 50],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
        padding: 20,
        margin: 20,
      },
    ],
    plugins: [ChartDataLabels],
  };

  const options: ChartOptions<'pie'> = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        align: 'center',
        color: context => {
          const index = context.dataIndex;
          const backgroundColor = context.dataset.borderColor;
          if (Array.isArray(backgroundColor)) {
            return backgroundColor[index];
          }
          return '#040404'; // 기본값
        },
        formatter: (value: number) => `${value}%`,
        font: {
          size: 22,
          weight: 'bold',
        },
      },
    },
  };

  return (
    <>
      <h4 className="text-[#696969] font-bold p-3">감정 분석 결과</h4>
      <div className="pb-3 flex flex-col items-center">
        <div className="w-2/3">
          <Pie data={data} options={options} key={uniqueKey} />
        </div>
      </div>
    </>
  );
};
export default PieChart;
