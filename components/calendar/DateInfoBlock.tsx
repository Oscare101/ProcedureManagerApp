import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import text from '../../constants/text'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { Master } from '../../constants/interfaces'

const width = Dimensions.get('screen').width

interface DateInfoBlockProps {
  date: Date
  setDate: any
  onEdit: any
  onAdd: any
}

export default function DateInfoBlock(props: DateInfoBlockProps) {
  const masters = useSelector((state: RootState) => state.masters)
  const schedule = useSelector((state: RootState) => state.schedule)

  function OnNextDate() {
    const date = new Date(props.date)
    date.setDate(date.getDate() + 1)
    props.setDate(date)
  }

  function OnPreviousDate() {
    const date = new Date(props.date)
    date.setDate(date.getDate() - 1)
    props.setDate(date)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={OnPreviousDate}
        style={styles.dateButton}
      >
        <Ionicons name="chevron-back" size={width * 0.06} color={colors.text} />
      </TouchableOpacity>
      <View style={styles.dateBlock}>
        <Text style={styles.date}>{props.date.getDate()}</Text>
        <Text style={styles.weekDay}>
          {text.weekDaysShort[(props.date.getDay() || 7) - 1]}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={OnNextDate}
        style={styles.dateButton}
      >
        <Ionicons
          name="chevron-forward"
          size={width * 0.06}
          color={colors.text}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          height: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        {Object.values(schedule['date-' + props.date.getDate()] || []).map(
          (master: string, index: number) => (
            <View
              key={index}
              style={[
                styles.masterBlock,
                {
                  backgroundColor: masters.find((m: Master) => m.id === master)
                    ?.color,
                  marginTop: index ? width * 0.005 : 0,
                },
              ]}
            >
              <Text style={styles.masterBlockTitle}>
                {masters.find((m: Master) => m.id === master)?.name}
              </Text>
            </View>
          )
        )}
      </View>
      <TouchableOpacity
        style={styles.editButton}
        activeOpacity={0.8}
        onPress={props.onEdit}
      >
        <Ionicons name="pencil" size={width * 0.06} color={colors.text} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.8}
        onPress={props.onAdd}
      >
        <Ionicons name="add" size={width * 0.08} color={colors.text} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '92%',
    height: width * 0.2,
    backgroundColor: colors.white,
    borderRadius: width * 0.05,
    padding: width * 0.02,
    marginTop: width * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dateButton: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateBlock: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: width * 0.1,
  },
  date: { fontSize: width * 0.07, color: colors.text },
  weekDay: { fontSize: width * 0.05, color: colors.text },
  editButton: {
    height: '100%',
    aspectRatio: 0.7,
    borderWidth: width * 0.003,
    borderColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width * 0.03,
    marginLeft: width * 0.02,
  },
  addButton: {
    height: '100%',
    aspectRatio: 1,
    borderWidth: width * 0.003,
    borderColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width * 0.03,
    marginLeft: width * 0.02,
  },
  masterBlock: {
    width: '100%',
    maxHeight: width * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: '5%',
    borderRadius: width * 0.01,
  },
  masterBlockTitle: {
    fontSize: width * 0.035,
    color: colors.white,
  },
})
