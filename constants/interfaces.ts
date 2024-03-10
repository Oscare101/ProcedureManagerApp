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
  type: 'cleaning' | 'peeling' | 'care' | 'additional' | 'meso' | 'other'
  short: string
  time: number
  price: number
}
