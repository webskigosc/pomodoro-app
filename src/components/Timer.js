import Clock from './Clock';
import Controls from './Controls';

function Timer({
  title,
  timeLeftInSeconds,
  totalTimeInSeconds,
  isRunning,
  isPaused,
  countBreaks,
  countPauses,
  onStart,
  onStop,
  onPause,
  onEdit,
}) {
  const classInactive = !isRunning && !isPaused ? 'inactive' : '';

  if (totalTimeInSeconds <= 0) {
    throw new Error('Total time must be greater then zero.');
  }

  return (
    <div className={'card ' + classInactive}>
      <Clock
        title={title}
        isRunning={isRunning}
        isPaused={isPaused}
        countBreaks={countBreaks}
        countPauses={countPauses}
        timeLeftInSeconds={timeLeftInSeconds}
        totalTimeInSeconds={totalTimeInSeconds}
      />
      <Controls
        isRunning={isRunning}
        isPaused={isPaused}
        onStart={onStart}
        onStop={onStop}
        onPause={onPause}
        onEdit={onEdit}
      />
    </div>
  );
}

export default Timer;
