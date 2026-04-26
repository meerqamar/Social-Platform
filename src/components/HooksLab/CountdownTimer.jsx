import { useState, useEffect } from 'react';
import './CountdownTimer.css';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return; // Stop when expired
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1); // Use updater form
    }, 1000);
    return () => clearInterval(interval); // Cleanup on re-render and unmount
  }, [timeLeft]); // Re-run when timeLeft changes

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setTimeLeft(600);
  };

  return (
    <div className="countdown-timer">
      <h3>Exercise 2: Countdown Timer</h3>
      <div className="timer-display">
        {timeLeft > 0 ? (
          <span>Time Left: {formatTime(timeLeft)}</span>
        ) : (
          <span className="expired">Offer Expired!</span>
        )}
      </div>
      <button onClick={handleReset}>Reset</button>
      <p>
        <strong>Stale Closure Investigation:</strong> If dependency array is [], timeLeft becomes stale inside the closure.
        The updater form (prev =&gt; prev - 1) fixes it because it receives the current state value at the time of execution,
        avoiding reliance on the potentially stale timeLeft from the closure.
      </p>
    </div>
  );
};

export default CountdownTimer;