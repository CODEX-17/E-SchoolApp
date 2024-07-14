import React, { useEffect, useState } from 'react'
import style from './TimerComponent.module.css'

const TimerComponent = ({ duration, handleSubmitAnswer }) => {
  // Initialize state with hours, minutes, and seconds
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: duration,
    seconds: 0,
  });

  useEffect(() => {
    // Set the interval to update the timer every second
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          seconds = 59;
          minutes -= 1;
        } else if (hours > 0) {
          seconds = 59;
          minutes = 59;
          hours -= 1;
        } else {
          // Time is up
          clearInterval(interval)
          handleSubmitAnswer()
          console.log('Time is up!');
          return { hours: 0, minutes: 0, seconds: 0 };
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    // Cleanup the interval if the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={style.timer}>
      <p>
        Time left: {timeLeft.hours.toString().padStart(2, '0')}:
        {timeLeft.minutes.toString().padStart(2, '0')}:
        {timeLeft.seconds.toString().padStart(2, '0')}
      </p>
    </div>
  );
};

export default TimerComponent;
