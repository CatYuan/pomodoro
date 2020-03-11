import React from 'react';
import './App.css';

function App() {
  return (
    <div className='App'>
      <TimerDashboard/>
      <NavBar/>
    </div>
  );
}

class NavBar extends React.Component {
  render() {
    return(
      <div className='NavBar'>
        <h2>Today's Pomodoros</h2>
        <ol>
          <li>Learn React - 25 min</li>
          <li>ReactApp - 25 min</li>
        </ol>
      </div>
    );
  }
}

class TimerDashboard extends React.Component {
  render() {
    return(
      <div className='TimerDashboard'>
        <Header />
        <TimerHolder 
          canEdit={true}
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
 */
class TimerHolder extends React.Component {
  render() {
    if (this.props.canEdit) {
      return(
        <EditableTimer/>
      );
    } else {
      return (
        <Timer
          title='Rest'
          time='0'
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
        <TimesUp
          title={this.props.title}
        />
      );
    }
  }
}

/**
 * @param string title - the task to do
 */
class TimesUp extends React.Component {
  render() {
    var buttonPrompt = "Rest";
    if (this.props.title === "Rest") {
      buttonPrompt = "Reset"
    }

    return (
      <div className='Timer'>
        <p>{this.props.title}</p>
        <h3 className='Countdown'>0</h3>
        <button type='button' id={buttonPrompt}>{buttonPrompt}</button>
      </div>
    );
  }
}

export default App;