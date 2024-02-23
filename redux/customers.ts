import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Customer } from '../constants/interfaces'

const initialState: Customer[] = []

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    updateCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.splice(0, state.length, ...action.payload)
    },
  },
})

export const { updateCustomers } = customersSlice.actions
export default customersSlice.reducer
