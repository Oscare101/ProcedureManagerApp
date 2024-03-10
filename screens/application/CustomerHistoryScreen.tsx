import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import globalStyles from '../../constants/globalStyles'
import Header from '../../components/application/Header'
import RenderCustomerHistoryItem from '../../components/customers/RenderCustomerHistoryItem'
import { Master, Procedure } from '../../constants/interfaces'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux'
import text from '../../constants/text'
import colors from '../../constants/colors'

const width = Dimensions.get('screen').width

export default function CustomerHistoryScreen({ navigation, route }: any) {
  const masters: Master[] = useSelector((state: RootState) => state.masters)
  const procedures: Procedure[] = useSelector(
    (state: RootState) => state.procedures
  )
  return (
    <View style={globalStyles.container}>
      <Header title={route.params.customer.name} action="back" />
      {!route.params.history.length ? (
        <Text style={styles.comment}>{text.noHistoryYet}</Text>
      ) : (
        <></>
      )}
      <FlatList
        style={{ width: '100%' }}
        data={route.params.history}
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
    </View>
  )
}

const styles = StyleSheet.create({
  comment: {
    fontSize: width * 0.06,
    color: colors.comment,
    marginTop: width * 0.05,
  },
})
