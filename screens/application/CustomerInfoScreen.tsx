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
import {
  OpenMessenger,
  ReturnCustomerMessenger,
  ReturnPhoneString,
} from '../../functions/functions'
import { Ionicons } from '@expo/vector-icons'
import ButtonBlock from '../../components/application/ButtonBlock'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { Agenda, Customer, Master, Procedure } from '../../constants/interfaces'
import Toast from 'react-native-toast-message'
import RenderMessengerIcon from '../../components/customers/RenderMessengerIcon'
import { RenderCustomerInfoItem } from './RenderCustomerInfoItem'
import RenderCustomerHistoryItem from './RenderCustomerHistoryItem'

const width = Dimensions.get('screen').width

export default function CustomerInfoScreen({ navigation, route }: any) {
  const agendas: Agenda[] = useSelector((state: RootState) => state.agendas)
  const masters: Master[] = useSelector((state: RootState) => state.masters)
  const procedures: Procedure[] = useSelector(
    (state: RootState) => state.procedures
  )
  const customers: Customer[] = useSelector(
    (state: RootState) => state.customers
  )
  const customer: Customer =
    customers.find((c: Customer) => c.id === route.params.customer.id) ||
    route.params.customer

  const customerHistory = agendas.filter(
    (a: Agenda) => a.customerId === customer.id
  )

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
      value: ReturnCustomerMessenger(customer),
      icon: 'open-outline',
      onPress: async () => {
        if (customer.messenger === 'telegram' && !customer.link) {
          Toast.show({
            type: 'ToastMessage',
            props: {
              title: text.cantOpenLink,
            },
            position: 'bottom',
          })
        }
        await OpenMessenger(customer)
      },
      messenger: customer.messenger,
    },
    {
      title: text.comment,
      value: customer?.comment,
    },
  ]

  return (
    <View style={globalStyles.container}>
      <Header title={text.customerInfo} action="back" />
      <View style={{ width: '100%' }}>
        <FlatList
          scrollEnabled={false}
          style={{ width: '100%' }}
          data={customerData}
          renderItem={RenderCustomerInfoItem}
        />
      </View>

      <Text style={styles.comment}>{text.historyAgendas}</Text>
      <FlatList
        style={{ width: '100%' }}
        scrollEnabled={false}
        data={customerHistory}
        renderItem={({ item }) => (
          <RenderCustomerHistoryItem
            item={item}
            master={masters.find((m: Master) => m.id === item.masterId)}
            proceduresString={item.procedures
              .map((item: any) => {
                return procedures.find((p: Procedure) => p.id === item)
              })
              .sort((a: any, b: any) => b.time - a.time)
              .map((item: any) => {
                return item?.short
              })
              .join(' ')}
          />
        )}
      />

      <View style={{ flex: 1 }} />
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
  comment: {
    width: '92%',
    fontSize: width * 0.05,
    color: colors.comment,
    marginVertical: width * 0.01,
  },
})
