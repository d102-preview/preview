import React, { useEffect, ReactNode } from 'react';
import { Chart } from 'chart.js';
import * as helpers from 'chart.js/helpers';

// window 객체에 Chart와 helpers 프로퍼티를 추가하기 위한 타입 확장
declare global {
  interface Window {
    Chart: typeof Chart;
    helpers: typeof helpers;
  }
}

interface ILabelPluginProviderProps {
    children: ReactNode;
  }

const LabelPluginProvider: React.FC<ILabelPluginProviderProps> = ({ children }) => {
  useEffect(() => {
    window.Chart = Chart;
    window.helpers = helpers;
    import('chart.js-plugin-labels-dv');
  }, []);

  return <>{children}</>;
};

export default LabelPluginProvider