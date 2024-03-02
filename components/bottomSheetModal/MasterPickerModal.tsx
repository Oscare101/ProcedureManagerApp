import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { Agenda, Master } from '../../constants/interfaces'
import { auth } from '../../firebase'
import { useEffect, useState } from 'react'
import { getDatabase, onValue, ref } from 'firebase/database'
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from '../../constants/colors'
import text from '../../constants/text'
import { updateAgenda } from '../../redux/agenda'

const width = Dimensions.get('screen').width

export default function MasterPickerModal() {
  const masters: Master[] = useSelector((state: RootState) => state.masters)
  const agenda: Agenda = useSelector((state: RootState) => state.agenda)
  const dispatch = useDispatch()
  const [todayMasters, setTodayMasters] = useState<string[]>([])

  function GetSchedule() {
    if (auth.currentUser && auth.currentUser.email) {
      const data = ref(
        getDatabase(),
        `business/PoboiskayaSofia/schedule/year-${new Date(
          agenda.date
        ).getFullYear()}/month-${
          new Date(agenda.date).getMonth() + 1
        }/date-${new Date(agenda.date).getDate()}`
      )
      onValue(data, (snapshot) => {
        setTodayMasters(snapshot.val())
      })
    }
  }

  useEffect(() => {
    GetSchedule()
  }, [])

  function RenderMasterItem({ item }: any) {
    const isWorking: boolean = !!todayMasters?.find(
      (master: string) => master === item.id
    )
    const chosen = agenda.masterId === item.id
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={!isWorking}
        onPress={() => {
          dispatch(updateAgenda({ ...agenda, masterId: item.id }))
        }}
        style={[
          styles.button,
          {
            backgroundColor: !isWorking || !chosen ? colors.bg : colors.card2,
          },
        ]}
      >
        <View
          style={[
            styles.nameBlock,
            {
              backgroundColor: isWorking ? item.color : '#00000000',
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
            { color: !isWorking || !chosen ? colors.comment : colors.white },
          ]}
        >
          {chosen ? text.chosen : isWorking ? text.working : text.dayOff}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <>
      <FlatList
        data={[...masters].sort((a: Master, b: Master) => a.number - b.number)}
        renderItem={RenderMasterItem}
      />
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
