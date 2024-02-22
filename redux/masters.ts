import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Master } from '../constants/interfaces'

const initialState: Master[] = []

const mastersSlice = createSlice({
  name: 'masters',
  initialState,
  reducers: {
    updateMasters: (state, action: PayloadAction<Master[]>) => {
      state.splice(0, state.length, ...action.payload)
    },
  },
})

export const { updateMasters } = mastersSlice.actions
export default mastersSlice.reducer
