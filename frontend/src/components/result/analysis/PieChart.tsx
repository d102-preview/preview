import { Pie } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// import { IResult } from '@/types/result';

interface IResult {
  positive: number;
  neutral: number;
  negative: number;
}

interface IPieChartProps {
  title: string;
  result: IResult;
}

const PieChart = ({ title, result }: IPieChartProps) => {
  const data = {
    labels: ['긍정', '중립', '부정'],
    datasets: [
      {
        label: `${title}`,
        // data: [result.positive, result.neutral, result.negative],
        data: [50, 20, 30],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
    plugins: [ChartDataLabels],
  };

  const options: ChartOptions<'pie'> = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: {
        formatter: function (value, context) {
          const idx = context.dataIndex; // 각 데이터 인덱스

          // 출력 텍스트
          // return context.chart.data.labels[idx] + value + '%';
        },
        align: 'top',
        color: '#666',
      },
    },
  };

  return (
    <>
      <div className="p-3">
        <h4 className="text-2xl text-[#696969] font-bold pb-7">프레임별 {title}</h4>
        <Pie data={data} options={options} />
      </div>
    </>
  );
};
export default PieChart;
