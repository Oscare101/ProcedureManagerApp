export interface Agenda {
  date: string
  time: string
  duration: string
  customer: Customer
  id: string
  procedure: any
  comment: string
  lastUpdated: number
  created: number
  master: Master
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
}
