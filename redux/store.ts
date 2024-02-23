import { configureStore } from '@reduxjs/toolkit'
import mastersReducer from './masters'
import scheduleReducer from './schedule'
import customersReducer from './customers'

export const store = configureStore({
  reducer: {
    masters: mastersReducer,
    schedule: scheduleReducer,
    customers: customersReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
