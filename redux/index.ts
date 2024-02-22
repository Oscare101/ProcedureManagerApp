import { configureStore } from '@reduxjs/toolkit'
import mastersReducer from './masters'
import scheduleReducer from './schedule'

export const store = configureStore({
  reducer: {
    masters: mastersReducer,
    schedule: scheduleReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
