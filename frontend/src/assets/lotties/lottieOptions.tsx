import robot from '@/assets/lotties/robot.json';
import loading1 from '@/assets/lotties/loading1.json';
import loading2 from '@/assets/lotties/loading2.json';
import loading3 from '@/assets/lotties/loading3.json';
import positive from '@/assets/lotties/positive.json';
import positive2 from '@/assets/lotties/positive2.json';
import negative from '@/assets/lotties/negative.json';
import neutral from '@/assets/lotties/neutral.json';

export const robotOptions = {
  loop: true,
  autoplay: true,
  animationData: robot,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const loadingOptions = {
  loop: true,
  autoplay: true,
  animationData: loading1,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const loadingOptions2 = {
  loop: true,
  autoplay: true,
  animationData: loading2,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const loadingOptions3 = {
  loop: true,
  autoplay: true,
  animationData: loading3,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const negativeOptions = {
  loop: true,
  autoplay: true,
  animationData: negative,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const neutralOptions = {
  loop: true,
  autoplay: true,
  animationData: neutral,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const positiveOptions = {
  loop: true,
  autoplay: true,
  animationData: positive,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const positiveOptions2 = {
  loop: true,
  autoplay: true,
  animationData: positive2,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
