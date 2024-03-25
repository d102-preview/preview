import { useEffect, useState } from 'react';

interface ITimerProps {
  minute: number;
  second?: number;
  interval?: number;
  timeoutFunc?: () => void;
}

const Timer = ({ minute, second = 0, interval = 1, timeoutFunc }: ITimerProps) => {
  const milisecond = (minute * 60 + second) * 1000;
  const timerInterval = interval * 1000;
  const [timeLeft, setTimeLeft] = useState<number>(milisecond);

  const showMinute = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
  const showSecond = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - timerInterval);
    }, timerInterval);

    if (timeLeft <= 0) {
      if (timeoutFunc) {
        timeoutFunc();
      }
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  return (
    <div className={`${Number(showMinute) === 0 && Number(showSecond) <= 10 && 'text-red-500'} text-sm w-14`}>
      {showMinute} : {showSecond}
    </div>
  );
};

export default Timer;
