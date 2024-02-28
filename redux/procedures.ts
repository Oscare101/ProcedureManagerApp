import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Procedure } from '../constants/interfaces'

const initialState: Procedure[] = []

const proceduresSlice = createSlice({
  name: 'procedures',
  initialState,
  reducers: {
    updateProcedures: (state, action: PayloadAction<Procedure[]>) => {
      state.splice(0, state.length, ...action.payload)
    },
  },
})

export const { updateProcedures } = proceduresSlice.actions
export default proceduresSlice.reducer
