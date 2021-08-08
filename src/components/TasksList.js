import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import TaskCreator from './TaskCreator';
import TasksListElement from './TasksListElement';

class TasksList extends React.Component {
  state = {
    edit: false,
    taskTemp: {
      id: '',
      title: 'Focus on... any task You want!',
      totalTimeInMinutes: '25',
    },
    tasks: [
      { id: uuidv4(), title: 'Learning React', totalTimeInMinutes: '25' },
      { id: uuidv4(), title: 'Learning GraphQL', totalTimeInMinutes: '35' },
      { id: uuidv4(), title: 'Just chill :)', totalTimeInMinutes: '55' },
    ],
  };

  handleAdd = () => {
    this.setState((prevState) => {
      const newTaskTemp = { ...prevState.taskTemp };
      newTaskTemp.id = uuidv4();
      return {
        taskTemp: { id: '', title: '', totalTimeInMinutes: '' },
        tasks: [newTaskTemp, ...prevState.tasks],
      };
    });
  };

  handleEdit = (taskID) => {
    this.setState({
      edit: true,
      taskTemp: Object.assign(
        {},
        ...this.state.tasks.filter((task) => task.id === taskID)
      ),
    });
  };

  handleUpdate = () => {
    this.setState((prevState) => ({
      edit: false,
      taskTemp: { id: '', title: '', totalTimeInMinutes: '' },
      tasks: [...this.state.tasks].map((task) =>
        task.id === prevState.taskTemp.id ? (task = prevState.taskTemp) : task
      ),
    }));
  };

  handleDelete = (taskID) => {
    this.setState((prevState) => {
      const updatedTasksArray = [...prevState.tasks].filter(
        (task) => task.id !== taskID
      );
      return { tasks: updatedTasksArray };
    });
  };

  handleTitleChange = (e) => {
    this.setState((prevState) => {
      const updatedTaskTemp = prevState.taskTemp;
      updatedTaskTemp.title = e.target.value;
      return { taskTemp: updatedTaskTemp };
    });
  };

  handleTotalTimeInMinutesChange = (e) => {
    this.setState((prevState) => {
      const updatedTaskTemp = prevState.taskTemp;
      updatedTaskTemp.totalTimeInMinutes = e.target.value;
      return { taskTemp: updatedTaskTemp };
    });
  };

  render() {
    const { edit, taskTemp, tasks } = this.state;

    return (
      <div className="TasksList">
        <TaskCreator
          isEdit={edit}
          titleTemp={taskTemp.title}
          totalTimeInMinutesTemp={taskTemp.totalTimeInMinutes}
          onAdd={this.handleAdd}
          onUpdate={this.handleUpdate}
          onTitleChange={this.handleTitleChange}
          onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
        />
        {tasks.map((task) => (
          <TasksListElement
            key={task.id}
            title={task.title}
            totalTimeInMinutes={task.totalTimeInMinutes}
            isEdit={edit}
            taskTemp={task.id === taskTemp.id ? taskTemp : false}
            onEdit={() => this.handleEdit(task.id)}
            onDelete={() => this.handleDelete(task.id)}
            onUpdate={this.handleUpdate}
            onTitleChange={this.handleTitleChange}
            onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
          />
        ))}
      </div>
    );
  }
}

export default TasksList;
