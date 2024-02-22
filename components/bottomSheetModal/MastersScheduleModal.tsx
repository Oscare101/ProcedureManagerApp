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
import { Master } from '../../constants/interfaces'
import { UpdateSchedule } from '../../functions/actions'
import { useEffect } from 'react'

const width = Dimensions.get('screen').width

export default function MastersScheduleModal(props: { date: Date }) {
  const masters = useSelector((state: RootState) => state.masters)
  const schedule = useSelector((state: RootState) => state.schedule)

  async function SetSchedule(masterId: string) {
    let newSchedule = schedule[props.date.getDate()] || []
    if (newSchedule.includes(masterId)) {
      newSchedule = newSchedule.filter((master: string) => master !== masterId)
    } else {
      newSchedule = [...newSchedule, masterId].sort()
    }
    await UpdateSchedule(props.date, newSchedule)
  }

  function RenderMasterItem({ item }: any) {
    const isWorking: boolean = !!schedule[props.date.getDate()]?.find(
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
      <FlatList data={masters} renderItem={RenderMasterItem} />
    </>
  )
}

const styles = StyleSheet.create({
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
