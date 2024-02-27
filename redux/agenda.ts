import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Agenda } from '../constants/interfaces'

export const initialStateAgenda: Agenda = {
  date: new Date().getTime(),
  time: '',
  duration: '',
  customerId: '',
  id: '',
  procedure: [],
  comment: '',
  lastUpdated: 0,
  created: 0,
  masterId: '',
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
