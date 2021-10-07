import moment, { Moment } from 'moment'

export function isAfterNow (currentDate: any, selectedDate: any) {
  if (!currentDate && !selectedDate) {
    return false
  }
  const nowMoment = moment()
  if (currentDate) {
    const currMoment = moment(currentDate)
    if (!currMoment.isValid()) {
      return false
    }
    if (!currMoment.isSameOrAfter(nowMoment)) {
      return false
    }
  }
  if (selectedDate) {
    const selectedMoment = moment(selectedDate)
    if (!selectedMoment.isValid()) {
      return false
    }
    if (!selectedMoment.isSameOrAfter(nowMoment)) {
      return false
    }
  }
  return true
}

export function localToUTCUnixTimestamp (current: Moment) {
  return current.utc().unix()
}

export function unixUTCTimestampToLocal (ts: any) {
  return moment.utc(ts, 'X').local()
}
