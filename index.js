function AppWrapper() {
  return (
    <>
      <Header title="Pomodoro" description="Your favorite task timer" />
      <App />
      <Footer />
    </>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Learning React',
      totalTimeInMinutes: 25,
      isRunning: false,
      isPaused: false,
      countPauses: 0,
      countBreaks: 0,
      elapsedTimeInSeconds: 0,
    };
  }

  handleStart = () => {
    this.setState({
      isRunning: true,
      isPaused: false,
    });

    this.startTimer();
  };

  handleStop = () => {
    this.setState({
      isRunning: false,
      isPaused: false,
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

  handleChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  handleTotalTimeInMinutes = (event) => {
    this.setState({ totalTimeInMinutes: event.target.value });
  };

  render() {
    const {
      title,
      totalTimeInMinutes,
      isRunning,
      isPaused,
      countBreaks,
      countPauses,
      elapsedTimeInSeconds,
    } = this.state;

    const totalTimeInSeconds = totalTimeInMinutes * 60;
    const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;

    return (
      <main className="App">
        <TaskTimer
          title={title}
          isRunning={isRunning}
          isPaused={isPaused}
          countBreaks={countBreaks}
          countPauses={countPauses}
          handleStart={this.handleStart}
          handleStop={this.handleStop}
          togglePause={this.togglePause}
          timeLeftInSeconds={timeLeftInSeconds}
          totalTimeInSeconds={totalTimeInSeconds}
        />
        <TaskEditor
          title={title}
          totalTimeInMinutes={totalTimeInMinutes}
          isRunning={isRunning}
          isPaused={isPaused}
          handleStart={this.handleStart}
          handleChangeTitle={this.handleChangeTitle}
          handleTotalTimeInMinutes={this.handleTotalTimeInMinutes}
        />
      </main>
    );
  }
}

function TaskTimer({
  title,
  isRunning,
  isPaused,
  countBreaks,
  countPauses,
  handleStart,
  handleStop,
  togglePause,
  timeLeftInSeconds,
  totalTimeInSeconds,
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
        handleStart={handleStart}
        handleStop={handleStop}
        togglePause={togglePause}
      />
    </div>
  );
}

function TaskEditor({
  title,
  totalTimeInMinutes,
  isRunning,
  isPaused,
  handleStart,
  handleChangeTitle,
  handleTotalTimeInMinutes,
}) {
  const isActive = isRunning || isPaused ? false : true;

  return (
    <div className={'TaskEditor ' + (!isActive ? 'inactive' : '')}>
      <label className="f-width">
        Task
        <input
          type="text"
          value={title}
          onChange={handleChangeTitle}
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
          onChange={handleTotalTimeInMinutes}
          placeholder="25"
          min="0"
          max="59"
          pattern="{2}"
          disabled={!isActive}
        />
      </label>
      <button
        onClick={handleStart}
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

function Controls({
  isRunning,
  isPaused,
  handleStart,
  handleStop,
  togglePause,
}) {
  const icons = {
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
  };

  return (
    <div className="Controls">
      <button
        onClick={handleStart}
        className="btn btn--green btn--rounded btn--square--xl"
        disabled={isRunning && !isPaused}
      >
        {icons.play}
      </button>
      <button
        onClick={togglePause}
        className="btn btn--red btn--rounded btn--square--md"
        disabled={!isRunning || isPaused}
      >
        {icons.pause}
      </button>
      <button
        onClick={handleStop}
        className="btn btn--red btn--rounded btn--square--md"
        disabled={!isRunning}
      >
        {icons.stop}
      </button>
      <button
        className="btn btn--tan btn--rounded btn--square--md"
        disabled={isRunning && !isPaused}
      >
        {icons.settings}
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

ReactDOM.render(<AppWrapper />, document.getElementById('root'));
