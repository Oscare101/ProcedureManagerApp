import { Dimensions, StyleSheet, Text, View } from 'react-native'
import globalStyles from '../../constants/globalStyles'
import { useEffect } from 'react'
import { MMKV } from 'react-native-mmkv'
import colors from '../../constants/colors'
import { LogIn } from '../../functions/actions'

export const storage = new MMKV()

const width = Dimensions.get('screen').width

export default function LaunchScreen({ navigation }: any) {
  async function LogInFunc(email: string, password: string) {
    const response = await LogIn(email, password)
    if (!response.error) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'DrawerNavigation' }],
      })
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'LogInScreen' }],
      })
    }
  }

  function GetData() {
    const email = storage.getString('email')
    const password = storage.getString('password')

    if (email && password) {
      LogInFunc(email, password)
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'LogInScreen' }],
      })
    }
  }

  useEffect(() => {
    GetData()
  }, [])

  return (
    <View style={[globalStyles.container, globalStyles.center]}>
      <Text style={styles.title}>Procedure</Text>
      <Text style={styles.title}>Manager</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: width * 0.1,
    color: colors.text,
  },
})
