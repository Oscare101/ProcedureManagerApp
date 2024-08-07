import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { Customer, Log, Master, Procedure } from '../../constants/interfaces'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import text from '../../constants/text'
import {
  GetDateString,
  ReturnCustomerMessenger,
  ReturnPhoneString,
} from '../../functions/functions'
import LogStatus from './LogStatus'
import LogValueBlock from './LogValueBlock'
import { RootState } from '../../redux/store'
import RenderMessengerIcon from '../customers/RenderMessengerIcon'
import { memo } from 'react'

const width = Dimensions.get('screen').width

function LogItem(props: { item: Log; needDateTitle: boolean }) {
  const customers: Customer[] = useSelector(
    (state: RootState) => state.customers
  )
  const procedures: Procedure[] = useSelector(
    (state: RootState) => state.procedures
  )
  const masters: Master[] = useSelector((state: RootState) => state.masters)

  const navigation: any = useNavigation()

  function GetStatus() {
    switch (props.item.action) {
      case 'deleteAgenda':
        return 'delete'
      case 'updateAgenda':
        return 'update'
      case 'createAgenda':
        return 'create'
      case 'createCustomer':
        return 'create'
      case 'updateCustomer':
        return 'update'
      default:
        return 'none'
    }
  }

  function GetTitle() {
    switch (props.item.action) {
      case 'deleteAgenda':
        return text.deleteAgendaComment
      case 'updateAgenda':
        return text.updateAgendaComment
      case 'createAgenda':
        return text.createAgendaComment
      case 'createCustomer':
        return text.createCustomerComment
      case 'updateCustomer':
        return text.updateCustomerComment
      default:
        return 'none'
    }
  }

  function GetOpenLink() {
    switch (props.item.action) {
      case 'createAgenda':
        return navigation.navigate('AgendaInfoScreen', {
          agendaId: props.item.data.id,
        })
      case 'updateAgenda':
        return navigation.navigate('AgendaInfoScreen', {
          agendaId: props.item.data.id,
        })
      case 'createCustomer':
        return navigation.navigate('CustomerInfoScreen', {
          customer: props.item.data,
        })
      case 'updateCustomer':
        return navigation.navigate('CustomerInfoScreen', {
          customer: props.item.data,
        })
    }
  }

  function AgendaBlock() {
    const proceduresArr: any = props.item.data.procedures.map((item: any) => {
      return procedures.find((p: Procedure) => p.id === item)
    })
    const proceduresString = proceduresArr
      .sort((a: Procedure, b: Procedure) => b.time - a.time)
      .map((item: Procedure) => {
        return item?.short
      })
      .join(' ')

    return (
      <>
        <LogValueBlock title={props.item.data.time} icon="time-outline" />
        <LogValueBlock title={props.item.data.date} icon="calendar-outline" />
        <LogValueBlock
          title={
            props.item.data.otherPerson ||
            customers.find((c: Customer) => c.id === props.item.data.customerId)
              ?.name
          }
          icon="person-outline"
        />
        <View
          style={{
            backgroundColor: colors.bg,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
            paddingHorizontal: width * 0.02,
            paddingVertical: width * 0.01,
            maxWidth: width * 0.88,
          }}
        >
          <RenderMessengerIcon
            messenger={
              customers.find(
                (c: Customer) => c.id === props.item.data.customerId
              )?.messenger!
            }
            color={
              ReturnCustomerMessenger(
                customers.find(
                  (c: Customer) => c.id === props.item.data.customerId
                )!
              )
                ? colors.text
                : colors.comment
            }
          />
          <Text
            style={{
              color: ReturnCustomerMessenger(
                customers.find(
                  (c: Customer) => c.id === props.item.data.customerId
                )!
              )
                ? colors.text
                : colors.comment,
              fontSize: width * 0.04,
              marginLeft: width * 0.02,
            }}
          >
            {ReturnCustomerMessenger(
              customers.find(
                (c: Customer) => c.id === props.item.data.customerId
              )!
            ) || text.noLink}
          </Text>
        </View>
        <LogValueBlock title={proceduresString} icon="" />
        <LogValueBlock
          title={
            masters.find((c: Master) => c.id === props.item.data.masterId)
              ?.name || ''
          }
          icon=""
        />
      </>
    )
  }

  function CustomerBlock() {
    return (
      <>
        <LogValueBlock title={props.item.data.name} icon="person-outline" />
        <LogValueBlock
          title={ReturnPhoneString(props.item.data.phone)}
          icon="call-outline"
        />
        <View
          style={{
            backgroundColor: colors.bg,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
            paddingHorizontal: width * 0.02,
            paddingVertical: width * 0.01,
            maxWidth: width * 0.88,
          }}
        >
          <RenderMessengerIcon
            messenger={props.item.data?.messenger}
            color={
              ReturnCustomerMessenger(props.item.data)
                ? colors.text
                : colors.comment
            }
          />
          <Text
            style={{
              color: ReturnCustomerMessenger(props.item.data)
                ? colors.text
                : colors.comment,
              fontSize: width * 0.04,
              marginLeft: width * 0.02,
            }}
          >
            {ReturnCustomerMessenger(props.item.data) || text.noLink}
          </Text>
        </View>
      </>
    )
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
        onPress={GetOpenLink}
        style={styles.card}
      >
        <View style={styles.rowBetween}>
          <View style={styles.nameBlock}>
            <Text style={styles.name}>
              {new Date(+props.item.id).getHours()}:
              {new Date(+props.item.id)
                .getMinutes()
                .toString()
                .padStart(2, '0')}
            </Text>
          </View>
          {props.item.type === 'agenda' ? (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingLeft: width * 0.02,
              }}
            >
              <Ionicons
                name={
                  props.item.data.confirmed
                    ? 'checkbox-outline'
                    : 'square-outline'
                }
                size={width * 0.05}
                color={colors.text}
              />
            </View>
          ) : (
            <></>
          )}

          <LogStatus title={GetTitle()} status={GetStatus()} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: width * 0.02,
            margin: width * 0.02,
            flexWrap: 'wrap',
            width: width * 0.88,
            overflow: 'hidden',
          }}
        >
          {props.item.type === 'agenda' ? <AgendaBlock /> : <CustomerBlock />}
        </View>
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

export default memo(LogItem)
