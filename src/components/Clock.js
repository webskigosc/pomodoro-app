function Clock({
  title,
  isRunning,
  isPaused,
  countBreaks,
  countPauses,
  timeLeftInSeconds,
  totalTimeInSeconds,
}) {
  const secondsLeft = Math.floor(timeLeftInSeconds % 60);
  const minutesLeft = Math.floor(timeLeftInSeconds / 60);

  const convertNumber = (value, maxValue = 59, maxLength = 2) => {
    if (value < 0) {
      value = 0;
    }
    if (value > maxValue) {
      value = maxValue;
    }
    return value.toString().padStart(maxLength, '0');
  };

  return (
    <div className="Clock">
      <h2>{title}</h2>
      <div className="Clock__progress">
        <svg className="progress__bg" viewBox="0 0 42 42">
          <circle cx="21" cy="21" r="20" fill="none" strokeWidth="2" />
        </svg>
        <svg
          className="progress__circle progress__circle--animate"
          viewBox="0 0 42 42"
        >
          <circle
            cx="21"
            cy="21"
            r="20"
            fill="none"
            strokeWidth="2"
            style={{
              animationName: isRunning ? 'progress-circle-stroke' : '',
              animationDuration: totalTimeInSeconds + 's',
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          />
        </svg>
        <div className="progress__state">
          <span className="state__time">
            {convertNumber(minutesLeft)}:{convertNumber(secondsLeft)}
          </span>
          <span className="state__counter">{countBreaks} / 3 Breaks</span>
          <span className="state__counter">{countPauses} Pauses</span>
        </div>
      </div>
    </div>
  );
}

export default Clock;
