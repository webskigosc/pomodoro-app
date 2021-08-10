function TaskEditor({
  title,
  totalTimeInMinutes,
  isPaused,
  onStart,
  onTitleChange,
  onTotalTimeInMinutesChange,
  isEditable,
}) {
  const isActive = isEditable || (isPaused && isEditable) ? true : false;

  return (
    <div
      className={'card card--grid card--col-3 ' + (!isActive ? 'inactive' : '')}
    >
      <label>
        Task
        <input
          type="text"
          value={title}
          onChange={onTitleChange}
          placeholder="Task"
          minLength="3"
          maxLength="120"
          disabled={!isActive}
        />
      </label>
      <label>
        Duration
        <input
          type="number"
          value={totalTimeInMinutes}
          onChange={onTotalTimeInMinutesChange}
          placeholder="25"
          min="1"
          max="59"
          pattern="[0-9]{2}"
          disabled={!isActive}
        />
      </label>
      <button
        onClick={onStart}
        className="btn btn--brown btn--rounded btn--square--xl"
        disabled={!isActive}
      >
        GO
      </button>
    </div>
  );
}

export default TaskEditor;
