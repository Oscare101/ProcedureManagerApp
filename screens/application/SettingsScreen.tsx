import { View } from 'react-native'
import globalStyles from '../../constants/globalStyles'
import Header from '../../components/application/Header'
import text from '../../constants/text'

export default function SettingsScreen({ navigation }: any) {
  return (
    <View style={globalStyles.container}>
      <Header title={text.Settings} action="drawer" />
    </View>
  )
}
