import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Settings } from '../constants/interfaces'

const initialState: Settings = {}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<Settings>) => {
      return action.payload
    },
  },
})

export const { updateSettings } = settingsSlice.actions
export default settingsSlice.reducer
