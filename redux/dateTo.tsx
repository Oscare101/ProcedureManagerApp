import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const dateToSlice = createSlice({
  name: 'dateTo',
  initialState: 0,
  reducers: {
    updateDateTo: (state, action: PayloadAction<number>) => {
      return action.payload
    },
  },
})

export const { updateDateTo } = dateToSlice.actions
export default dateToSlice.reducer
