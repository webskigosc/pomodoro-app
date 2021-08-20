import PropTypes from 'prop-types';

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

const defaultEventType = (event) => console.log('Event type:', event.type);

TaskEditor.defaultProps = {
  title: '',
  totalTimeInMinutes: 25,
  onStart: defaultEventType,
  onTitleChange: defaultEventType,
  onTotalTimeInMinutesChange: defaultEventType,
};

function NonNegativeNonGreaterTimeType(props, propsName, componentName) {
  if (props[propsName] < 1 || props[propsName] > 59) {
    return new Error(
      `Invalid props '${propsName} ' in component '${componentName}'. It has to be greater than 0 and less than 59`
    );
  }
}

TaskEditor.propTypes = {
  title: PropTypes.string.isRequired,
  // totalTimeInMinutes: PropTypes.number.isRequired,
  totalTimeInMinutes: NonNegativeNonGreaterTimeType,
  isPaused: PropTypes.bool.isRequired,
  isEditable: PropTypes.bool.isRequired,
  onStart: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onTotalTimeInMinutesChange: PropTypes.func.isRequired,
};

export default TaskEditor;
