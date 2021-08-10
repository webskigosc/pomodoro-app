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
      <>
        <h2 className="title title--color-tan">
          {isEdit ? 'Edit Your task' : 'Add new task'}
        </h2>
        <form
          className="card card--grid card--col-3"
          onSubmit={this.handleSubmit}
        >
          <label>
            Task
            <input
              value={titleTemp}
              onChange={onTitleChange}
              name="title"
              type="text"
              minLength="3"
              maxLength="120"
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
      </>
    );
  }
}

export default TaskCreator;
