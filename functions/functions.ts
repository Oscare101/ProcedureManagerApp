import { Linking } from 'react-native'
import { Customer, Procedure } from '../constants/interfaces'
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

export function FilterCustomerSearch(customers: Customer[], search: string) {
  if (!search) {
    return customers
  }
  return customers.filter(
    (c: Customer) =>
      c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      c.phone.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      ExtractInstagramUsername(c.link)
        ?.toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()) ||
      (c.messenger === 'telegram' &&
        c.link?.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  )
}

export function CalculateProceduresDurstion(
  proceduresIds: string[],
  procedures: Procedure[]
) {
  const proceduresArr = procedures.filter((p: Procedure) =>
    proceduresIds.includes(p.id)
  )
  const theLongest: Procedure = proceduresArr.sort(
    (a: Procedure, b: Procedure) => b.time - a.time
  )[0]
  return theLongest.time
}
