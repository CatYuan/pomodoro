export function uuid4(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c==='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

/**
 * Finds the time remaining and formats it in (hrs:min)
 * @param {string} formattedTotal 
 * @param {string} formattedElapsed 
 */
export function renderTimeRemaining(formattedTotal, formattedElapsed) {
  const totalMinutes = getMinutes(formattedTotal);
  const elapsedMinutes = getMinutes(formattedElapsed);
  const timeRemaining = totalMinutes - elapsedMinutes;
  var hrs = 0;
  var min = timeRemaining;
  if (timeRemaining > 59) {
    hrs = Math.floor(timeRemaining/60);
    min = timeRemaining - hrs*60;
  }
  return formatLeadingZero(hrs)+':'+formatLeadingZero(min);
}

function getMinutes(formattedString) {
  var time = formattedString.split(':');
  var hours = parseInt(time[0]);
  var min = parseInt(time[1]);
  return hours*60 + min;
}

function formatLeadingZero(num) {
  return num < 10 ? '0'+num : num;
}