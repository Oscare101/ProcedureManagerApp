import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import text from '../../constants/text'
import colors from '../../constants/colors'
import { Agenda } from '../../constants/interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { updateAgenda } from '../../redux/agenda'
import { Ionicons } from '@expo/vector-icons'
import { GetDateString } from '../../functions/functions'

const width = Dimensions.get('screen').width

export default function DateTimeBlock(props: {
  onModal: any
  date: number
  time: string
  static?: boolean
}) {
  const agenda: Agenda = useSelector((state: RootState) => state.agenda)
  const dispatch = useDispatch()

  function OnNextDate() {
    const newDate = new Date(props.date)
    newDate.setDate(newDate.getDate() + 1)

    dispatch(updateAgenda({ ...agenda, date: GetDateString(newDate) }))
  }

  function OnPreviousDate() {
    const newDate = new Date(props.date)
    newDate.setDate(newDate.getDate() - 1)
    dispatch(updateAgenda({ ...agenda, date: GetDateString(newDate) }))
  }

  return (
    <View style={[styles.card, styles.rowBetween]}>
      <View style={styles.dateBlock}>
        {props.static ? (
          <View style={styles.dateButon}>
            <Ionicons
              name="calendar-outline"
              size={width * 0.06}
              color={colors.text}
            />
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={OnPreviousDate}
            style={styles.dateButon}
            disabled={props.static}
          >
            <Ionicons
              name="chevron-back"
              size={width * 0.06}
              color={colors.text}
            />
          </TouchableOpacity>
        )}

        <Text style={styles.dateTitle}>
          {GetDateString(new Date(props.date))} (
          {text.weekDaysShort[(new Date(props.date).getDay() || 7) - 1]})
        </Text>
        {props.static ? (
          <View style={styles.dateButon}></View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={OnNextDate}
            style={styles.dateButon}
            disabled={props.static}
          >
            <Ionicons
              name="chevron-forward"
              size={width * 0.06}
              color={colors.text}
            />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={props.onModal}
        disabled={props.static}
        style={[
          styles.timeBlock,
          {
            backgroundColor: props.time ? colors.bg : colors.card2,
          },
        ]}
      >
        {+props.time.split(':')[0] < 10 ||
        +props.time.split(':')[0] > 20 ||
        !props.time ? (
          <Ionicons
            name="alert-circle-outline"
            size={width * 0.035}
            color={colors.lightErrorTitle}
            style={{
              position: 'absolute',
              left: width * 0.01,
              top: width * 0.01,
            }}
          />
        ) : (
          <></>
        )}
        <Ionicons
          name="time-outline"
          size={width * 0.06}
          color={props.time ? colors.text : colors.card2Title}
        />
        {props.time ? (
          <Text style={styles.timeTitle}>{props.time}</Text>
        ) : (
          <></>
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '92%',
    padding: width * 0.02,
    backgroundColor: colors.white,
    marginTop: width * 0.02,
    borderRadius: width * 0.03,
    alignSelf: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateBlock: {
    width: width * 0.86 * 0.65,
    height: width * 0.12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.bg,
    borderRadius: width * 0.02,
  },
  dateButon: {
    height: '80%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTitle: { fontSize: width * 0.04, color: colors.text },
  timeBlock: {
    width: width * 0.86 * 0.35,
    height: width * 0.12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: width * 0.02,
  },
  timeTitle: { fontSize: width * 0.04, color: colors.text },
})
