import { View } from 'react-native'
import globalStyles from '../../constants/globalStyles'
import Header from '../../components/application/Header'
import text from '../../constants/text'
import SwipeSwitcher from '../../components/settings/SwipeSwitcher'
import LogOutBlock from '../../components/settings/LogOutBlock'

export default function SettingsScreen({ navigation }: any) {
  return (
    <View style={globalStyles.container}>
      <Header title={text.Settings} action="drawer" />
      <SwipeSwitcher />
      <LogOutBlock />
    </View>
  )
}
