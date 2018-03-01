import moment from 'moment'

export default (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  const time = moment(parseInt(date))
  if (time.isValid()) {
    return time.format(format)
  }
  return ''
}
