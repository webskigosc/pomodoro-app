import Icons from './Icons';

function TasksListElement({
  title,
  totalTimeInMinutes,
  isEdit,
  taskTemp,
  onEdit,
  onDelete,
  onUpdate,
  onTitleChange,
  onTotalTimeInMinutesChange,
}) {
  const isEditable = isEdit && taskTemp;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate();
  };

  return (
    <div className={'task ' + (isEditable ? 'task--editable' : '')}>
      <form className="task__editor" onSubmit={handleSubmit}>
        <input
          value={isEditable ? taskTemp.title : title}
          onChange={onTitleChange}
          type="text"
          minLength="3"
          maxLength="120"
          required={true}
          disabled={!isEdit}
        />

        <input
          value={isEditable ? taskTemp.totalTimeInMinutes : totalTimeInMinutes}
          onChange={onTotalTimeInMinutesChange}
          type="number"
          min="1"
          max="59"
          pattern="[0-9]{2}"
          required={true}
          disabled={!isEdit}
        />

        {isEditable ? (
          <button
            type="submit"
            className="btn btn--rounded btn--square--sm btn--green"
          >
            <Icons name="check" />
          </button>
        ) : (
          <span
            onClick={onEdit}
            className="btn btn--rounded btn--square--sm btn--tan"
          >
            <Icons name="edit" />
          </span>
        )}
      </form>

      <button
        onClick={onDelete}
        disabled={isEdit}
        className="btn btn--red btn--rounded btn--square--sm"
      >
        <Icons name="delete" />
      </button>
    </div>
  );
}

export default TasksListElement;
