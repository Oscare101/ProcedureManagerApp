import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Agenda } from '../constants/interfaces'

const initialState: Agenda[] = []

const agendasSlice = createSlice({
  name: 'agendas',
  initialState,
  reducers: {
    updateAgendas: (state, action: PayloadAction<Agenda[]>) => {
      state.splice(0, state.length, ...action.payload)
    },
    clearAgendas: () => {
      return initialState
    },
  },
})

export const { updateAgendas, clearAgendas } = agendasSlice.actions
export default agendasSlice.reducer
