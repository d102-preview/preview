import robot from '@/assets/lotties/robot.json';
import loading from '@/assets/lotties/loading.json';
import positive from '@/assets/lotties/positive.json';
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
  animationData: loading,
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
