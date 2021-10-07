
import moment, { Moment } from 'moment'

let startMoment: Moment | undefined
let callIndex = 0

export function getFakeDate (): Promise<Moment> {
  if (!startMoment) {
    startMoment = moment()
    startMoment = startMoment.add(1, 'months')
  }
  callIndex++
  return Promise.resolve(
    moment(startMoment).add(callIndex, 'seconds')
  )
}
