import { configureStore } from '@reduxjs/toolkit'
import mastersReducer from './masters'

export const store = configureStore({
  reducer: {
    masters: mastersReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
