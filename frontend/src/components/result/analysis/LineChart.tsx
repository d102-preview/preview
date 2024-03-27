import { useRef } from 'react';
import { Chart } from 'chart.js';
import { ChartOptions } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);

interface LineChartProps {
  currentTime: number;
  onTimeChange: (time: number) => void;
}

const LineChart = ({ currentTime, onTimeChange }: LineChartProps) => {
  const chartRef = useRef<Chart<'line', number[], unknown> | null>(null);

  const onCanvasClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }
    const xValue = chart.scales.x.getValueForPixel(event.nativeEvent.offsetX) || 0;
    onTimeChange(xValue);
  };

  const data = {
    labels: Array.from({ length: 80 }, (_, i) => i), // 80초 분량의 라벨
    datasets: [
      {
        label: '프레임별 움직임',
        data: [
          0, 0.5, 1, 1.3, 1.5, 1.8, 2, 2.1, 2, 1.9, 2, 2.1, 2.2, 2.3, 2.1, 2.4, 2.3, 2.3, 2.2, 2.1, 2.1, 2, 2, 2.1, 2.3,
          2.5, 2.6, 2.7, 2.7, 2.8, 2.9, 3, 3.1, 3.1, 3, 3.3, 3.4, 3.5, 3.5, 3.7, 3.9, 4, 4, 3.9, 3.9, 3.8, 3.7, 3.5,
          3.5, 3.4, 3.4, 3.3, 3, 2.5, 2.4, 2, 2, 1.9, 2, 2.2, 2.3, 2.5, 3, 3.1, 3.2, 3.2, 3.1, 3.1, 3.2, 3.1, 3.1, 3,
          2.9, 2.8, 2.7, 2.5, 2, 1.9, 1.5, 1.3,
        ], // 가상의 데이터
        fill: true,
        borderColor: '#5A8AF2',
        tension: 0.5,
        backgroundColor: 'rgba(90, 138, 242, 0.06)',
        pointRadius: 1,
        spanGaps: false, // false: 빈 데이터가 있을 때 자연스럽게 채워줌(공백으로 표시 안됨)
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    layout: {
      padding: 15,
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
      },
      x: {
        type: 'linear',
        min: 0,
        max: 80, // 비디오 길이(초 단위)
        display: false,
      },
    },
    onClick: onCanvasClick as any, // 타입 오류 임시 조치
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      annotation: {
        annotations: {
          Timebar: {
            type: 'line',
            xMin: currentTime,
            xMax: currentTime,
            borderColor: '#AC1312',
            borderWidth: 5,
          },
          middleLine: {
            type: 'line',
            yMin: 2,
            yMax: 2,
            borderColor: '#9EB1DF',
            borderWidth: 0.5,
          },
        },
      },
    },
  };

  return (
    <div className="p-3">
      <h4 className="text-2xl text-[#696969] font-bold pb-7">프레임별 움직임</h4>
      <Line data={data} options={options} ref={chartRef} />
    </div>
  );
};
export default LineChart;
