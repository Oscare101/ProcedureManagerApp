function GetDatesInMonth(year: number, month: number) {
  const startDate = new Date(year, month - 1, 1)
  const endDate = new Date(year, month, 0).getDate()

  const datesArray = []
  for (let i = 1; i <= endDate; i++) {
    datesArray.push(new Date(year, month - 1, i))
  }
  return datesArray
}

export function GetDaysTable(year: number, monthIndex: number) {
  const currentMonthFirstDay = new Date(Date.UTC(year, monthIndex, 1))
  const fisrtWeekDay = currentMonthFirstDay.getUTCDay()

  const currentMonthArr = GetDatesInMonth(year, monthIndex + 1)

  const previousMonth = new Date(currentMonthFirstDay)
  previousMonth.setUTCDate(0)

  const previousMonthArr = GetDatesInMonth(
    previousMonth.getFullYear(),
    previousMonth.getMonth() + 1
  ).slice(-((fisrtWeekDay || 7) - 1) || -7)

  const nextMonthDays = 7 * 6 - previousMonthArr.length - currentMonthArr.length
  const nextMonthDate = new Date(currentMonthFirstDay)
  nextMonthDate.setUTCMonth(currentMonthFirstDay.getUTCMonth() + 1)
  const nextMonthArr = GetDatesInMonth(
    nextMonthDate.getFullYear(),
    nextMonthDate.getMonth() + 1
  ).slice(0, nextMonthDays)

  return [...previousMonthArr, ...currentMonthArr, ...nextMonthArr]
}

export function IsDateToday(date: any) {
  return (
    new Date(date).getMonth() === new Date().getMonth() &&
    new Date(date).getFullYear() === new Date().getFullYear() &&
    new Date(date).getDate() === new Date().getDate()
  )
}

export function IsChosenDate(date: any, chosen: any) {
  return (
    new Date(date).getMonth() === new Date(chosen).getMonth() &&
    new Date(date).getFullYear() === new Date(chosen).getFullYear() &&
    new Date(date).getDate() === new Date(chosen).getDate()
  )
}
