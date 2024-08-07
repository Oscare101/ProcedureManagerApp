export interface Agenda {
  date: string
  time: string
  duration: number
  customerId: Customer['id']
  id: string
  procedures: any[]
  comment: string
  lastUpdated: number
  created: number
  masterId: Master['id']
  prepayment: string
  canceled?: boolean
  deleted?: boolean
  confirmed?: boolean
  otherPerson?: string
  otherProcedure?: string
  discount: string
}

export interface Customer {
  name: string
  phone: string
  messenger: Messenger['type']
  link: string
  id: string
  comment?: string
}

export interface Messenger {
  type: 'viber' | 'telegram' | 'instagram' | 'whatsapp'
}

export interface Master {
  color: string
  id: string
  name: string
  number: number
}

export interface Procedure {
  id: string
  name: string
  priority: number
  type:
    | 'cleaning'
    | 'peeling'
    | 'care'
    | 'additional'
    | 'meso'
    | 'other'
    | 'rf-lifting'
  short: string
  time: number
  price: number
}

export interface Settings {
  swipe?: boolean
}

export interface Log {
  data: any
  id: string
  action:
    | 'deleteAgenda'
    | 'updateAgenda'
    | 'createAgenda'
    | 'createCustomer'
    | 'updateCustomer'
  type: 'customer' | 'agenda'
}

export interface AgendaObject {
  [key: `year-${number}`]: {
    [key: `month-${number}`]: {
      [key: `date-${number}`]: {
        [key: Agenda['id']]: Agenda
      }
    }
  }
}
