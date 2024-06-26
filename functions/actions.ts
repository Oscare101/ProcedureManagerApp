import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth, db } from '../firebase'

import {
  set,
  ref,
  getDatabase,
  get,
  onValue,
  update,
  remove,
} from 'firebase/database'
import { ref as refStorage, deleteObject } from 'firebase/storage'
import { MMKV } from 'react-native-mmkv'
import { Agenda, Customer, Log, Master } from '../constants/interfaces'

// var md5 = require('md5')
export const storage = new MMKV()

// LOGIN

export async function LogIn(email: string, password: string) {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password)
    storage.set('email', email)
    storage.set('password', password)
    return { response: response }
  } catch (error: any) {
    if (error.code.includes('wrong-password')) {
      return { error: 'wrong-password' }
    } else if (error.code.includes('user-not-found')) {
      return { error: 'user-not-found' }
    } else {
      return { error: 'error' }
    }
  }
}

export async function LogOut() {
  try {
    const response = await signOut(auth)
    storage.delete('email')
    storage.delete('password')
    return { response: response }
  } catch (error: any) {
    return { error: 'error' }
  }
}

// AGENDA

export async function CreateAgenda(agenda: Agenda) {
  try {
    await set(
      ref(
        getDatabase(),
        `business/PoboiskayaSofia/agendas/year-${+agenda.date.split(
          '.'
        )[2]}/month-${+agenda.date.split('.')[1]}/date-${+agenda.date.split(
          '.'
        )[0]}/${agenda.id}`
      ),
      agenda
    )
    await CreateLog('createAgenda', 'agenda', agenda)
    return true
  } catch (error) {
    console.log('CreateAgenda', error)
  }
}

export async function UpdateAgenda(agenda: Agenda) {
  try {
    await update(
      ref(
        getDatabase(),
        `business/PoboiskayaSofia/agendas/year-${+agenda.date.split(
          '.'
        )[2]}/month-${+agenda.date.split('.')[1]}/date-${+agenda.date.split(
          '.'
        )[0]}/${agenda.id}`
      ),
      agenda
    )
    await CreateLog('updateAgenda', 'agenda', agenda)
  } catch (error) {
    console.log('UpdateAgenda', error)
  }
}

export async function DeleteAgenda(agenda: Agenda) {
  try {
    await remove(
      ref(
        getDatabase(),
        `business/PoboiskayaSofia/agendas/year-${+agenda.date.split(
          '.'
        )[2]}/month-${+agenda.date.split('.')[1]}/date-${+agenda.date.split(
          '.'
        )[0]}/${agenda.id}`
      )
    )
    await CreateLog('deleteAgenda', 'agenda', agenda)
  } catch (error) {
    console.log('DeleteAgenda', error)
  }
}

// CUSTOMER

export async function CreateCustomer(customer: Customer) {
  try {
    await set(
      ref(getDatabase(), 'business/PoboiskayaSofia/customers/' + customer.id),
      customer
    )
    await CreateLog('createCustomer', 'customer', customer)
    return true
  } catch (error: any) {
    return error
  }
}

export async function UpdateCustomer(customer: Customer) {
  try {
    await update(
      ref(getDatabase(), 'business/PoboiskayaSofia/customers/' + customer.id),
      customer
    )
    await CreateLog('updateCustomer', 'customer', customer)
  } catch (error) {
    console.log('UpdateCustomer', error)
  }
}

// SCHEDULE

export async function UpdateSchedule(date: Date, schedule: Master['id'][]) {
  try {
    await set(
      ref(
        getDatabase(),
        `business/PoboiskayaSofia/schedule/year-${date.getFullYear()}/month-${
          date.getMonth() + 1
        }/date-${date.getDate()}`
      ),
      schedule
    )
  } catch (error) {
    console.log('UpdateSchedule', error)
  }
}

// LOG

export async function CreateLog(
  action: Log['action'],
  type: Log['type'],
  data: Log['data']
) {
  const timeStamp = new Date().getTime().toString()
  const logData: Log = {
    id: timeStamp,
    data: data,
    action: action,
    type: type,
  }
  try {
    await set(
      ref(getDatabase(), 'business/PoboiskayaSofia/logs/' + timeStamp),
      logData
    )
    return true
  } catch (error: any) {
    console.log(error)
  }
}
