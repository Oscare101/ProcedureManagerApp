import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Master } from '../constants/interfaces'

const initialState: { [key: string]: Master['id'][] } = {}

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    updateSchedule: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload }
    },
    clearSchedule: () => {
      return initialState
    },
  },
})

export const { updateSchedule, clearSchedule } = scheduleSlice.actions
export default scheduleSlice.reducer
