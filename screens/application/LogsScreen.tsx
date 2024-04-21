import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
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
import { Log } from '../../constants/interfaces'
import LogItem from '../../components/logs/LogItem'

const width = Dimensions.get('screen').width

export default function LogsScreen({ navigation }: any) {
  const logs: Log[] = useSelector((state: RootState) => state.logs)

  // const [search, setSearch] = useState<string>('')

  return (
    <View style={globalStyles.container}>
      <Header title={text.History} action={'drawer'} />
      {/* <SearchBlock
        value={search}
        setValue={(value: string) => setSearch(value)}
      /> */}
      <FlatList
        keyboardShouldPersistTaps="always"
        style={{ width: '100%', marginTop: width * 0.05 }}
        data={logs}
        renderItem={({ item }) => <LogItem item={item} />}
        ListFooterComponent={() => <View style={{ height: width * 0.2 }} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
