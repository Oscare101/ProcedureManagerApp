import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import text from '../../constants/text'
import colors from '../../constants/colors'
import { UpdateSchedule } from '../../functions/actions'
import { Ionicons } from '@expo/vector-icons'
import { Master } from '../../constants/interfaces'
import InputBlock from '../application/InputBlock'
import { useEffect, useState } from 'react'
import ButtonBlock from '../application/ButtonBlock'

const width = Dimensions.get('screen').width

export default function MastersScheduleModal(props: {
  date: Date
  setDate: any
  onClose: any
}) {
  const masters = useSelector((state: RootState) => state.masters)
  const schedule: any = useSelector((state: RootState) => state.schedule)

  const [comment, setComment] = useState<string>('')

  function onlyUnique(value: any, index: any, array: any) {
    return array.indexOf(value) === index
  }

  function GetComment() {
    let scheduleArr =
      schedule['year-' + props.date.getFullYear()]?.[
        'month-' + (props.date.getMonth() + 1)
      ]?.['date-' + props.date.getDate()] || []
    setComment(scheduleArr.find((i: any) => i?.comment)?.comment)
  }

  useEffect(() => {
    GetComment()
  }, [props.date])

  async function SetSchedule(masterId: string) {
    let newSchedule = (
      schedule['year-' + props.date.getFullYear()]?.[
        'month-' + (props.date.getMonth() + 1)
      ]?.['date-' + props.date.getDate()] || []
    ).filter((i: any) => typeof i === 'string')
    if (newSchedule.includes(masterId)) {
      newSchedule = newSchedule.filter((master: string) => master !== masterId)
    } else {
      newSchedule = [...newSchedule, masterId].sort()
    }

    await UpdateSchedule(
      props.date,
      comment
        ? [...newSchedule.filter(onlyUnique), { comment: comment }]
        : newSchedule.filter(onlyUnique)
    )
  }

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

  async function SaveComment() {
    let newSchedule = (
      schedule['year-' + props.date.getFullYear()]?.[
        'month-' + (props.date.getMonth() + 1)
      ]?.['date-' + props.date.getDate()] || []
    ).filter((i: any) => typeof i === 'string')

    await UpdateSchedule(
      props.date,
      comment ? [...newSchedule, { comment: comment }] : newSchedule
    )
    props.onClose()
  }

  function RenderMasterItem({ item }: any) {
    const isWorking: boolean = !!schedule['year-' + props.date.getFullYear()]?.[
      'month-' + (props.date.getMonth() + 1)
    ]?.['date-' + props.date.getDate()]?.find(
      (master: string) => master === item.id
    )
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => SetSchedule(item.id)}
        style={[
          styles.button,
          { backgroundColor: isWorking ? colors.card2 : colors.bg },
        ]}
      >
        <View
          style={[
            styles.nameBlock,
            { backgroundColor: item.color, opacity: isWorking ? 1 : 0.5 },
          ]}
        >
          <Text
            style={[
              styles.name,
              { color: isWorking ? colors.white : colors.text },
            ]}
          >
            {item.name}
          </Text>
        </View>
        <Text
          style={[
            styles.status,
            { color: isWorking ? colors.white : colors.comment },
          ]}
        >
          {isWorking ? text.working : text.dayOff}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <>
      <View style={styles.dateBlock}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={OnPreviousDate}
          style={styles.dateButton}
        >
          <Ionicons
            name="chevron-back"
            size={width * 0.06}
            color={colors.text}
          />
        </TouchableOpacity>
        <Text style={styles.dateTitle}>
          {props.date.getDate()} {text.months[props.date.getMonth()]}
        </Text>
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
      </View>
      <View style={{ height: width * 0.36 }}>
        <FlatList
          data={[...masters].sort(
            (a: Master, b: Master) => a.number - b.number
          )}
          renderItem={RenderMasterItem}
        />
      </View>

      <InputBlock
        value={comment}
        setValue={(value: string) => setComment(value)}
        type="text"
        placeHolder={text.comment}
        styles={{
          backgroundColor: colors.bg,
          width: '90%',
          marginBottom: width * 0.02,
        }}
      />
      <ButtonBlock
        buttonStyles={{ width: '90%' }}
        title={text.save}
        action={SaveComment}
      />
    </>
  )
}

const styles = StyleSheet.create({
  dateBlock: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: width * 0.1,
    marginBottom: width * 0.02,
  },
  dateTitle: { fontSize: width * 0.06, color: colors.text },
  dateButton: {},
  button: {
    width: '95%',
    height: width * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: width * 0.02,
    marginBottom: width * 0.02,
    alignSelf: 'center',
  },
  nameBlock: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderRadius: width * 0.02,
  },
  name: { fontSize: width * 0.05 },
  status: {
    flex: 1,
    textAlign: 'center',
    fontSize: width * 0.05,
    fontWeight: '300',
  },
})
