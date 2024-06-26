import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Agenda } from '../constants/interfaces'

export const initialStateAgenda: Agenda = {
  date: '',
  time: '',
  duration: 0,
  customerId: '',
  id: '',
  procedures: [],
  comment: '',
  lastUpdated: 0,
  created: 0,
  masterId: '',
  prepayment: '',
  discount: '',
}

const agendaSlice = createSlice({
  name: 'agenda',
  initialState: initialStateAgenda,
  reducers: {
    updateAgenda: (state, action: PayloadAction<Agenda>) => {
      return action.payload
    },
    clearAgenda: () => {
      return initialStateAgenda
    },
  },
})

export const { updateAgenda, clearAgenda } = agendaSlice.actions
export default agendaSlice.reducer
