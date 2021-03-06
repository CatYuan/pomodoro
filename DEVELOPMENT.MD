## Development Process
1. Define necessary components
2. Create static version of app
3. Determine what should be stateful
4. Add state
5. Add server

## 8 March 2020
**Things Accomplished** 
* Mockups for app drawn.
* Static version of app (skeleton without CSS) created
* Basic CSS added for NavBar

## 11 March 2020
**Things Accomplished**
* General styling added to form and buttons

## 16 March 2020
**Things Accomplished**
* State added to necessary components
* NavBar refactored
* Inverse data flow added to Reset and Rest and Start buttons
* Make start button only clickable when form is filled out
* Debug inverse data flow
* Convert value from 'time input' into number of miliseconds
**To Do**
* Refactor to make the clock tick
  * Change elapsedTime state to runningSince = Date.now()
  * Solve for elapsedTime = Date.now() - runningSince
  * Force rerender w/ forceUpdate() and setInterval()
  * clean up with clearInterval()

## 17 March 2020 
**Things Accomplished**
* Refactor to make the clock tick
  * Change elapsedTime state to runningSince = Date.now()
  * Solve for elapsedTime = Date.now() - runningSince
  * Force rerender w/ forceUpdate() and setInterval()
  * clean up with clearInterval()
  * Refactor to show seconds on timer
* Fix bug in timer that shows negative time
  * Create timesUp state in TimerHolder to trigger Timer when time is up - passed as prop
* Have the 'Rest' button restart the timer
  * The new activity updates the state, but it does not render in the timer - SOLVED rest/reset button changes 'timesUp' state

## 18 March 2020
**Things Accomplished**
* Sound added to app