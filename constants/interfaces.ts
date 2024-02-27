export interface Agenda {
  date: number
  time: string
  duration: string
  customerId: Customer['id']
  id: string
  procedure: any[]
  comment: string
  lastUpdated: number
  created: number
  masterId: Master['id']
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
