import React, { useEffect, useState } from 'react';

function Testing() {
  const [date, setDate] = useState(new Date());

  const calculateTime = () => {
    const nextWednesday = new Date(date);
    nextWednesday.setDate(date.getDate() + ((3 + 7 - date.getDay()) % 7));
    nextWednesday.setHours(9, 0, 0, 0);

    const diff = nextWednesday - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (date.getDay() === 3 && date.getHours() === 9 && date.getMinutes() === 0) {
      window.location.reload();
    }
  }, [date]);

  const time = calculateTime();

  return (
    <div>
      <h1>Testing</h1>
      <p>Current time: {date.toString()}</p>
      <p>Time until next Wednesday 9:00: {time.days} days, {time.hours} hours, {time.minutes} minutes, {time.seconds} seconds</p>
    </div>
  );
}

export default Testing;
