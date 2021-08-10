import Icons from './Icons';

function Controls({ isRunning, isPaused, onStart, onStop, onPause, onEdit }) {
  return (
    <div className="controls">
      <button
        onClick={onStart}
        className="btn btn--green btn--rounded btn--square--xl"
        disabled={isRunning && !isPaused}
      >
        <Icons name="play" />
      </button>
      <button
        onClick={onPause}
        className="btn btn--red btn--rounded btn--square--md"
        disabled={!isRunning || isPaused}
      >
        <Icons name="pause" />
      </button>
      <button
        onClick={onStop}
        className="btn btn--red btn--rounded btn--square--md"
        disabled={!isRunning}
      >
        <Icons name="stop" />
      </button>
      <button
        onClick={onEdit}
        className="btn btn--tan btn--rounded btn--square--md"
        disabled={isRunning && !isPaused}
      >
        <Icons name="settings" />
      </button>
    </div>
  );
}

export default Controls;
