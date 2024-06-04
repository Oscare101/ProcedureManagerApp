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
import { Ionicons } from '@expo/vector-icons'
import { Agenda, Customer, Master, Procedure } from '../../constants/interfaces'
import {
  CalculateProcedureFinishTime,
  GetDateString,
  GetDiscountType,
  GetNumberFromTime,
  IsTimeBetweenTimes,
} from '../../functions/functions'
import * as Clipboard from 'expo-clipboard'
import Toast from 'react-native-toast-message'

const width = Dimensions.get('screen').width

export default function GetScheduleModal(props: { date: Date; setDate: any }) {
  const masters = useSelector((state: RootState) => state.masters)
  const schedule: any = useSelector((state: RootState) => state.schedule)
  const agendas: Agenda[] = useSelector((state: RootState) => state.agendas)
  const customers: Customer[] = useSelector(
    (state: RootState) => state.customers
  )
  const procedures: Procedure[] = useSelector(
    (state: RootState) => state.procedures
  )

  async function GetSchedule(masterId: string) {
    const agendasToCopy = agendas
      .filter(
        (a: Agenda) =>
          a.date === GetDateString(props.date) &&
          a.masterId === masterId &&
          !a.canceled
      )
      .sort(
        (a: Agenda, b: Agenda) =>
          GetNumberFromTime(a.time) - GetNumberFromTime(b.time)
      )

    const string: string = agendasToCopy
      .map((a: Agenda, index: number) => {
        const proceduresArr: any = a.procedures.map((item: any) => {
          return procedures.find((p: Procedure) => p.id === item)
        })
        const proceduresString = proceduresArr
          .sort((a: Procedure, b: Procedure) => b.time - a.time)
          .map((item: Procedure) => {
            return item?.short
          })
          .join(' ')
        const discountString: string = a.discount
          ? `${text.discount} ${a.discount.replace(/^\D+/g, '')} ${
              GetDiscountType(a.discount) === '%' ? '%' : text.UAHshort
            }`
          : ''
        const prepaymentString: string = a.prepayment
          ? `${text.prepayment} ${a.prepayment}`
          : ''
        const bracketsString: string =
          discountString || prepaymentString
            ? `(${prepaymentString}${
                prepaymentString && discountString ? ' + ' : ''
              }${discountString})`
            : ''

        return `${a.time} ${a.otherProcedure || proceduresString} ${
          a.otherPerson ||
          customers.find((c: Customer) => c.id === a.customerId)?.name
        } ${bracketsString}`
      })
      .join('\n')

    await Clipboard.setStringAsync(string)
    Toast.show({
      type: 'ToastMessage',
      props: {
        title: string,
      },
      position: 'bottom',
    })
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

  function RenderMasterItem({ item }: any) {
    const isWorking: boolean = !!schedule['year-' + props.date.getFullYear()]?.[
      'month-' + (props.date.getMonth() + 1)
    ]?.['date-' + props.date.getDate()]?.find(
      (master: string) => master === item.id
    )

    const hasAgendas: boolean = agendas.some(
      (a: Agenda) =>
        a.date === GetDateString(props.date) && a.masterId === item.id
    )

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => GetSchedule(item.id)}
        style={[
          styles.button,
          {
            backgroundColor: isWorking && hasAgendas ? colors.card2 : colors.bg,
          },
        ]}
        disabled={!isWorking}
      >
        <View
          style={[
            styles.nameBlock,
            {
              backgroundColor: item.color,
              opacity: isWorking && hasAgendas ? 1 : 0.5,
            },
          ]}
        >
          <Text
            style={[
              styles.name,
              { color: isWorking && hasAgendas ? colors.white : colors.text },
            ]}
          >
            {item.name}
          </Text>
        </View>
        <Text
          style={[
            styles.status,
            { color: isWorking && hasAgendas ? colors.white : colors.comment },
          ]}
        >
          {isWorking
            ? hasAgendas
              ? text.getSchedule
              : text.noScheduleYet
            : text.dayOff}
        </Text>
      </TouchableOpacity>
    )
  }

  async function GetFreeTimes(masterdId: Master['id']) {
    let times: any = [
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
      '18:30',
      '19:00',
      '19:30',
    ]

    const schedule: Agenda[] = agendas.filter(
      (a: Agenda) =>
        a.masterId === masterdId &&
        +a.date.split('.')[2] === props.date.getFullYear() &&
        +a.date.split('.')[1] === props.date.getMonth() + 1 &&
        +a.date.split('.')[0] === props.date.getDate() &&
        !a.canceled
    )

    schedule.forEach((a: Agenda) => {
      times = times
        .map((time: string) => {
          if (
            IsTimeBetweenTimes(
              a.time,
              CalculateProcedureFinishTime(a.time, a.duration),
              time,
              `${time.split(':')[0]}:${+time.split(':')[1] + 29}`
            )
          ) {
            return false
          } else {
            return time
          }
        })
        .filter((i: any) => !!i)
    })
    let nextTime = times[0]

    times = times
      .map((time: string, index: number) => {
        if (
          times[index + 1] &&
          times[index + 2] &&
          ((times[index + 1].split(':')[0] === time.split(':')[0] &&
            +times[index + 1].split(':')[1] === +time.split(':')[1] + 30) ||
            (+times[index + 1].split(':')[0] === +time.split(':')[0] + 1 &&
              +times[index + 1].split(':')[1] === +time.split(':')[1] - 30)) &&
          +times[index + 2].split(':')[0] === +time.split(':')[0] + 1 &&
          +times[index + 2].split(':')[1] === +time.split(':')[1] &&
          +nextTime.split(':')[0] <= +time.split(':')[0] &&
          nextTime.split(':')[1] <= +time.split(':')[1]
        ) {
          // nextTime = CalculateProcedureFinishTime(time, 90)
          return time
        }
      })
      .filter((i: any) => !!i)

    const string = schedule.length
      ? times.join(' ')
      : '10:00 11:30 13:00 15:00 17:00 18:30'

    await Clipboard.setStringAsync(string)
    Toast.show({
      type: 'ToastMessage',
      props: {
        title: string,
      },
      position: 'bottom',
    })
  }

  function RenderMasterFreeTimeItem({ item }: any) {
    const isWorking: boolean = !!schedule['year-' + props.date.getFullYear()]?.[
      'month-' + (props.date.getMonth() + 1)
    ]?.['date-' + props.date.getDate()]?.find(
      (master: string) => master === item.id
    )
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => GetFreeTimes(item.id)}
        disabled={!isWorking}
        style={[
          styles.button,
          {
            backgroundColor: isWorking ? colors.card2 : colors.bg,
          },
        ]}
      >
        <View
          style={[
            styles.nameBlock,
            {
              backgroundColor: item.color,
              opacity: isWorking ? 1 : 0.5,
            },
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
          {isWorking ? text.FreeTimes : text.dayOff}
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
      <Ionicons name="chevron-down" color={colors.text} size={width * 0.05} />
      <Text
        style={{
          fontSize: width * 0.04,
          color: colors.text,
          marginBottom: width * 0.02,
        }}
      >
        {text.GetFreeTimes} ({text.testing})
      </Text>
      <FlatList
        data={[...masters].sort((a: Master, b: Master) => a.number - b.number)}
        renderItem={RenderMasterFreeTimeItem}
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
