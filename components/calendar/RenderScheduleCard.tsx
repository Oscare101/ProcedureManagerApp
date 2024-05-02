import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import CreateProcedureCard from './CreateProcedureCard'
import globalStyles from '../../constants/globalStyles'
import { Agenda, Customer, Master, Procedure } from '../../constants/interfaces'
import colors from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import ProcedureCard from './ProcedureCard'

const width = Dimensions.get('screen').width

export default function RenderScheduleCard(props: {
  date: Date
  time: string
  column: number
  setCardPreview: any
  isPreview: boolean
  agenda: Agenda
  procedures: Procedure[]
  customers: Customer[]
  masters: Master[]
  schedule: any
  isAdmin: boolean
}) {
  if (props.agenda) {
    return (
      <ProcedureCard
        agenda={props.agenda}
        customers={props.customers}
        procedures={props.procedures}
        masters={props.masters}
        isAdmin={props.isAdmin}
      />
    )
  }

  const isMasterWorking = props.schedule['year-' + props.date.getFullYear()]?.[
    'month-' + (props.date.getMonth() + 1)
  ]?.['date-' + props.date.getDate()]?.includes(
    props.masters.find((m: Master) => m.number === props.column)?.id
  )

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        if (isMasterWorking) {
          props.setCardPreview()
        }
      }}
      style={[
        { width: (width * 0.92 * 0.85) / 3 },
        globalStyles.scheduleCardHeight1,
        globalStyles.center,
      ]}
    >
      {props.isPreview ? (
        <CreateProcedureCard
          date={props.date}
          time={props.time}
          column={props.column}
          masters={props.masters}
        />
      ) : (
        <Ionicons
          name={isMasterWorking ? 'create-outline' : 'close-outline'}
          size={width * 0.06}
          color={
            isMasterWorking
              ? `${
                  props.masters.find((m: Master) => m.number === props.column)
                    ?.color
                }20`
              : '#00000010'
          }
        />
      )}
    </TouchableOpacity>
  )
}
