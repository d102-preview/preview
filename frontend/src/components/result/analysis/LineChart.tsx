import { useRef } from 'react';
import { Chart } from 'chart.js';
import { ChartOptions } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
// import { IResult } from '@/types/result';

Chart.register(annotationPlugin);

interface LineChartProps {
  title: string;
  currentTime: number;
  onTimeChange: (time: number) => void;
  // result: IResult;
}

const LineChart = ({ title, currentTime, onTimeChange }: LineChartProps) => {
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
        // label: `프레임별 ${title}`,
        data: [
          0, -1, 1, 0, 1, -1, 1, -1, 0, 0, 1, -1, 0.3, 1, 1, 0.9, 1, 0, -1, 1, 1, 0, 0, -1, 1, 0, 1, -1, -1, 1, 1, 0, 1,
          1, 0.2, 0, -1, -1, 0, 0.5, 1, 1, 1, 0, -1, 0, 1, 0, -1, 1, 0, 0, 1, -1, 1, 1, -1, 1, 0, 0, 1, -1, 0, 1, 1, 0,
          0, -1, 1, 0, 1, -1, 1, 0, 0, 1, -1, 0, 1, 1, 0, 1, 0, -1, 1, 0.7, 1, 0.8, 1, 0, 0.5, -1, 0.5, 0.7, 1, 0,
        ], // 가상의 데이터
        fill: false,
        borderColor: '#5A8AF2',
        tension: 0.5,
        backgroundColor: 'rgba(90, 138, 242, 0.06)',
        pointRadius: 0,
        spanGaps: true, // false: 빈 데이터가 있을 때 자연스럽게 채워줌(공백으로 표시 안됨)
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
        min: -1.5, // 최소값을 -1로 설정 (부정)
        max: 1.5, // 최대값을 1로 설정 (긍정)
        ticks: {
          // y축의 값을 긍정, 중립, 부정으로 변환
          callback: value => {
            if (value === 1) return '긍정';
            if (value === 0) return '중립';
            if (value === -1) return '부정';
          },
          font: {
            size: 20, // 글자 크기
            weight: 'bold', // 글자 굵기
          },
          color: context => {
            const value = context.tick.value;
            if (value === 1) return '#5A8AF2'; // 긍정일 때는 녹색
            if (value === 0) return '#EAB50D'; // 중립일 때는 파란색
            if (value === -1) return '#F98282'; // 부정일 때는 빨간색
            return 'black'; // 기본값은 검은색
          },
        },
      },
      x: {
        type: 'linear',
        min: 0,
        max: 80, // 비디오 길이(초 단위)
        display: true,
        ticks: {
          callback: (tickValue: string | number) => {
            const value = typeof tickValue === 'number' ? tickValue : parseFloat(tickValue);
            if (value > 60) {
              const min = Math.floor(value / 60);
              const sec = value % 60;
              return `${min}분 ${sec}초`;
            }
            return `${value}초`;
          },
        },
      },
    },
    onClick: onCanvasClick as any, // 타입 오류 임시 조치
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
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
            yMin: 0,
            yMax: 0,
            borderColor: '#F9D654',
            borderWidth: 0.5,
          },
        },
      },
    },
  };

  return (
    <div className="p-3">
      <h4 className="text-2xl text-[#696969] font-bold pb-7">프레임별 {title}</h4>
      <Line data={data} options={options} ref={chartRef} />
    </div>
  );
};
export default LineChart;
