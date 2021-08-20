import PropTypes from 'prop-types';

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
    <div className="clock">
      <h2>{title}</h2>
      <div className="progress">
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
        <div className="state">
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

Clock.defaultProps = {
  title: '',
  countBreaks: 0,
  countPauses: 0,
};

const NumberOfStringType = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
]);

Clock.propTypes = {
  title: PropTypes.string.isRequired,
  isRunning: PropTypes.bool.isRequired,
  isPaused: PropTypes.bool.isRequired,
  countBreaks: NumberOfStringType.isRequired,
  countPauses: NumberOfStringType.isRequired,
  timeLeftInSeconds: PropTypes.number.isRequired,
  totalTimeInSeconds: PropTypes.number.isRequired,
};

export default Clock;
