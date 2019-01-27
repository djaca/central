export function padZero (time) {
  return (time < 10 ? '0' : '') + time
}

export function sec2time (timeInSeconds) {
  let pad = function (num, size) { return ('000' + num).slice(size * -1) }
  let time = parseFloat(timeInSeconds).toFixed(3)
  let hours = Math.floor(time / 60 / 60)
  let minutes = Math.floor(time / 60) % 60

  return pad(hours, 2) + 'h ' + pad(minutes, 2) + 'm'
}
