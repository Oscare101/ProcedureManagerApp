import { Dimensions, FlatList, Text, View } from 'react-native'
import globalStyles from '../../constants/globalStyles'
import Header from '../../components/application/Header'
import text from '../../constants/text'
import SearchBlock from '../../components/clients/SearchBlock'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { auth } from '../../firebase'
import { getDatabase, onValue, ref } from 'firebase/database'
import { updateCustomers } from '../../redux/customers'
import { Customer } from '../../constants/interfaces'
import RenderCustomerItem from '../../components/clients/RenserCustomerItem'

const width = Dimensions.get('screen').width

export default function CustomersScreen({ navigation }: any) {
  const customers = useSelector((state: RootState) => state.customers)
  const dispatch = useDispatch()

  const [search, setSearch] = useState<string>('')

  function GetCustomers() {
    if (auth.currentUser && auth.currentUser.email) {
      const data = ref(getDatabase(), `business/PoboiskayaSofia/customers`)
      onValue(data, (snapshot) => {
        dispatch(updateCustomers(Object.values(snapshot.val()) as Customer[]))
      })
    }
  }

  useEffect(() => {
    GetCustomers()
  }, [])

  return (
    <View style={globalStyles.container}>
      <Header title={text.customersTitle} action="drawer" />
      <SearchBlock
        value={search}
        setValue={(value: string) => setSearch(value)}
      />
      <FlatList
        style={{ width: '100%', marginTop: width * 0.05 }}
        data={customers.filter((c: Customer) =>
          c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )}
        renderItem={({ item }) => <RenderCustomerItem item={item} />}
      />
    </View>
  )
}
