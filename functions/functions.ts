import { Linking } from 'react-native'
import {
  Agenda,
  AgendaObject,
  Customer,
  Log,
  Master,
  Procedure,
} from '../constants/interfaces'
import rules from '../constants/rules'
import text from '../constants/text'

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

export function ExtractInstagramUsername(url: string) {
  const regex = /instagram\.com\/([^/?]+)/
  const match = url.match(regex)
  if (match && match[1]) {
    return match[1]
  } else {
    return null
  }
}

export function ReturnPhoneString(phone: string) {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(rules.phoneRegrex)
  if (match) {
    let formattedPhoneNumber = ''
    for (let i = 1; i < match.length; i++) {
      if (match[i]) {
        if (i === 1) formattedPhoneNumber += '+' + match[i]
        else if (i === 2) formattedPhoneNumber += ' (' + match[i]
        else if (i === 3) formattedPhoneNumber += ') ' + match[i]
        else formattedPhoneNumber += ' ' + match[i]
      }
    }
    return formattedPhoneNumber
  } else {
    return phone
  }
}

export function ReturnCustomerMessenger(customer: Customer) {
  return customer.messenger === 'instagram'
    ? customer.link
    : customer.messenger === 'whatsapp'
    ? ReturnPhoneString(customer.phone)
    : customer.messenger === 'telegram'
    ? customer.link
    : ReturnPhoneString(customer.phone)
}

export async function OpenMessenger(customer: Customer) {
  if (customer.messenger === 'viber') {
    Linking.openURL(`viber://chat?number=${customer.phone.replace('+', '')}`)
  } else if (customer.messenger === 'instagram') {
    Linking.openURL(`https://www.instagram.com/${customer.link}`)
  } else if (customer.messenger === 'telegram') {
    Linking.openURL(`https://t.me/${customer.link.replace(/^@/, '')}`)
  } else {
    Linking.openURL(`https://wa.me/${customer.phone}`)
  }
}

export function OpenLink(link: string, messenger: Customer['messenger']) {
  if (messenger === 'instagram') {
    Linking.openURL(`https://www.instagram.com/${link}`)
  } else if (messenger === 'telegram') {
    Linking.openURL(`https://t.me/${link.replace(/^@/, '')}`)
  } else {
    return false
  }
}

export function FilterCustomerSearch(customers: Customer[], search: string) {
  if (!search) {
    return customers
  }
  return customers.filter(
    (c: Customer) =>
      c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      c.phone.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      c.link?.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      c.comment?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  )
}

export function CalculateProceduresDurstion(
  proceduresIds: string[],
  procedures: Procedure[]
) {
  if (!proceduresIds.length) {
    return 0
  }
  const proceduresArr = procedures.filter((p: Procedure) =>
    proceduresIds.includes(p.id)
  )
  const theLongest: Procedure = proceduresArr.sort(
    (a: Procedure, b: Procedure) => b.time - a.time
  )[0]
  return theLongest.time
}

export function DateTimeBlockAgenda(
  date: Date,
  time: string,
  column: number,
  agendas: AgendaObject,
  masters: Master[]
) {
  const todaysAgendas = Object.values(
    agendas[`year-${date.getFullYear()}`]?.[`month-${date.getMonth() + 1}`]?.[
      `date-${date.getDate()}`
    ] || {}
  ).find(
    (a: Agenda) =>
      +a.time.split(':')[0] === +time.split(':')[0] &&
      +a.time.split(':')[1] >= +time.split(':')[1] &&
      +a.time.split(':')[1] < +time.split(':')[1] + 30 &&
      masters.find((m: Master) => m.id === a.masterId)?.number === column &&
      !a.canceled
  )

  return todaysAgendas as Agenda
}

export function CalculateProcedureFinishTime(time: string, duration: number) {
  const hours =
    +time.split(':')[0] + Math.floor((+time.split(':')[1] + duration) / 60)
  const minutes = (+time.split(':')[1] + duration) % 60
  return `${hours}:${minutes.toString().padStart(2, '0')}`
}

export function IsTimeBetweenTimes(
  timeStart: string,
  timeFinish: string,
  start: string,
  finish: string
) {
  const timeStartNumber =
    +timeStart.split(':')[0] + +timeStart.split(':')[1] / 60
  const timeFinishNumber =
    +timeFinish.split(':')[0] + +timeFinish.split(':')[1] / 60
  const startNumber = +start.split(':')[0] + +start.split(':')[1] / 60
  const finishNumber = +finish.split(':')[0] + +finish.split(':')[1] / 60
  if (
    (timeStartNumber >= startNumber && timeStartNumber < finishNumber) ||
    (timeFinishNumber > startNumber && timeFinishNumber <= finishNumber) ||
    (startNumber >= timeStartNumber && startNumber < timeFinishNumber) ||
    (finishNumber > timeStartNumber && finishNumber <= timeFinishNumber)
  ) {
    return true
  }
  return false
}

export function CalculateIsEnoughtTimeForProcedure(
  agenda: Agenda,
  agendas: Agenda[]
) {
  if (!agenda.time || !agenda.duration) return true
  const todaysMastersAgendas: Agenda[] = []
  agendas
    .filter((a: Agenda) => a.id !== agenda.id && !a.canceled)
    .map((a: Agenda) => {
      if (a.masterId === agenda.masterId && a.date === agenda.date) {
        todaysMastersAgendas.push(a)
      }
    })

  const isEnoughTime: boolean = !todaysMastersAgendas.length
    ? true
    : !todaysMastersAgendas.find((a: Agenda) =>
        IsTimeBetweenTimes(
          agenda.time,
          CalculateProcedureFinishTime(agenda.time, agenda.duration),
          a.time,
          CalculateProcedureFinishTime(a.time, a.duration)
        )
      )

  return isEnoughTime
}

export function GetDateString(date: Date) {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString()

  return `${day}.${month}.${year}`
}

export function GetDateFormateFromString(date: string) {
  const [day, month, year] = date.split('.').map(Number)
  return new Date(year, month - 1, day)
}

export function GetNumberFromTime(time: any) {
  return (+time.split(':')[0] + +time.split(':')[1] / 60) as number
}

export function TodayOrFuture(date: any) {
  return (
    GetDateFormateFromString(date).getTime() >=
    GetDateFormateFromString(GetDateString(new Date())).getTime()
  )
}

export function IsToday(date: any) {
  return (
    GetDateFormateFromString(date).getTime() ==
    GetDateFormateFromString(GetDateString(new Date())).getTime()
  )
}

export function IsTomorrow(date: any) {
  let tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return (
    GetDateFormateFromString(GetDateString(new Date(tomorrow))).getTime() ==
    GetDateFormateFromString(date).getTime()
  )
}

export function FilterLogsSearch(logs: Log[], search: string) {
  if (!search) {
    return logs
  }
  return logs.filter(
    (l: Log) =>
      l.data.date?.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      l.data.time?.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      l.data.name?.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      l.data.link?.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      l.data.comment
        ?.toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()) ||
      l.data.phone?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  )
}

export function GetDiscountType(discount: string) {
  if (discount.includes('₴')) {
    return '₴'
  } else {
    return '%'
  }
}
