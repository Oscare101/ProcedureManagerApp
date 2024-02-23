import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import rules from '../../constants/rules'
import { Customer } from '../../constants/interfaces'
import RenderMessengerIcon from './RenderMessengerIcon'

interface RenderCustomerItemProps {
  item: Customer
}

const width = Dimensions.get('screen').width

export default function RenderCustomerItem(props: RenderCustomerItemProps) {
  function ExtractInstagramUsername(url: string) {
    const regex = /instagram\.com\/([^/?]+)/
    const match = url.match(regex)
    if (match && match[1]) {
      return match[1]
    } else {
      return null
    }
  }

  function ReturnCustomerMessenger(customer: Customer) {
    return customer.messenger === 'instagram'
      ? ExtractInstagramUsername(customer.link)
      : customer.messenger === 'whatsapp'
      ? customer.phone
          .replace(/\D/g, '')
          .replace(rules.phoneRegrex, '+$1 ($2) $3 $4 $5')
      : customer.messenger === 'telegram'
      ? customer.link
      : customer.phone
          .replace(/\D/g, '')
          .replace(rules.phoneRegrex, '+$1 ($2) $3 $4 $5')
  }

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.card}>
      <View style={styles.rowBetween}>
        <View style={styles.nameBlock}>
          <Text style={styles.name}>{props.item.name}</Text>
        </View>
      </View>
      <Ionicons
        name="open-outline"
        size={width * 0.05}
        color={colors.text}
        style={styles.openIcon}
      />
      <View style={styles.rowBetween}>
        <View style={styles.column}>
          {/* <View style={styles.rowStart}>
            <Ionicons
              name="call-outline"
              size={width * 0.05}
              color={colors.text}
            />
            <Text style={styles.customerInfo}>
              {props.item.phone
                .replace(/\D/g, '')
                .replace(rules.phoneRegrex, '+$1 ($2) $3 $4 $5')}
            </Text>
          </View> */}
          <View style={styles.rowStart}>
            <RenderMessengerIcon messenger={props.item.messenger} />
            <Text style={styles.customerInfo}>
              {ReturnCustomerMessenger(props.item)}
            </Text>
          </View>
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
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: width * 0.01,
  },
  customerInfo: {
    fontSize: width * 0.035,
    marginLeft: width * 0.01,
  },
})