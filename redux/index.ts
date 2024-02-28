import { configureStore } from '@reduxjs/toolkit'
import mastersReducer from './masters'
import scheduleReducer from './schedule'
import customersReducer from './customers'
import agendaReducer from './agenda'
import proceduresReducer from './procedures'
import agendasReducer from './agendas'

export const store = configureStore({
  reducer: {
    masters: mastersReducer,
    schedule: scheduleReducer,
    customers: customersReducer,
    agenda: agendaReducer,
    procedures: proceduresReducer,
    agendas: agendasReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
