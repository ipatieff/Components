import { useEffect, useState, FC, useMemo } from 'react';
import styles from './CountDownCircleTimer.module.scss';

interface ICountDownCircleTimerProps {
  time: number;
  size: number;
  stroke: string;
  strokeWidth: number;
  onComplete?: VoidFunction;
  strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit' | undefined;
}

const CountDownCircleTimer: React.FC<ICountDownCircleTimerProps> = ({
  time,
  size,
  stroke,
  onComplete,
  strokeWidth,
  strokeLinecap = 'round',
}) => {
 const radius = size / 2;
  const milliseconds = time * 1000;
  const circumference = size * Math.PI;

  const [countdown, setCountdown] = useState(milliseconds);

  const seconds = (countdown / 1000).toFixed();

  const strokeDashoffset = circumference - (countdown / milliseconds) * circumference;

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 10);
      } else {
        clearInterval(interval);
        onComplete && onComplete();
      }
    }, 10);
    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <div className={styles.root}>
      <label className={styles.seconds}>{seconds}</label>
      <div className={styles.countDownContainer}>
        <svg className={styles.svg} width={size} height={size}>
          <circle
            fill="none"
            r={radius}
            cx={radius}
            cy={radius}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
      </div>
    </div>
  );
};

export default CountDownCircleTimer;
