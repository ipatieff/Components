import { useEffect, useState } from 'react';
import styles from './CountDownCircleTimer.module.scss';

interface ICountdownCircleTimerProps {
  time: number;
  size: number;
  stroke: string;
  strokeWidth: number;
  onComplete?: VoidFunction;
  strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit' | undefined;
}

const CountDownCircleTimer: React.FC<ICountdownCircleTimerProps> = ({
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
  const strokeDashoffset = () => circumference - (countdown / milliseconds) * circumference;

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
    // eslint-disable-next-line
  }, [countdown]);

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{seconds}</label>
      <div className={styles.countdownContainer}>
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
            strokeDashoffset={strokeDashoffset()}
          />
        </svg>
      </div>
    </div>
  );
};

export default CountDownCircleTimer;
