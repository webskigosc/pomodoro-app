function AppWrapper() {
  return (
    <>
      <Header title="Pomodoro" description="Your favorite task timer" />
      <TasksList />
      {/* <App /> */}
      <Footer />
    </>
  );
}

class TasksList extends React.Component {
  state = {
    tasks: [
      { title: 'Learning React', totalTimeInMinutes: 25 },
      { title: 'Learning GraphQL', totalTimeInMinutes: 35 },
      { title: 'Chill at a beach party', totalTimeInMinutes: 55 },
    ],
  };

  handleCreate = (task) => {
    task = { title: 'New task dummy', totalTimeInMinutes: 25 };

    this.setState((prevState) => {
      const newTasks = prevState.tasks.concat(task);
      return { tasks: newTasks };
    });
  };

  handleEdit = (index, task) => {
    this.setState((prevState) => {
      const editedTasks = [...prevState.tasks];
      editedTasks[index] = task;
      return { tasks: editedTasks };
    });
  };

  handleDelete = (indexToDelete) => {
    this.setState((prevState) => {
      const updatedTasks = [...prevState.tasks];
      updatedTasks.splice(indexToDelete, 1);
      return { tasks: updatedTasks };
    });
  };

  render() {
    return (
      <main className="TasksList">
        <TaskCreator onCreate={this.handleCreate} />
        {this.state.tasks.map((task, index) => (
          <TaskListElement
            key={index}
            title={task.title}
            totalTimeInMinutes={task.totalTimeInMinutes}
            onEdit={() =>
              this.handleEdit(index, {
                title: 'Edited task dummy',
                totalTimeInMinutes: 15,
              })
            }
            onDelete={() => this.handleDelete(index)}
          />
        ))}
      </main>
    );
  }
}

function TaskListElement({ title, totalTimeInMinutes, onEdit, onDelete }) {
  return (
    <div className="TaskListElement">
      <span>{title}</span>
      <span>{totalTimeInMinutes}</span>
      <button
        onClick={onEdit}
        className="btn btn--tan btn--rounded btn--square--sm"
      >
        <SVG icon="edit" />
      </button>
      <button
        onClick={onDelete}
        className="btn btn--red btn--rounded btn--square--sm"
      >
        <SVG icon="delete" />
      </button>
    </div>
  );
}

function TaskCreator({ onCreate }) {
  return (
    <div className="TaskCreator">
      <label className="f-width">
        Task
        <input type="text" placeholder="Task" max="120" />
      </label>
      <label>
        Duration
        <input type="number" placeholder="25" min="0" max="59" pattern="{2}" />
      </label>
      <button
        onClick={onCreate}
        className="btn btn--brown btn--rounded btn--square--xl"
      >
        <SVG icon="add" />
      </button>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
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

  handleStart = () => {
    this.setState({
      isRunning: true,
      isPaused: false,
      isEditable: false,
    });

    this.startTimer();
  };

  handleStop = () => {
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
    this.setState({ title: event.target.value });
  };

  handleTotalTimeInMinutesChange = (event) => {
    this.setState({ totalTimeInMinutes: event.target.value });
  };

  handleEdit = () => {
    this.setState({
      isEditable: true,
    });
  };

  render() {
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
      <main className="App">
        <TaskTimer
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
      </main>
    );
  }
}

function TaskTimer({
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

  return (
    <div className={'TaskTimer ' + classInactive}>
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
    <div className={'TaskEditor ' + (!isActive ? 'inactive' : '')}>
      <label className="f-width">
        Task
        <input
          type="text"
          value={title}
          onChange={onTitleChange}
          placeholder="Task"
          max="120"
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
          min="0"
          max="59"
          pattern="{2}"
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

function Clock({
  title,
  isRunning,
  isPaused,
  countBreaks,
  countPauses,
  timeLeftInSeconds,
  totalTimeInSeconds,
}) {
  const secondsLeft = Math.floor(timeLeftInSeconds % 60);
  const minutesLeft = Math.floor(timeLeftInSeconds / 60);

  const convertNumber = (value, maxValue = 59, maxLength = 2) => {
    if (value < 0) {
      value = 0;
    }
    if (value > maxValue) {
      value = maxValue;
    }
    return value.toString().padStart(maxLength, '0');
  };

  return (
    <div className="Clock">
      <h2>{title}</h2>
      <div className="Clock__progress">
        <svg className="progress__bg" viewBox="0 0 42 42">
          <circle cx="21" cy="21" r="20" fill="none" strokeWidth="2" />
        </svg>
        <svg
          className="progress__circle progress__circle--animate"
          viewBox="0 0 42 42"
        >
          <circle
            cx="21"
            cy="21"
            r="20"
            fill="none"
            strokeWidth="2"
            style={{
              animationName: isRunning ? 'progress-circle-stroke' : '',
              animationDuration: totalTimeInSeconds + 's',
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          />
        </svg>
        <div className="progress__state">
          <span className="state__time">
            {convertNumber(minutesLeft)}:{convertNumber(secondsLeft)}
          </span>
          <span className="state__counter">{countBreaks} / 3 Breaks</span>
          <span className="state__counter">{countPauses} Pauses</span>
        </div>
      </div>
    </div>
  );
}

function Controls({ isRunning, isPaused, onStart, onStop, onPause, onEdit }) {
  return (
    <div className="Controls">
      <button
        onClick={onStart}
        className="btn btn--green btn--rounded btn--square--xl"
        disabled={isRunning && !isPaused}
      >
        <SVG icon="play" />
      </button>
      <button
        onClick={onPause}
        className="btn btn--red btn--rounded btn--square--md"
        disabled={!isRunning || isPaused}
      >
        <SVG icon="pause" />
      </button>
      <button
        onClick={onStop}
        className="btn btn--red btn--rounded btn--square--md"
        disabled={!isRunning}
      >
        <SVG icon="stop" />
      </button>
      <button
        onClick={onEdit}
        className="btn btn--tan btn--rounded btn--square--md"
        disabled={isRunning && !isPaused}
      >
        <SVG icon="settings" />
      </button>
    </div>
  );
}

function Header({ title, description }) {
  return (
    <header className="Header">
      <Logomark maxWidth="72px" maxHeight="64px" />
      <div className="Header__logotype">
        <span className="Header__title">{title}</span>
        <span className="Header__description">{description}</span>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="Footer">
      Check app on
      <a
        className="Footer__link"
        href="https://github.com/martincodes-pl/pomodoro-app"
      >
        {' '}
        GitHub
      </a>{' '}
      - Learning by doing | MartinCodes
    </footer>
  );
}

function Logomark({ maxWidth = '100%', maxHeight = '100%' }) {
  return (
    <svg width={maxWidth} height={maxHeight} viewBox="0 0 24 22">
      <path
        d="M12.51,4.43c0.26,1.386 -3.444,0.328 -4.507,-1.309c-1.123,-1.73 -0.628,-3.12 -0.628,-3.12c0,0 0.564,1.815 1.937,2.478c0.831,0.402 2.985,0.817 3.198,1.951Z"
        style={{ fill: '#82c93b' }}
      />
      <path
        d="M12.052,4.435c1.132,-0.645 2.393,-0.968 3.785,-0.968c1.226,-0 2.353,0.255 3.381,0.765c0.302,0.15 0.596,0.321 0.881,0.514c0.033,0.022 0.045,0.06 0.045,0.099l0,1.758c0,0.12 -0.025,0.184 -0.113,0.102c-1.167,-1.102 -2.738,-1.777 -4.464,-1.777c-3.601,-0 -6.525,2.938 -6.525,6.556c0,3.619 2.924,6.557 6.525,6.557c1.468,-0 2.824,-0.489 3.915,-1.313c0.318,-0.221 0.62,-0.477 0.906,-0.769c1.172,-1.197 1.759,-2.687 1.759,-4.47c0,-0.083 -0.002,-0.165 -0.004,-0.247l0,-9.606c0,-0.093 0.056,-0.175 0.192,-0.175l1.491,-0c0.109,-0 0.162,0.081 0.162,0.17l0,8.952c0,0.135 -0.003,0.269 -0.009,0.4c-0.164,3.868 -1.823,5.607 -1.823,5.607c-0.783,1.076 -1.834,1.732 -2.853,2.27c-1.019,0.538 -2.155,0.807 -3.409,0.807c-1.466,-0 -2.789,-0.353 -3.971,-1.06c-1.132,0.645 -2.393,0.968 -3.785,0.968c-1.226,-0 -2.353,-0.255 -3.381,-0.765c-0.302,-0.15 -0.596,-0.321 -0.881,-0.514c-0.032,-0.022 -0.045,-0.06 -0.045,-0.099l0,-1.758c0,-0.12 0.026,-0.184 0.113,-0.102c1.168,1.102 2.738,1.777 4.464,1.777c0.805,-0 1.576,-0.146 2.287,-0.414c-0.142,-0.127 -0.281,-0.259 -0.417,-0.398c-1.557,-1.576 -2.335,-3.474 -2.335,-5.692c0,-2.266 0.771,-4.189 2.313,-5.771c0.145,-0.148 0.291,-0.289 0.441,-0.422c-0.712,-0.269 -1.483,-0.416 -2.289,-0.416c-1.468,-0 -2.824,0.489 -3.915,1.313c-0.318,0.221 -0.62,0.477 -0.906,0.769c-1.172,1.197 -1.758,2.687 -1.758,4.47c0,0.083 0.001,0.165 0.003,0.247l0,9.606c0,0.093 -0.056,0.175 -0.192,0.175l-1.49,-0c-0.109,-0 -0.162,-0.082 -0.162,-0.17l0,-8.952c0,-0.135 0.002,-0.269 0.008,-0.4c0.164,-3.868 1.823,-5.607 1.823,-5.607c0.783,-1.076 1.835,-1.732 2.853,-2.27c1.019,-0.538 2.155,-0.807 3.409,-0.807c1.466,-0 2.789,0.353 3.971,1.06Zm-0.149,14.16l0.001,0l-0.002,-0.001l0.001,0.001Zm-0.02,-0.012l0.001,0l-0.003,-0.001l0.002,0.001Zm-0.02,-0.012l0.001,0l-0.003,-0.002l0.002,0.002Zm-0.02,-0.013l0.002,0.001l-0.005,-0.003l0.003,0.002Zm-0.02,-0.012l0.002,0.001l-0.006,-0.004l0.004,0.003Zm-0.02,-0.012l0.002,0.001l-0.007,-0.005l0.005,0.004Zm-0.02,-0.013l0.002,0.001l-0.008,-0.005l0.006,0.004Zm-0.019,-0.012l0.001,0.001l-0.01,-0.006l0.009,0.005Zm-0.02,-0.013l0.001,0.001l-0.011,-0.007l0.01,0.006Zm-0.02,-0.013l0.001,0.001l-0.013,-0.008l0.012,0.007Zm-0.02,-0.012l0.002,0.001l-0.018,-0.012l0.016,0.011Zm-0.18,-0.12c0.054,0.037 0.108,0.073 0.162,0.108c-0.054,-0.035 -0.108,-0.071 -0.162,-0.108Zm-0.016,-0.011l0.016,0.011l-0.02,-0.014l0.004,0.003Zm-0.02,-0.014l0.015,0.01l-0.019,-0.012l0.004,0.002Zm-0.019,-0.013l0.013,0.009l-0.018,-0.012l0.005,0.003Zm-0.019,-0.014l0.012,0.009l-0.017,-0.012l0.005,0.003Zm-0.02,-0.013l0.012,0.008l-0.017,-0.012l0.005,0.004Zm-0.019,-0.014l0.011,0.008l-0.017,-0.012l0.006,0.004Zm-0.026,-0.018l0.017,0.011l-0.017,-0.011Zm-0.013,-0.01l0.01,0.007l-0.016,-0.012l0.006,0.005Zm-0.019,-0.014l0.009,0.007l-0.016,-0.012l0.007,0.005Zm-0.019,-0.014l0.008,0.006l-0.016,-0.011l0.008,0.005Zm-0.027,-0.019l0.015,0.011l-0.015,-0.011Zm-0.012,-0.009l0.007,0.005l-0.015,-0.011l0.008,0.006Zm-0.019,-0.014l0.007,0.005l-0.015,-0.011l0.008,0.006Zm-0.019,-0.014l0.006,0.004l-0.015,-0.011l0.009,0.007Zm-0.028,-0.022l0.014,0.011l-0.014,-0.011Zm-0.01,-0.007l0.005,0.004l-0.015,-0.011l0.01,0.007Zm-0.019,-0.015l0.004,0.004l-0.014,-0.011l0.01,0.007Zm-0.02,-0.014l0.005,0.003l-0.015,-0.011l0.01,0.008Zm-0.019,-0.015l0.004,0.003l-0.014,-0.011l0.01,0.008Zm-0.019,-0.015l0.004,0.003l-0.014,-0.011l0.01,0.008Zm-0.018,-0.014l0.002,0.002l-0.014,-0.011l0.012,0.009Zm-0.019,-0.015l0.002,0.002l-0.014,-0.011l0.012,0.009Zm-0.019,-0.015l0.002,0.002l-0.014,-0.011l0.012,0.009Zm-0.019,-0.015l0.001,0.001l-0.013,-0.011l0.012,0.01Zm-0.019,-0.015l0.001,0.001l-0.014,-0.011l0.013,0.01Zm-0.019,-0.015l0.001,-0l-0.014,-0.011l0.013,0.011Zm-0.019,-0.015l0.001,-0l-0.014,-0.011l0.013,0.011Zm-0.037,-0.031l0.005,0.005l-0.005,-0.005Zm-0.019,-0.015l0.005,0.004l-0.005,-0.004Zm-0.019,-0.016l0.005,0.004l-0.005,-0.004Zm-0.018,-0.015l0.004,0.003l-0.005,-0.003l0.001,-0Zm-0.019,-0.016l0.004,0.004l-0.004,-0.004Zm-0.019,-0.016l0.004,0.004l-0.004,-0.004Zm-0.019,-0.016l0.004,0.004l-0.004,-0.004Zm-0.018,-0.015l0.003,0.003l-0.003,-0.003Zm-0.018,-0.016l0.002,0.002l-0.003,-0.002l0.001,-0Zm-0.019,-0.015l0.002,0.001l-0.002,-0.002l-0,0.001Zm-0.018,-0.016l0.002,0.001l-0.003,-0.002l0.001,0.001Zm-0.019,-0.017l0.002,0.002l-0.002,-0.002Zm-0.018,-0.016l0.001,0.001l-0.002,-0.001l0.001,-0Zm-0.018,-0.016l0,0.001l-0.001,-0.001l0.001,-0Zm-0.019,-0.016l0.001,-0l-0.001,-0Zm0.024,-12.335l0.002,-0.002l-0.002,0.002Zm0.025,-0.022l-0.005,0.005l0.005,-0.005Zm0.016,-0.014l-0.002,0.001l0.007,-0.005l-0.005,0.004Zm0.02,-0.017l-0.002,0.001l0.007,-0.006l-0.005,0.005Zm0.02,-0.018l-0.002,0.002l0.007,-0.006l-0.005,0.004Zm0.021,-0.017l-0.004,0.002l0.008,-0.006l-0.004,0.004Zm0.024,-0.021l-0.008,0.006l0.008,-0.006Zm0.016,-0.014l-0.004,0.004l0.008,-0.007l-0.004,0.003Zm0.021,-0.017l-0.005,0.004l0.007,-0.006l-0.002,0.002Zm0.022,-0.019l-0.006,0.006l0.006,-0.006Zm0.019,-0.015l-0.005,0.003l0.006,-0.005l-0.001,0.002Zm0.02,-0.017l-0.004,0.003l0.005,-0.004l-0.001,0.001Zm0.021,-0.017l-0.001,0.001l0.001,-0.001Zm0.062,-0.05l-0.001,-0l0.003,-0.002l-0.002,0.002Zm0.02,-0.017l-0.001,0.001l0.005,-0.004l-0.004,0.003Zm0.021,-0.016l-0.001,0.001l0.005,-0.004l-0.004,0.003Zm0.021,-0.017l-0.002,0.002l0.005,-0.004l-0.003,0.002Zm0.024,-0.018l-0.006,0.004l0.006,-0.004Zm0.017,-0.014l-0.002,0.002l0.005,-0.004l-0.003,0.002Zm0.023,-0.018l-0.004,0.004l0.004,-0.004Zm0.019,-0.014l-0.003,0.002l0.005,-0.004l-0.002,0.002Zm0.022,-0.017l-0.003,0.003l0.003,-0.003Zm0.02,-0.015l-0.001,0.001l0.001,-0.001Zm0.19,-0.139l0.001,-0.001l-0.001,0.001Zm0.021,-0.015l0.001,-0.001l-0.001,0.001Zm0.022,-0.015l-0.001,-0l0.001,-0Z"
        style={{ fill: '#e64741' }}
      />
      <path
        d="M12.096,4.104c0.271,-0.726 1.61,-0.898 2.311,-1.237c1.373,-0.664 1.937,-2.479 1.937,-2.479c0,0 0.495,1.391 -0.628,3.121c-0.462,0.711 -1.165,1.247 -1.832,1.52c0.035,0.033 0.071,0.064 0.106,0.092c0.871,0.683 2.446,0.359 2.446,0.359c0,0 -0.972,0.885 -2.621,0.791c-0.831,-0.047 -1.546,-0.446 -1.889,-0.911c-0.891,0.531 -2.744,0.692 -3.825,-0.024c-1.719,-1.138 -1.357,-2.077 -1.357,-2.077c0,0 0.778,0.906 2.302,0.967c0.83,0.033 2.294,-0.68 3.05,-0.122Z"
        style={{ fill: '#82c93b' }}
      />
      <path
        d="M12.596,8.557l2.357,3.669l1.312,-1.312l-3.669,-2.357Z"
        style={{ fill: '#e64741' }}
      />
      <path
        d="M16.544,11.645c-0.041,0.493 -0.455,0.881 -0.959,0.881c-0.531,0 -0.962,-0.431 -0.962,-0.962c0,-0.531 0.431,-0.962 0.962,-0.962c0.085,0 0.168,0.012 0.246,0.032l5.292,-2.976l-4.579,3.987Z"
        style={{ fill: '#82c93b' }}
      />
    </svg>
  );
}

function SVG({ icon = 'play' }) {
  const iconsArr = {
    play: (
      <svg height="100%" width="100%" viewBox="0 0 42 42">
        <path d="M36.068,20.176l-29-20C6.761-0.035,6.363-0.057,6.035,0.114C5.706,0.287,5.5,0.627,5.5,0.999v40c0,0.372,0.206,0.713,0.535,0.886c0.146,0.076,0.306,0.114,0.465,0.114c0.199,0,0.397-0.06,0.568-0.177l29-20c0.271-0.187,0.432-0.494,0.432-0.823S36.338,20.363,36.068,20.176z M7.5,39.095V2.904l26.239,18.096L7.5,39.095z" />
      </svg>
    ),
    pause: (
      <svg height="100%" width="100%" viewBox="0 0 42 42">
        <g>
          <path d="M14.5,0c-0.552,0-1,0.447-1,1v40c0,0.553,0.448,1,1,1s1-0.447,1-1V1C15.5,0.447,15.052,0,14.5,0z" />
          <path d="M27.5,0c-0.552,0-1,0.447-1,1v40c0,0.553,0.448,1,1,1s1-0.447,1-1V1C28.5,0.447,28.052,0,27.5,0z" />
        </g>
      </svg>
    ),
    stop: (
      <svg height="100%" width="100%" viewBox="0 0 42 42">
        <path d="M40.833,0l-39.666,0c-0.644,0 -1.167,0.522 -1.167,1.167l0,39.666c0,0.645 0.523,1.167 1.167,1.167l39.666,-0c0.644,-0 1.167,-0.522 1.167,-1.167l0,-39.666c0,-0.646 -0.523,-1.167 -1.167,-1.167Zm-1.166,39.667l-37.334,-0l0,-37.334l37.334,0l-0,37.334Z" />
      </svg>
    ),
    settings: (
      <svg width="100%" height="100%" viewBox="0 0 42 42">
        <path d="M39.838,16.333l-1.57,0c-0.4,-1.487 -0.989,-2.91 -1.758,-4.244l1.11,-1.109c0.408,-0.408 0.633,-0.952 0.633,-1.529c-0,-0.578 -0.225,-1.121 -0.633,-1.53l-3.542,-3.541c-0.816,-0.816 -2.24,-0.818 -3.059,-0l-1.109,1.109c-1.334,-0.768 -2.757,-1.357 -4.243,-1.757l-0,-1.57c-0,-1.192 -0.97,-2.162 -2.163,-2.162l-5.008,-0c-1.193,-0 -2.163,0.97 -2.163,2.162l0,1.57c-1.486,0.4 -2.909,0.989 -4.244,1.758l-1.109,-1.11c-0.818,-0.818 -2.242,-0.816 -3.059,0l-3.541,3.542c-0.409,0.408 -0.633,0.952 -0.633,1.53c-0,0.577 0.224,1.12 0.633,1.529l1.109,1.109c-0.768,1.333 -1.357,2.756 -1.757,4.243l-1.57,0c-1.192,0 -2.162,0.97 -2.162,2.163l0,5.008c0,1.193 0.97,2.163 2.162,2.163l1.57,-0c0.4,1.486 0.989,2.909 1.758,4.244l-1.11,1.109c-0.408,0.408 -0.633,0.952 -0.633,1.529c0,0.578 0.225,1.121 0.633,1.53l3.542,3.541c0.816,0.818 2.241,0.819 3.059,0l1.109,-1.109c1.335,0.768 2.758,1.357 4.244,1.758l0,1.57c0,1.192 0.97,2.162 2.162,2.162l5.008,-0c1.193,-0 2.163,-0.97 2.163,-2.162l-0,-1.57c1.486,-0.401 2.909,-0.989 4.244,-1.758l1.109,1.109c0.818,0.819 2.242,0.817 3.059,0l3.541,-3.541c0.409,-0.408 0.633,-0.952 0.633,-1.53c0,-0.577 -0.224,-1.12 -0.633,-1.529l-1.109,-1.109c0.768,-1.335 1.357,-2.758 1.758,-4.244l1.57,-0c1.192,-0 2.162,-0.97 2.162,-2.163l-0,-5.008c-0.001,-1.193 -0.971,-2.163 -2.163,-2.163Zm0.606,7.171c0,0.335 -0.272,0.607 -0.606,0.607l-2.794,0l-0.14,0.601c-0.405,1.74 -1.088,3.391 -2.032,4.909l-0.327,0.524l1.975,1.975c0.237,0.237 0.237,0.622 -0,0.859l-3.541,3.541c-0.237,0.236 -0.622,0.238 -0.859,-0l-1.975,-1.975l-0.524,0.327c-1.517,0.944 -3.168,1.628 -4.909,2.032l-0.601,0.14l0,2.794c0,0.334 -0.272,0.606 -0.607,0.606l-5.008,0c-0.335,0 -0.607,-0.272 -0.607,-0.606l-0,-2.794l-0.601,-0.14c-1.74,-0.405 -3.391,-1.088 -4.909,-2.032l-0.524,-0.327l-1.975,1.975c-0.238,0.238 -0.623,0.236 -0.859,-0l-3.541,-3.541c-0.237,-0.238 -0.237,-0.623 0,-0.859l1.975,-1.975l-0.327,-0.524c-0.944,-1.517 -1.628,-3.168 -2.032,-4.909l-0.14,-0.601l-2.794,0c-0.334,0 -0.606,-0.272 -0.606,-0.607l-0,-5.008c-0,-0.335 0.272,-0.607 0.606,-0.607l2.794,-0l0.14,-0.601c0.405,-1.741 1.088,-3.392 2.032,-4.909l0.327,-0.524l-1.975,-1.975c-0.237,-0.237 -0.237,-0.622 0,-0.859l3.541,-3.541c0.237,-0.236 0.622,-0.238 0.859,0l1.975,1.975l0.524,-0.327c1.517,-0.944 3.168,-1.628 4.909,-2.032l0.601,-0.14l-0,-2.794c-0,-0.334 0.272,-0.606 0.607,-0.606l5.008,-0c0.335,-0 0.607,0.272 0.607,0.606l0,2.794l0.601,0.14c1.74,0.405 3.391,1.088 4.909,2.032l0.524,0.327l1.975,-1.975c0.238,-0.238 0.623,-0.236 0.859,0l3.541,3.541c0.237,0.238 0.237,0.623 -0,0.859l-1.975,1.975l0.327,0.524c0.944,1.516 1.628,3.167 2.032,4.909l0.14,0.601l2.794,-0c0.334,-0 0.606,0.272 0.606,0.607l0,5.008Zm-19.444,-13.393c-6.004,0 -10.889,4.885 -10.889,10.889c0,6.004 4.885,10.889 10.889,10.889c6.004,-0 10.889,-4.885 10.889,-10.889c-0,-6.004 -4.885,-10.889 -10.889,-10.889Zm0,20.222c-5.147,0 -9.333,-4.186 -9.333,-9.333c-0,-5.147 4.186,-9.333 9.333,-9.333c5.147,-0 9.333,4.186 9.333,9.333c0,5.147 -4.186,9.333 -9.333,9.333Z" />
      </svg>
    ),
    edit: (
      <svg width="100%" height="100%" viewBox="0 0 42 42">
        <path d="M34.389,0l-0.02,-0c-1.713,0 -3.425,0.652 -4.729,1.955l-26.796,26.796c-0.013,0.013 -0.02,0.028 -0.032,0.042c-0.015,0.017 -0.029,0.037 -0.043,0.056c-0.039,0.055 -0.069,0.114 -0.093,0.178c-0.006,0.019 -0.016,0.036 -0.021,0.055c-0.001,0.003 -0.002,0.006 -0.003,0.009l-0.003,0.005c-0.001,0.003 -0.002,0.006 -0.003,0.009l-2.627,11.034c-0.012,0.05 -0.015,0.1 -0.016,0.15c-0,0.01 -0.003,0.019 -0.003,0.028c0.001,0.085 0.019,0.168 0.048,0.247c0.007,0.019 0.014,0.035 0.023,0.053c0.036,0.079 0.081,0.156 0.145,0.22c0.071,0.07 0.154,0.125 0.244,0.162c0.09,0.037 0.186,0.056 0.282,0.056c0.057,-0 0.115,-0.007 0.171,-0.02l11.035,-2.627c0.02,-0.005 0.037,-0.016 0.057,-0.022c0.025,-0.009 0.049,-0.018 0.073,-0.029c0.054,-0.025 0.104,-0.055 0.15,-0.092c0.018,-0.014 0.036,-0.024 0.053,-0.04c0.006,-0.006 0.014,-0.009 0.02,-0.015l26.796,-26.797c2.608,-2.608 2.608,-6.851 0.001,-9.458c-1.299,-1.298 -3.003,-1.95 -4.709,-1.955Zm-30.582,37.246c-0.291,-0.29 -0.76,-0.29 -1.051,0l-0.683,0.683l1.898,-7.971l3.286,-0.365l-0.423,3.806c-0.003,0.028 0.007,0.054 0.007,0.082c0,0.028 -0.01,0.053 -0.007,0.081c0.003,0.025 0.015,0.045 0.021,0.069c0.009,0.043 0.021,0.082 0.037,0.122c0.019,0.049 0.042,0.092 0.07,0.135c0.023,0.034 0.047,0.064 0.075,0.094c0.035,0.038 0.074,0.07 0.116,0.1c0.034,0.023 0.066,0.044 0.103,0.062c0.049,0.023 0.1,0.037 0.154,0.049c0.028,0.007 0.051,0.022 0.08,0.026l0.084,0.005c0.027,-0 0.054,-0.002 0.081,-0.005l3.806,-0.423l-0.365,3.286l-7.972,1.898l0.683,-0.683c0.289,-0.29 0.289,-0.76 -0,-1.051Zm31.613,-24.257l-22.671,22.672l0.263,-2.365c-0,-0 0.114,-0.585 -0.176,-0.876c-0.291,-0.29 -0.875,-0.175 -0.875,-0.175l-3.547,0.394l0.394,-3.547l18.918,-18.916c0.291,-0.291 0.291,-0.76 0,-1.051c-0.29,-0.291 -0.76,-0.291 -1.051,0l-18.917,18.916l-2.366,0.263l22.672,-22.671l7.356,7.356Zm1.051,-1.05l-7.357,-7.357l1.052,-1.051l7.356,7.356l-1.051,1.052Zm1.576,-8.933c1.849,1.849 2.007,4.753 0.483,6.789l-7.272,-7.272c2.037,-1.524 4.941,-1.366 6.789,0.483Z" />
      </svg>
    ),
    add: (
      <svg width="100%" height="100%" viewBox="0 0 42 42">
        <path d="M42,20l-20,0l0,-20l-2,0l0,20l-20,0l0,2l20,0l0,20l2,0l0,-20l20,0l0,-2Z" />
      </svg>
    ),
    delete: (
      <svg width="100%" height="100%" viewBox="0 0 42 42">
        <path d="M41.483,1.885l-1.886,-1.885l-18.856,18.856l-18.856,-18.856l-1.885,1.885l18.856,18.856l-18.856,18.856l1.885,1.886l18.856,-18.856l18.856,18.856l1.886,-1.886l-18.856,-18.856l18.856,-18.856Z" />
      </svg>
    ),
  };

  return <>{iconsArr[icon]}</>;
}

ReactDOM.render(<AppWrapper />, document.getElementById('root'));
