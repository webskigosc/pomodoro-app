import React from 'react';

import Timer from './Timer';
import TaskEditor from './TaskEditor';
import ErrorBoundary from './ErrorBoundary';

class TaskTimer extends React.Component {
  constructor(props) {
    console.count('TaskTimer - constructor');
    super(props);
    this.state = {
      title: 'Learning React',
      totalTimeInMinutes: 25,
      elapsedTimeInSeconds: 0,
      isRunning: false,
      isPaused: false,
      isEditable: true,
      countPauses: 0,
      countBreaks: 0,
    };
  }

  componentDidMount() {
    console.count('TaskTimer - componentDidMount');
  }
  componentDidUpdate() {
    console.count('TaskTimer - componentDidUpdate');
  }
  componentWillUnmount() {
    console.count('TaskTimer - componentWillUnmount');
  }

  handleStart = () => {
    console.count('TaskTimer - setState');
    this.setState({
      isRunning: true,
      isPaused: false,
      isEditable: false,
    });

    this.startTimer();
  };

  handleStop = () => {
    console.count('TaskTimer - setState');
    this.setState({
      isRunning: false,
      isPaused: false,
      isEditable: true,
      countPauses: 0,
      elapsedTimeInSeconds: 0,
    });

    this.stopTimer();
  };

  togglePause = () => {
    console.count('TaskTimer - setState');
    this.setState((prevState) => {
      const isPaused = !prevState.isPaused;
      return {
        isPaused,
        countPauses: isPaused
          ? prevState.countPauses + 1
          : prevState.countPauses,
      };
    });

    this.stopTimer();
  };

  startTimer() {
    const dateStartInMilliseconds =
      this.state.elapsedTimeInSeconds > 0
        ? Date.now() - this.state.elapsedTimeInSeconds * 1000
        : Date.now();

    this.intervalID = window.setInterval(() => {
      const dateNowInMilliseconds = Date.now();
      this.setState({
        elapsedTimeInSeconds: Math.floor(
          (dateNowInMilliseconds - dateStartInMilliseconds) / 1000
        ),
      });
    }, 1000);
  }

  stopTimer() {
    window.clearInterval(this.intervalID);
  }

  handleTitleChange = (event) => {
    console.count('TaskTimer - setState');
    this.setState({ title: event.target.value });
  };

  handleTotalTimeInMinutesChange = (event) => {
    console.count('TaskTimer - setState');
    this.setState({ totalTimeInMinutes: event.target.value });
  };

  handleEdit = () => {
    console.count('TaskTimer - setState');
    this.setState({
      isEditable: true,
    });
  };

  render() {
    console.count('TaskTimer - render');
    const {
      title,
      totalTimeInMinutes,
      elapsedTimeInSeconds,
      isRunning,
      isPaused,
      isEditable,
      countBreaks,
      countPauses,
    } = this.state;

    const totalTimeInSeconds = totalTimeInMinutes * 60;
    const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;

    return (
      <div className="task-timer">
        {!isEditable ? (
          <ErrorBoundary message="Sorry. We have timer error.">
            <Timer
              title={title}
              totalTimeInSeconds={totalTimeInSeconds}
              timeLeftInSeconds={timeLeftInSeconds}
              isRunning={isRunning}
              isPaused={isPaused}
              countBreaks={countBreaks}
              countPauses={countPauses}
              onStart={this.handleStart}
              onStop={this.handleStop}
              onPause={this.togglePause}
              onEdit={this.handleEdit}
            />
          </ErrorBoundary>
        ) : (
          <TaskEditor
            title={title}
            totalTimeInMinutes={totalTimeInMinutes}
            isRunning={isRunning}
            isPaused={isPaused}
            isEditable={isEditable}
            onStart={this.handleStart}
            onTitleChange={this.handleTitleChange}
            onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
          />
        )}
      </div>
    );
  }
}

export default TaskTimer;
