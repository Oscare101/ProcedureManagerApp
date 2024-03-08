import { useNavigation } from '@react-navigation/native'
import {
  Dimensions,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import text from '../../constants/text'
import colors from '../../constants/colors'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import { Agenda, Customer } from '../../constants/interfaces'
import RenderMessengerIcon from '../customers/RenderMessengerIcon'
import {
  OpenMessenger,
  ReturnCustomerMessenger,
  ReturnPhoneString,
} from '../../functions/functions'
import { Ionicons } from '@expo/vector-icons'
import CommentBlock from '../customers/CommentBlock'

const width = Dimensions.get('screen').width

export default function ChosenCustomerItem(props: {
  customerId: string
  static?: boolean
}) {
  const customers: Customer[] = useSelector(
    (state: RootState) => state.customers
  )

  const navigation: any = useNavigation()

  const customer: any = customers.find(
    (c: Customer) => c.id === props.customerId
  )

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('CustomerInfoScreen', { customer: customer })
      }
      disabled={!props.static}
      style={styles.card}
    >
      <View style={styles.rowBetween}>
        <View style={styles.nameBlock}>
          <Text style={styles.name}>{customer?.name}</Text>
        </View>
        {props.static ? (
          <>
            <Ionicons
              name="open-outline"
              size={width * 0.05}
              color={colors.text}
              style={styles.openIcon}
            />
          </>
        ) : (
          <TouchableOpacity
            style={styles.editButton}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('CustomersScreen', { withoutDrawer: true })
            }
            disabled={props.static}
          >
            <Text style={styles.editButtonTitle}>{text.rechoose}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.rowBetween}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            OpenMessenger(customer)
          }}
          disabled={!ReturnCustomerMessenger(customer)}
          style={styles.rowStart}
        >
          <RenderMessengerIcon
            messenger={customer?.messenger}
            color={
              ReturnCustomerMessenger(customer) ? colors.text : colors.comment
            }
          />
          <Text
            style={[
              styles.customerInfo,
              {
                color: ReturnCustomerMessenger(customer)
                  ? colors.text
                  : colors.comment,
              },
            ]}
          >
            {ReturnCustomerMessenger(customer) || text.noLink}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            Linking.openURL(`tel:${customer.phone}`)
          }}
          disabled={!ReturnPhoneString(customer.phone)}
          style={styles.rowStart}
        >
          <Ionicons
            name="call-outline"
            size={width * 0.05}
            color={
              ReturnPhoneString(customer.phone) ? colors.text : colors.comment
            }
          />
          <Text
            style={[
              styles.customerInfo,
              {
                color: ReturnPhoneString(customer.phone)
                  ? colors.text
                  : colors.comment,
              },
            ]}
          >
            {ReturnPhoneString(customer.phone) || text.noPhone}
          </Text>
        </TouchableOpacity>
      </View>
      {customer.comment ? <CommentBlock comment={customer.comment} /> : <></>}
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
    marginVertical: width * 0.02,
  },
  rowBetween: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  editButton: {
    paddingVertical: width * 0.01,
    paddingHorizontal: width * 0.02,
    borderRadius: width * 0.02,
    backgroundColor: colors.bg,
    marginTop: width * 0.02,
    marginRight: width * 0.02,
  },
  editButtonTitle: {
    fontSize: width * 0.04,
    color: colors.text,
  },
})
