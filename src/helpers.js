export function uuid4(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c==='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

function formatLeadingZero(num) {
  return num < 10 ? '0'+num : num;
}

/**
 * Returns the elapsed time in milliseconds
 * @param {int} startTime  - milliseconds from January 1, 1970, 00:00:00 UTC
 */
function getElapsedMS(startTime) {
  const curTime = Date.now();
  return curTime - startTime;
}

export function renderTimeRemaining(totalTime, startTime) {
  var elapsedMS = getElapsedMS(startTime);

  //converting totalTime to milliseconds
  var totalTimeArray = totalTime.split(':');
  const totalMin = parseInt(totalTimeArray[1]) + parseInt(totalTimeArray[0]) * 60;
  const totalMS = totalMin * 60000;

  var remainingMS = totalMS - elapsedMS;

  //formatting it for display
  var remainingSec = Math.floor(remainingMS / 1000);
  var remainingMin = Math.floor(remainingSec / 60);
  remainingSec = remainingSec - remainingMin * 60;
  var remainingHr = Math.floor(remainingMin / 60);
  remainingMin = remainingMin - remainingHr*60;

  return formatLeadingZero(remainingHr) + ':' + formatLeadingZero(remainingMin) + ':' + formatLeadingZero(remainingSec);
}