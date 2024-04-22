import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { Log } from '../../constants/interfaces'
import { useNavigation } from '@react-navigation/native'

import { useDispatch } from 'react-redux'
import text from '../../constants/text'
import { GetDateString } from '../../functions/functions'
import LogStatus from './LogStatus'

const width = Dimensions.get('screen').width

export default function LogItem(props: { item: Log; needDateTitle: boolean }) {
  const navigation: any = useNavigation()
  const dispatch = useDispatch()

  function GetStatus() {
    switch (props.item.action) {
      case 'deleteAgenda':
        return 'delete'
      case 'createAgenda':
        return 'create'
      default:
        return 'none'
    }
  }

  function GetTitle() {
    switch (props.item.action) {
      case 'deleteAgenda':
        return text.deleteAgendaComment
      case 'createAgenda':
        return text.createAgendaComment
      default:
        return 'none'
    }
  }

  return (
    <>
      {props.needDateTitle ? (
        <Text style={styles.dateTitle}>
          {GetDateString(new Date(+props.item.id))} (
          {text.weekDaysShort[(new Date(+props.item.id).getDay() || 7) - 1]})
        </Text>
      ) : (
        <></>
      )}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {}}
        style={styles.card}
      >
        <View style={styles.rowBetween}>
          <View style={styles.nameBlock}>
            <Text style={styles.name}>
              {new Date(+props.item.id).getHours()}:
              {new Date(+props.item.id).getMinutes()}
            </Text>
          </View>
          <LogStatus title={GetTitle()} status={GetStatus()} />
        </View>

        {/* <Ionicons
          name="open-outline"
          size={width * 0.05}
          color={colors.text}
          style={styles.openIcon}
        /> */}

        <View style={styles.rowBetween}>
          <View style={styles.rowStart}>
            <Text
              style={[
                styles.customerInfo,
                {
                  color: colors.text,
                },
              ]}
            >
              {props.item.action}
            </Text>
          </View>
          <View style={styles.rowStart}>
            <Text
              style={[
                styles.customerInfo,
                {
                  color: colors.text,
                },
              ]}
            >
              {props.item.type}
            </Text>
          </View>
        </View>
        <Text>{JSON.stringify(props.item.data)}</Text>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  dateTitle: {
    width: '92%',
    alignSelf: 'center',
    fontSize: width * 0.04,
    color: colors.text,
    marginBottom: width * 0.02,
  },
  card: {
    width: '92%',
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: width * 0.03,
    marginBottom: width * 0.02,
  },
  rowBetween: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameBlock: {
    borderTopLeftRadius: width * 0.03,
    borderBottomRightRadius: width * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card2,
    paddingVertical: width * 0.01,
    paddingHorizontal: width * 0.04,
  },
  name: {
    fontSize: width * 0.04,
    color: colors.card2Title,
  },
  openIcon: { position: 'absolute', top: width * 0.015, right: width * 0.015 },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '50%',
    paddingHorizontal: width * 0.01,
  },
  rowStart: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: width * 0.01,
  },
  customerInfo: {
    fontSize: width * 0.035,
    marginLeft: width * 0.01,
    color: colors.text,
  },
})
