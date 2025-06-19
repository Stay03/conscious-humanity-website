import React, { useState, useEffect } from 'react';

const EventCountdownBadge = ({ startDate }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(startDate) - new Date();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return {
          days,
          hours,
          minutes,
          seconds
        };
      }

      return null;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Set initial value
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [startDate]);

  if (!timeLeft) {
    return (
      <span className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold">
        Event Starting Now!
      </span>
    );
  }

  return (
    <span className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold">
      {timeLeft.days > 0 ? (
        `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m`
      ) : timeLeft.hours > 0 ? (
        `${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
      ) : timeLeft.minutes > 0 ? (
        `${timeLeft.minutes}m ${timeLeft.seconds}s`
      ) : (
        `${timeLeft.seconds}s`
      )}
    </span>
  );
};

export default EventCountdownBadge;
