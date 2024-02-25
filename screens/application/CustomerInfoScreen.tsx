import {
  Dimensions,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import globalStyles from '../../constants/globalStyles'
import Header from '../../components/application/Header'
import text from '../../constants/text'
import colors from '../../constants/colors'
import { OpenMessenger, ReturnPhoneString } from '../../functions/functions'
import { Ionicons } from '@expo/vector-icons'
import ButtonBlock from '../../components/application/ButtonBlock'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { Customer } from '../../constants/interfaces'

const width = Dimensions.get('screen').width

export default function CustomerInfoScreen({ navigation, route }: any) {
  const customers = useSelector((state: RootState) => state.customers)
  const customer: Customer =
    customers.find((c: Customer) => c.id === route.params.customer.id) ||
    route.params.customer

  const customerData = [
    {
      title: text.name,
      value: customer.name,
    },
    {
      title: text.phone,
      value: ReturnPhoneString(customer.phone),
      icon: 'call-outline',
      onPress: () => {
        Linking.openURL(`tel:${customer.phone}`)
      },
    },
    {
      title: text.messenger,
      value: customer.messenger,
      icon: 'open-outline',
      onPress: () => {
        OpenMessenger(customer)
      },
    },
  ]

  function RenderCustomerInfoItem({ item }: any) {
    return (
      <TouchableOpacity
        disabled={!item.onPress}
        activeOpacity={0.8}
        onPress={item.onPress}
        style={styles.card}
      >
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardValue}>{item.value}</Text>
        {item.icon ? (
          <Ionicons
            name={item.icon}
            size={width * 0.05}
            color={colors.text}
            style={{
              position: 'absolute',
              top: width * 0.02,
              right: width * 0.02,
            }}
          />
        ) : (
          <></>
        )}
      </TouchableOpacity>
    )
  }

  return (
    <View style={globalStyles.container}>
      <Header title={text.customerInfo} action="back" />

      <FlatList
        style={{ width: '100%' }}
        data={customerData}
        renderItem={RenderCustomerInfoItem}
      />
      <ButtonBlock
        title={text.edit}
        action={() => {
          navigation.navigate('CreateCustomerScreen', {
            customer: customer,
          })
        }}
        buttonStyles={{ marginBottom: width * 0.05 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '95%',
    borderRadius: width * 0.03,
    padding: width * 0.02,
    backgroundColor: colors.white,
    marginTop: width * 0.02,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  cardTitle: {
    fontSize: width * 0.04,
    color: colors.comment,
  },
  cardValue: {
    fontSize: width * 0.05,
    color: colors.text,
  },
})
