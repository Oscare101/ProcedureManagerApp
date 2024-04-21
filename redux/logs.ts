import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Log } from '../constants/interfaces'

const initialState: Log[] = []

const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    updateLogs: (state, action: PayloadAction<Log[]>) => {
      state.splice(0, state.length, ...action.payload)
    },
  },
})

export const { updateLogs } = logsSlice.actions
export default logsSlice.reducer
