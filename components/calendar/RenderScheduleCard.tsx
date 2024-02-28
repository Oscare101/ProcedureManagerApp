import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import CreateProcedureCard from './CreateProcedureCard'
import globalStyles from '../../constants/globalStyles'
import { Agenda, Procedure } from '../../constants/interfaces'
import agenda from '../../redux/agenda'
import colors from '../../constants/colors'
import procedures from '../../redux/procedures'

const width = Dimensions.get('screen').width

export default function RenderScheduleCard(props: {
  date: Date
  time: string
  column: number
  setCardPreview: any
  isPreview: boolean
  agenda: Agenda
  procedures: Procedure[]
}) {
  if (props.agenda) {
    return (
      <View
        style={[
          { width: (width * 0.92 * 0.85) / 3 },
          globalStyles.scheduleCardHeight1,
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            // props.setCardPreview()
          }}
          style={[
            styles.card,
            {
              height: width * 0.1 * (props.agenda.duration / 30),
            },
          ]}
        >
          <Text>
            {
              props.procedures.find(
                (p: Procedure) => p.id === props.agenda.procedures[0]
              )?.short
            }
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        props.setCardPreview()
      }}
      style={[
        { width: (width * 0.92 * 0.85) / 3 },
        globalStyles.scheduleCardHeight1,
      ]}
    >
      {props.isPreview ? (
        <CreateProcedureCard date={props.date} time={props.time} column={1} />
      ) : (
        <></>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: (width * 0.92 * 0.85) / 3,
    borderWidth: 1,
    borderRadius: width * 0.02,
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
  },
})
