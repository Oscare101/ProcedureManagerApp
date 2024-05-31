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
  GetDateFormateFromString,
  OpenMessenger,
  ReturnCustomerMessenger,
  ReturnPhoneString,
} from '../../functions/functions'
import ButtonBlock from '../../components/application/ButtonBlock'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { Agenda, Customer, Master, Procedure } from '../../constants/interfaces'
import Toast from 'react-native-toast-message'
import { RenderCustomerInfoItem } from '../../components/customers/RenderCustomerInfoItem'
import RenderCustomerHistoryItem from '../../components/customers/RenderCustomerHistoryItem'
import { Ionicons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard'

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

  const customerHistory: Agenda[] = agendas.filter(
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
      onLongPress: async () => {
        await Clipboard.setStringAsync(customer.phone)
        Toast.show({
          type: 'ToastMessage',
          props: {
            title: customer.phone,
          },
          position: 'bottom',
        })
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
      onLongPress: async () => {
        if (customer.link) {
          await Clipboard.setStringAsync(customer.link)
          Toast.show({
            type: 'ToastMessage',
            props: {
              title: customer.link,
            },
            position: 'bottom',
          })
        }
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
      <View style={[globalStyles.rowBetween, { width: '92%' }]}>
        <Text style={styles.comment}>{text.historyAgendas}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('CustomerHistoryScreen', {
              history: customerHistory,
              customer: customer,
            })
          }}
          style={styles.openButton}
        >
          <Ionicons
            name="open-outline"
            size={width * 0.05}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
        data={customerHistory.sort(
          (a: Agenda, b: Agenda) =>
            GetDateFormateFromString(b.date).getTime() -
            GetDateFormateFromString(a.date).getTime()
        )}
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
            navigate={() =>
              navigation.navigate('AgendaInfoScreen', { agendaId: item.id })
            }
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
        buttonStyles={{
          marginBottom: width * 0.05,
          backgroundColor: '#00000000',
        }}
        titleStyles={{ color: colors.card1 }}
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
  openButton: {
    padding: width * 0.01,
  },
})
