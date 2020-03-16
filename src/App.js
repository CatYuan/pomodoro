import React from 'react';
import './App.css';
import * as helpers from "./helpers";

class App extends React.Component {
  state = {
    activities: [
      {
        title: 'Practice React',
        totalTime: 25,
        elapsedTime: 25,
        id: helpers.uuid4(),
      },
      {
        title: 'React App',
        totalTime: 25,
        elapsedTime: 10,
        id: helpers.uuid4(),
      }
    ],
  };

  handleRestClick = () => {
    const restActivity = {
      title: 'Rest',
      totalTime: 5,
      elapsedTime: 0,
      id: helpers.uuid4(),
    }

    this.setState({
      activities: this.state.activities.concat(restActivity),
    });
  };

  render() {
    return (
      <div className='App'>
        <TimerDashboard
          activities={this.state.activities}
          handleRestClick={() => this.handleRestClick()}
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
 */
class TimerDashboard extends React.Component {
  render() {
    return(
      <div className='TimerDashboard'>
        <Header />
        <TimerHolder 
          activities={this.props.activities}
          handleRestClick={() => this.props.handleRestClick()}
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
 */
class TimerHolder extends React.Component {
  state = {
    canEdit: true,
  }

  handleResetClick = () => {
    this.setState({canEdit: true});
  };

  render() {
    if (this.state.canEdit) {
      return(
        <EditableTimer/>
      );
    } else {
      const activities = this.props.activities;
      const title = activities[activities.length - 1].title;
      const elapsedTime = activities[activities.length - 1].elapsedTime;
      const totalTime = activities[activities.length - 1].totalTime;
      const time = totalTime - elapsedTime;
      return (
        <Timer
          title={title}
          time={time}
          handleResetClick={() => this.handleResetClick()}
          handleRestClick={() => this.props.handleRestClick()}
        />
      );
    }
  }
}

class EditableTimer extends React.Component {
  render() {
    const prompt="What do you want to work on?"
    return(
      <div className='EditableTimer'>
        <div className='label-input'>
          <label>Project</label>
          <input type='text' placeholder={prompt} id='project-input'/>
        </div>
        <div className='label-input'>
          <label>Time (hr:min)</label>
          <input type='time' defaultValue='00:25' id='time-input'/>
        </div>
        <button type='submit' id='Start'>Start</button>
      </div>
    );
  }
}

/**
 * @param string title - the task to do
 * @param int time - the number of seconds on the timer
 * @param handleResetClick
 * @param handleRestClick
 */
class Timer extends React.Component {
  render() {
    if (this.props.time !== "0") {
      return(
        <div className='Timer'>
          <p>{this.props.title}</p>
          <h3 className='Countdown'>{this.props.time}</h3>
        </div>
      );
    } else {
      return(
        <TimesUpButton
          title={this.props.title}
          handleResetClick={() => this.props.handleResetClick()}
          handleRestClick={() => this.props.handleRestClick()}
        />
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
  handleResetClick = () => {
    this.props.handleResetClick();
  };

  handleRestClick = () => {
    this.props.handleRestClick();
  };

  render() {
    var buttonPrompt = "Rest";
    if (this.props.title === "Rest") {
      buttonPrompt = "Reset"
    }

    return (
      <div className='Timer'>
        <p>{this.props.title}</p>
        <h3 className='Countdown'>0</h3>
        <button 
          type='button' 
          id={buttonPrompt}
          onClick={() => {
            if (buttonPrompt === "Reset") {
              return this.handleResetClick();
            } else {
              return this.handleRestClick();
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