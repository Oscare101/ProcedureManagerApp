import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { Agenda, Customer } from '../../constants/interfaces'
import RenderMessengerIcon from './RenderMessengerIcon'
import { useNavigation } from '@react-navigation/native'
import {
  ReturnCustomerMessenger,
  ReturnPhoneString,
} from '../../functions/functions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { updateAgenda } from '../../redux/agenda'
import text from '../../constants/text'

interface RenderCustomerItemProps {
  item: Customer
  withoutDrawer: boolean
}

const width = Dimensions.get('screen').width

export default function RenderCustomerItem(props: RenderCustomerItemProps) {
  const agenda: Agenda = useSelector((state: RootState) => state.agenda)

  const navigation: any = useNavigation()
  const dispatch = useDispatch()

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        if (props.withoutDrawer) {
          dispatch(updateAgenda({ ...agenda, customerId: props.item.id }))
          navigation.goBack()
        } else {
          navigation.navigate('CustomerInfoScreen', { customer: props.item })
        }
      }}
      style={styles.card}
    >
      <View style={styles.rowBetween}>
        <View style={styles.nameBlock}>
          <Text style={styles.name}>{props.item.name}</Text>
        </View>
      </View>
      {props.withoutDrawer ? (
        <></>
      ) : (
        <Ionicons
          name="open-outline"
          size={width * 0.05}
          color={colors.text}
          style={styles.openIcon}
        />
      )}

      <View style={styles.rowBetween}>
        <View style={styles.rowStart}>
          <RenderMessengerIcon
            messenger={props.item.messenger}
            color={
              ReturnCustomerMessenger(props.item) ? colors.text : colors.comment
            }
          />
          <Text
            style={[
              styles.customerInfo,
              {
                color: ReturnCustomerMessenger(props.item)
                  ? colors.text
                  : colors.comment,
              },
            ]}
          >
            {ReturnCustomerMessenger(props.item) || text.noLink}
          </Text>
        </View>
        <View style={styles.rowStart}>
          <Ionicons
            name="call-outline"
            size={width * 0.05}
            color={colors.text}
          />
          <Text style={styles.customerInfo}>
            {ReturnPhoneString(props.item.phone)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '92%',
    // padding: width * 0.02,
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
