import Icons from './Icons';
import Button from './Button';

function Controls({ isRunning, isPaused, onStart, onStop, onPause, onEdit }) {
  return (
    <div className="controls">
      <Button
        color="green"
        size="xl"
        onClick={onStart}
        disabled={isRunning && !isPaused}
      >
        <Icons name="play" />
      </Button>
      <Button color="red" onClick={onPause} disabled={!isRunning || isPaused}>
        <Icons name="pause" />
      </Button>
      <Button color="red" onClick={onStop} disabled={!isRunning}>
        <Icons name="stop" />
      </Button>
      <Button onClick={onEdit} disabled={isRunning && !isPaused}>
        <Icons name="settings" />
      </Button>
    </div>
  );
}

export default Controls;
