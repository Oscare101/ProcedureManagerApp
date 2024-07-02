import { Agenda } from '../constants/interfaces'

export function GenerateStatisticData(agendas: Agenda[], date: Date) {
  return agendas.filter(
    (a: Agenda) =>
      +a.date.split('.')[1] === date.getMonth() + 1 &&
      +a.date.split('.')[2] === date.getFullYear() &&
      !a.canceled
  )
}
