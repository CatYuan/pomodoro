import React from 'react';
import './App.css';
import * as helpers from "./helpers";

class App extends React.Component {
  state = {
    activities: [
      {
        title: 'Practice React',
        totalTime: '00:25',
        startTime: 1529644667834,
        id: helpers.uuid4(),
      }
    ],
  };

  handleAddActivity = (activity) => {
    const newActivity = {
      title: activity.title,
      totalTime: activity.totalTime,
      startTime: activity.startTime,
      id: activity.id,
    };
    const newActivities = this.state.activities.concat(newActivity);

    console.log("Old state: " + this.state.activities);
    console.log("Expected New State: " + newActivities);

    this.setState({
      activities: newActivities,
    });
  };

  render() {
    console.log("Actual new state: " + this.state.activities);
    return (
      <div className='App'>
        <TimerDashboard
          activities={this.state.activities}
          handleAddActivity={(activity)=>this.handleAddActivity(activity)}
        />
        <NavBar
          activities={this.state.activities}
        />
      </div>
    );
  }
}

/**
 * @param activities - list of all activities
 */
class NavBar extends React.Component {
  render() {
    const activities = this.props.activities.filter(activity => activity.title !== "Rest");
    const activityList = activities.map((activity) => (
      <li key={activity.id}>
        {activity.title} - {activity.totalTime} min
      </li>
    ));

    return(
      <div className='NavBar'>
        <h2>Today's Pomodoros</h2>
        <ol>
          {activityList}
        </ol>
      </div>
    );
  }
}

/**
 * @param activities - list of all activities
 * @param handleRestClick
 * @param handleStartClick
 */
class TimerDashboard extends React.Component {
  render() {
    return(
      <div className='TimerDashboard'>
        <Header />
        <TimerHolder 
          activities={this.props.activities}
          handleAddActivity={(activity) => this.props.handleAddActivity(activity)}
        />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return(
      <div className='Header'>
        <img 
          src={require('./images/tomato.png')} 
          alt='tomato timer'
        />
        <h1>Pomodoro</h1>
      </div>
    );
  }
}

/**
 * @param bool canEdit - if true 'EditableTimer' is rendered 
 *        otherwise Timer is rendered
 * @ param activities - list of all activities
 * @param handleRestClick
 * @param handleStartClick
 */
class TimerHolder extends React.Component {
  state = {
    /**
     * Original values: canEdit - true; timesUp - false
     * Values have been changed for testing purposes
     */
    canEdit: true,
    timesUp: false,
  }

  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  handleResetClick = () => {
    this.setState({canEdit: true});
  };

  handleStartClick = (activity) => {
    this.props.handleAddActivity(activity);
    this.setState({canEdit: false});
  };

  handleTimesUp = () => {
    this.setState({timesUp: true});
  };

  render() {
    if (this.state.canEdit) {
      return(
        <EditableTimer
          handleStartClick={(activity) => this.handleStartClick(activity)}
        />
      );
    } else {
      const activities = this.props.activities;
      const title = activities[activities.length - 1].title;
      const startTime = activities[activities.length - 1].startTime;
      const totalTime = activities[activities.length - 1].totalTime;
      const time = helpers.renderTimeRemaining(totalTime, startTime);
      if (time === "00:00:00" && this.state.timesUp === false) {
        this.handleTimesUp();
      }
      return (
        <Timer
          title={title}
          time={time}
          timesUp={this.state.timesUp}
          handleResetClick={() => this.handleResetClick()}
          handleAddActivity={(activity) => this.props.handleAddActivity(activity)}
        />
      );
    }
  }
}

/**
 * @param handleStartClick
 */
class EditableTimer extends React.Component {
  state = {
    project: '',
    totalTime: '00:25',
  }

  handleProjectChange = (e) => {
    this.setState({project: e.target.value});
  };

  handleTimeChange = (e) => {
    this.setState({totalTime: e.target.value});
  };

  handleStartClick = () => {
    if (this.state.project !== '') {
      const activity = {
        title: this.state.project,
        totalTime: this.state.totalTime,
        startTime: Date.now(),
        id: helpers.uuid4(),
      };
      this.props.handleStartClick(activity);
    }
  };

  render() {
    const prompt="What do you want to work on?"
    return(
      <div className='EditableTimer'>
        <div className='label-input'>
          <label>Project</label>
          <input 
            type='text' 
            placeholder={prompt} 
            id='project-input'
            onChange={(e) => this.handleProjectChange(e)}  
          />
        </div>
        <div className='label-input'>
          <label>Time (hr:min)</label>
          <input 
            type='time' 
            defaultValue='00:25' 
            id='time-input'
            onChange={(e) => this.handleTimeChange(e)}
          />
        </div>
        <button 
          id='Start'
          onClick={() => this.handleStartClick()}
        >
          Start
        </button>
      </div>
    );
  }
}

/**
 * @param string title - the task to do
 * @param int time - the number of seconds on the timer
 * @param handleResetClick
 * @param handleRestClick
 * @param timesUp
 */
class Timer extends React.Component {
  render() {
    if (this.props.timesUp) {
      return(
        <TimesUpButton
          title={this.props.title}
          handleResetClick={() => this.props.handleResetClick()}
          handleRestClick={(activity) => this.props.handleAddActivity(activity)}
        />
      );
    } else {
      return(
        <div className='Timer'>
          <p>{this.props.title}</p>
          <h3 className='Countdown'>{this.props.time}</h3>
        </div>
      );
    }
  }
}

/**
 * @param string title - the task to do
 * @param handleResetClick
 * @param handleRestClick
 */
class TimesUpButton extends React.Component {
  render() {
    var buttonPrompt = "Rest";
    if (this.props.title === "Rest") {
      buttonPrompt = "Reset"
    }

    return (
      <div className='Timer'>
        <p>{this.props.title}</p>
        <h3 className='Countdown'>00:00:00</h3>
        <button 
          type='button' 
          id={buttonPrompt}
          onClick={() => {
            if (buttonPrompt === "Reset") {
              return this.props.handleResetClick();
            } else {
              const activity = {
                title: "Rest",
                totalTime: "00:05",
                startTime: Date.now(),
                id: helpers.uuid4(),
              };
              return this.props.handleRestClick(activity);
            }
          }}
        >
          {buttonPrompt}
        </button>
      </div>
    );
  }
}

export default App;