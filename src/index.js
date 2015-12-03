import mapRange from 'range-fit'
import map from 'lodash.map'
import { Observable } from 'rx'

function mapToRange (val) {
  try {
    return mapRange(val || 0, 0, 25, 0, 1)
  } catch (e) {
    return 0
  }
}

export function createMotionStream () {
  if (window.DeviceMotionEvent) {
    return Observable.fromEvent(window, 'devicemotion')
      .map(e => (e.acceleration && e.acceleration.x) ? e.acceleration : e.accelerationIncludingGravity)
      .map(({x, y, z}) => ({x, y, z}))
      .map(vals => map(vals, mapToRange))
      .startWith([0, 0, 0])
  } else {
    console.warn('no DeviceMotionEvent detected')
    return Observable.return(0)
  }
}
