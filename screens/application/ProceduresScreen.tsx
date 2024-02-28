import { Dimensions, ScrollView, View } from 'react-native'
import globalStyles from '../../constants/globalStyles'
import Header from '../../components/application/Header'
import text from '../../constants/text'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import { Procedure } from '../../constants/interfaces'
import ProceduresCard from '../../components/procedures/ProceduresCard'

const width = Dimensions.get('screen').width

export default function ProceduresScreen({ navigation }: any) {
  const procedures: Procedure[] = useSelector(
    (state: RootState) => state.procedures
  )

  return (
    <View style={globalStyles.container}>
      <Header title={text.procedures} action="back" />
      <ScrollView style={{ width: '100%' }}>
        <ProceduresCard
          procedures={procedures.filter(
            (p: Procedure) => p.type === 'cleaning'
          )}
        />
        <ProceduresCard
          procedures={procedures.filter((p: Procedure) => p.type === 'peeling')}
        />
        <ProceduresCard
          procedures={procedures.filter((p: Procedure) => p.type === 'meso')}
        />
        <ProceduresCard
          procedures={procedures.filter(
            (p: Procedure) => p.type === 'additional'
          )}
        />
        <ProceduresCard
          procedures={procedures.filter((p: Procedure) => p.type === 'care')}
        />
        <ProceduresCard
          procedures={procedures.filter((p: Procedure) => p.type === 'other')}
        />
      </ScrollView>
    </View>
  )
}
