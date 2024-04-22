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
import {
  FilterCustomerSearch,
  FilterLogsSearch,
} from '../../functions/functions'
import { Log } from '../../constants/interfaces'
import LogItem from '../../components/logs/LogItem'

const width = Dimensions.get('screen').width

export default function LogsScreen({ navigation }: any) {
  const logs: Log[] = [
    ...useSelector((state: RootState) => state.logs),
  ].reverse()

  const [search, setSearch] = useState<string>('')

  return (
    <View style={globalStyles.container}>
      <Header title={text.History} action={'drawer'} />
      <SearchBlock
        value={search}
        setValue={(value: string) => setSearch(value)}
      />
      {logs.length ? (
        <FlatList
          keyboardShouldPersistTaps="always"
          style={{ width: '100%', marginTop: width * 0.05 }}
          data={FilterLogsSearch(logs, search)}
          renderItem={({ item, index }) => (
            <LogItem
              item={item}
              needDateTitle={
                new Date(
                  +FilterLogsSearch(logs, search)[index - 1]?.id
                )?.getDate() !==
                // new Date(+item.id).getDate()
                new Date(+FilterLogsSearch(logs, search)[index]?.id).getDate()
              }
            />
          )}
          ListFooterComponent={() => <View style={{ height: width * 0.2 }} />}
        />
      ) : (
        <Text style={styles.comment}>{text.NoLogsYet}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  comment: {
    fontSize: width * 0.04,
    marginTop: width * 0.02,
    color: colors.comment,
  },
})
