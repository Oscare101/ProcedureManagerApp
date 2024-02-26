import { useNavigation } from '@react-navigation/native'
import {
  Dimensions,
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
  ReturnCustomerMessenger,
  ReturnPhoneString,
} from '../../functions/functions'
import { Ionicons } from '@expo/vector-icons'

const width = Dimensions.get('screen').width

export default function ChosenCustomerItem() {
  const agenda: Agenda = useSelector((state: RootState) => state.agenda)
  const customers: Customer[] = useSelector(
    (state: RootState) => state.customers
  )

  const navigation: any = useNavigation()

  const customer: any = customers.find(
    (c: Customer) => c.id === agenda.customerId
  )

  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <View style={styles.nameBlock}>
          <Text style={styles.name}>{customer?.name}</Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('CustomersScreen', { withoutDrawer: true })
          }
        >
          <Text style={styles.editButtonTitle}>{text.rechoose}</Text>
        </TouchableOpacity>
      </View>
      {/* <Ionicons
        name="open-outline"
        size={width * 0.05}
        color={colors.text}
        style={styles.openIcon}
      /> */}
      <View style={styles.rowBetween}>
        <View style={styles.rowStart}>
          <RenderMessengerIcon messenger={customer?.messenger} />
          <Text style={styles.customerInfo}>
            {ReturnCustomerMessenger(customer)}
          </Text>
        </View>
        <View style={styles.rowStart}>
          <Ionicons
            name="call-outline"
            size={width * 0.05}
            color={colors.text}
          />
          <Text style={styles.customerInfo}>
            {ReturnPhoneString(customer.phone)}
          </Text>
        </View>
      </View>
    </View>
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
