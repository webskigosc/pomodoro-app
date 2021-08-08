import React from 'react';
import Icons from './Icons';

class TaskCreator extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    if (this.props.isEdit) {
      this.props.onUpdate();
    } else {
      this.props.onAdd();
    }
  };

  render() {
    const {
      isEdit,
      onTitleChange,
      onTotalTimeInMinutesChange,
      titleTemp,
      totalTimeInMinutesTemp,
    } = this.props;

    return (
      <div className="TaskCreator">
        <h2>{isEdit ? 'Edit Your task' : 'Add new task'}</h2>
        <form onSubmit={this.handleSubmit}>
          <label className="f-width">
            Task
            <input
              value={titleTemp}
              onChange={onTitleChange}
              name="title"
              type="text"
              minlength="3"
              maxlength="120"
              placeholder="Focus on... any task You want!"
              required={true}
            />
          </label>
          <label>
            Duration
            <input
              value={totalTimeInMinutesTemp}
              onChange={onTotalTimeInMinutesChange}
              name="time"
              type="number"
              placeholder="25"
              min="1"
              max="59"
              pattern="[0-9]{2}"
              required={true}
            />
          </label>
          <button className="btn btn--green btn--rounded btn--square--xl">
            <Icons name={isEdit ? 'check' : 'add'} />
          </button>
        </form>
      </div>
    );
  }
}

export default TaskCreator;
