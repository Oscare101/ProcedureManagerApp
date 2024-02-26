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

const width = Dimensions.get('screen').width

export default function DateTimeBlock(props: { onModal: any }) {
  const agenda: Agenda = useSelector((state: RootState) => state.agenda)
  const dispatch = useDispatch()

  function OnNextDate() {
    const newDate = new Date(agenda.date)
    newDate.setDate(newDate.getDate() + 1)

    dispatch(updateAgenda({ ...agenda, date: newDate.getTime() }))
  }

  function OnPreviousDate() {
    const newDate = new Date(agenda.date)
    newDate.setDate(newDate.getDate() - 1)
    dispatch(updateAgenda({ ...agenda, date: newDate.getTime() }))
  }

  return (
    <View style={[styles.card, styles.rowBetween]}>
      <View style={styles.dateBlock}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={OnPreviousDate}
          style={styles.dateButon}
        >
          <Ionicons
            name="chevron-back"
            size={width * 0.06}
            color={colors.text}
          />
        </TouchableOpacity>
        <Text style={styles.dateTitle}>
          {new Date(agenda.date).getDate().toString().padStart(2, '0')}.
          {(new Date(agenda.date).getMonth() + 1).toString().padStart(2, '0')}.
          {new Date(agenda.date).getFullYear()} (
          {text.weekDaysShort[(new Date(agenda.date).getDay() || 7) - 1]})
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={OnNextDate}
          style={styles.dateButon}
        >
          <Ionicons
            name="chevron-forward"
            size={width * 0.06}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={props.onModal}
        style={[
          styles.timeBlock,
          {
            backgroundColor: agenda.time ? colors.bg : colors.card2,
          },
        ]}
      >
        {+agenda.time.split(':')[0] < 10 ||
        +agenda.time.split(':')[0] > 20 ||
        !agenda.time ? (
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
          color={agenda.time ? colors.text : colors.card2Title}
        />
        {agenda.time ? (
          <Text style={styles.timeTitle}>{agenda.time}</Text>
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
