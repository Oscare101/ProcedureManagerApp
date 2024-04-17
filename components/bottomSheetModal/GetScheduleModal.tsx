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
import { GetDateString, GetNumberFromTime } from '../../functions/functions'
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
          a.date === GetDateString(props.date) && a.masterId === masterId
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

        return `${a.time} ${a.otherProcedure || proceduresString} ${
          a.otherPerson ||
          customers.find((c: Customer) => c.id === a.customerId)?.name
        }${a.prepayment ? ` (${text.prepayment} ${a.prepayment})` : ''}`
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

  async function GetFreeTimes(masterdId: Master['id']) {}

  function RenderMasterFreeTimeItem({ item }: any) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => GetFreeTimes(item.id)}
        style={[
          styles.button,
          {
            backgroundColor: colors.card2,
          },
        ]}
      >
        <View
          style={[
            styles.nameBlock,
            {
              backgroundColor: item.color,
              opacity: 1,
            },
          ]}
        >
          <Text style={[styles.name, { color: colors.white }]}>
            {item.name}
          </Text>
        </View>
        <Text style={[styles.status, { color: colors.white }]}>
          {'-------'}
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
      <Text style={{ fontSize: width * 0.04, color: colors.text }}>
        {text.GetFreeTimes}
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
