import { Linking } from 'react-native'
import { Customer } from '../constants/interfaces'
import rules from '../constants/rules'

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
    ? ExtractInstagramUsername(customer.link)
    : customer.messenger === 'whatsapp'
    ? ReturnPhoneString(customer.phone)
    : customer.messenger === 'telegram'
    ? customer.link
    : ReturnPhoneString(customer.phone)
}

export async function OpenMessenger(customer: Customer) {
  if (customer.messenger === 'viber') {
    const canOpen = await Linking.canOpenURL(
      `viber://chat?number=${customer.phone.replace('+', '')}`
    )
    if (canOpen) {
      Linking.openURL(`viber://chat?number=${customer.phone.replace('+', '')}`)
    } else {
      return 'error'
    }
  } else if (customer.messenger === 'instagram') {
    const canOpen = await Linking.canOpenURL(customer.link)
    if (canOpen) {
      Linking.openURL(customer.link)
    } else {
      return 'error'
    }
  } else if (customer.messenger === 'telegram') {
    const canOpen = await Linking.canOpenURL(
      `https://t.me/${customer.link.replace(/^@/, '')}`
    )
    if (canOpen) {
      Linking.openURL(`https://t.me/${customer.link.replace(/^@/, '')}`)
    } else {
      return 'error'
    }
  } else {
    const canOpen = await Linking.canOpenURL(
      `https://wa.me/${customer.phone.replace('+', '')}`
    )
    if (canOpen) {
      Linking.openURL(`https://wa.me/${customer.phone.replace('+', '')}`)
    } else {
      return 'error'
    }
  }
}
