import { Text, View } from 'react-native'
import globalStyles from '../../constants/globalStyles'
import { useEffect } from 'react'

export default function LaunchScreen({ navigation }: any) {
  useEffect(() => {
    navigation.navigate('DrawerNavigation')
  }, [])

  return (
    <View style={globalStyles.container}>
      <Text>Launch</Text>
    </View>
  )
}
