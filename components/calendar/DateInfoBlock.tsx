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
import { Agenda, Master } from '../../constants/interfaces'
import { IsDateToday } from '../../functions/functions'
import CommentBlock from '../customers/CommentBlock'

const width = Dimensions.get('screen').width

interface DateInfoBlockProps {
  date: Date
  setDate: any
  onEdit: any
  onAdd: any
  onGetScheule: any
}

export default function DateInfoBlock(props: DateInfoBlockProps) {
  const masters = useSelector((state: RootState) => state.masters)
  const schedule: any = useSelector((state: RootState) => state.schedule)

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

  const comment = (
    schedule['year-' + props.date.getFullYear()]?.[
      `month-${props.date.getMonth() + 1}`
    ]?.['date-' + props.date.getDate()] || []
  ).find((i: any) => i?.comment)?.comment

  const buttonPrevious = (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={OnPreviousDate}
      style={styles.dateButton}
    >
      <Ionicons name="chevron-back" size={width * 0.07} color={colors.text} />
    </TouchableOpacity>
  )

  const dateBlock = (
    <View style={styles.dateBlock}>
      <Text
        style={[
          styles.date,
          { color: IsDateToday(props.date) ? colors.accent : colors.text },
        ]}
      >
        {props.date.getDate()}
      </Text>
      <Text
        style={[
          styles.weekDay,
          { color: IsDateToday(props.date) ? colors.accent : colors.text },
        ]}
      >
        {text.weekDaysShort[(props.date.getDay() || 7) - 1]}
      </Text>
    </View>
  )

  const buttonNext = (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={OnNextDate}
      style={styles.dateButton}
    >
      <Ionicons
        name="chevron-forward"
        size={width * 0.07}
        color={colors.text}
      />
    </TouchableOpacity>
  )

  const mastersBlock = (
    <View
      style={{
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: width * 0.02,
      }}
    >
      {[...masters]
        .sort((a: Master, b: Master) => a.number - b.number)
        .map((master: Master, index: number) => (
          <View
            key={index}
            style={[
              styles.masterBlock,
              {
                backgroundColor: master.color,
                opacity: Object.values(
                  schedule['year-' + props.date.getFullYear()]?.[
                    `month-${props.date.getMonth() + 1}`
                  ]?.['date-' + props.date.getDate()] || []
                ).find((m: any) => m === master.id)
                  ? 1
                  : 0,
              },
            ]}
          >
            <Text style={styles.masterBlockTitle}>{master.name}</Text>
          </View>
        ))}
    </View>
  )

  const getSheduleButton = (
    <TouchableOpacity
      style={styles.editButton}
      activeOpacity={0.8}
      onPress={props.onGetScheule}
    >
      <Ionicons name="grid-outline" size={width * 0.07} color={colors.text} />
    </TouchableOpacity>
  )

  const editScheduleButton = (
    <TouchableOpacity
      style={styles.editButton}
      activeOpacity={0.8}
      onPress={props.onEdit}
    >
      <Ionicons name="pencil" size={width * 0.06} color={colors.text} />
    </TouchableOpacity>
  )

  const createButton = (
    <TouchableOpacity
      style={styles.addButton}
      activeOpacity={0.8}
      onPress={props.onAdd}
    >
      <Ionicons name="add" size={width * 0.08} color={colors.text} />
    </TouchableOpacity>
  )

  return (
    <>
      <View style={styles.container}>
        {buttonPrevious}
        {dateBlock}
        {mastersBlock}
        {getSheduleButton}
        {editScheduleButton}
        {buttonNext}
      </View>
      {comment ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={props.onEdit}
          style={[styles.commentBlock]}
        >
          <CommentBlock comment={comment} />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '92%',
    height: width * 0.2,
    backgroundColor: colors.white,
    borderRadius: width * 0.03,
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
    aspectRatio: 0.8,
  },
  dateBlock: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: width * 0.1,
  },
  date: { fontSize: width * 0.07 },
  weekDay: { fontSize: width * 0.05 },
  editButton: {
    height: '100%',
    aspectRatio: 0.6,
    borderWidth: width * 0.003,
    borderColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width * 0.02,
    marginLeft: width * 0.02,
  },
  addButton: {
    height: '100%',
    aspectRatio: 1,
    borderWidth: width * 0.003,
    borderColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width * 0.02,
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

  commentBlock: {
    width: '92%',
    backgroundColor: colors.white,
    borderRadius: width * 0.03,
    padding: width * 0.02,
    paddingBottom: 0,
    marginTop: width * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})
