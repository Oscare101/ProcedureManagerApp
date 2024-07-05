import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AgendaObject } from '../constants/interfaces'

export const initialStateAgendaObject: AgendaObject = {}

const agendaObjectSlice = createSlice({
  name: 'agendaObject',
  initialState: initialStateAgendaObject,
  reducers: {
    updateAgendaObject: (state, action: PayloadAction<AgendaObject>) => {
      return action.payload
    },
  },
})

export const { updateAgendaObject } = agendaObjectSlice.actions
export default agendaObjectSlice.reducer
