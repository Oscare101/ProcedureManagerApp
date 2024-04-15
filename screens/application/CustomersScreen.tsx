import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import globalStyles from '../../constants/globalStyles'
import Header from '../../components/application/Header'
import text from '../../constants/text'
import SearchBlock from '../../components/customers/SearchBlock'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux'
import RenderCustomerItem from '../../components/customers/RenserCustomerItem'
import { Ionicons } from '@expo/vector-icons'
import colors from '../../constants/colors'
import { FilterCustomerSearch } from '../../functions/functions'

const width = Dimensions.get('screen').width

export default function CustomersScreen({ navigation, route }: any) {
  const customers = useSelector((state: RootState) => state.customers)

  const [search, setSearch] = useState<string>('')

  return (
    <View style={globalStyles.container}>
      <Header
        title={text.customersTitle}
        action={route.params?.withoutDrawer ? 'back' : 'drawer'}
      />
      <SearchBlock
        value={search}
        setValue={(value: string) => setSearch(value)}
      />
      <FlatList
        keyboardShouldPersistTaps="always"
        style={{ width: '100%', marginTop: width * 0.05 }}
        data={FilterCustomerSearch([...customers].reverse(), search)}
        renderItem={({ item }) => (
          <RenderCustomerItem
            item={item}
            withoutDrawer={route.params?.withoutDrawer}
          />
        )}
        ListFooterComponent={() => <View style={{ height: width * 0.2 }} />}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('CreateCustomerScreen')
        }}
        style={styles.createCustomerButton}
      >
        <Ionicons name="add" size={width * 0.1} color={colors.card2Title} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  createCustomerButton: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.15,
    position: 'absolute',
    right: width * 0.05,
    bottom: width * 0.05,
    backgroundColor: colors.card2,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
