import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigation from './navigation/MainNavigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MMKV } from 'react-native-mmkv'
import { Dimensions, StatusBar, Text, View } from 'react-native'
import colors from './constants/colors'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from './redux/store'
import { useEffect, useState } from 'react'
import { RootState } from './redux'
import { auth } from './firebase'
import { getDatabase, onValue, ref } from 'firebase/database'
import { updateCustomers } from './redux/customers'
import { Customer, Procedure } from './constants/interfaces'
import Toast from 'react-native-toast-message'
import { updateProcedures } from './redux/procedures'

export const storage = new MMKV()

function AppComponent() {
  const [update, setUpdate] = useState<boolean>(false)
  const schedule = useSelector((state: RootState) => state.schedule)

  const dispatch = useDispatch()

  function GetCustomers() {
    if (auth.currentUser && auth.currentUser.email) {
      const data = ref(getDatabase(), `business/PoboiskayaSofia/customers`)
      onValue(data, (snapshot) => {
        setUpdate(true)
        if (snapshot.val()) {
          dispatch(updateCustomers(Object.values(snapshot.val()) as Customer[]))
        }
      })
    }
  }

  function GetProcedures() {
    if (auth.currentUser && auth.currentUser.email) {
      const data = ref(getDatabase(), `business/PoboiskayaSofia/procedures`)
      onValue(data, (snapshot) => {
        setUpdate(true)
        if (snapshot.val()) {
          dispatch(
            updateProcedures(Object.values(snapshot.val()) as Procedure[])
          )
        }
      })
    }
  }

  useEffect(() => {
    if (!update) {
      GetProcedures()
      GetCustomers()
    }
  }, [schedule])
  return <StatusBar barStyle={'light-content'} backgroundColor={colors.card1} />
}

const width = Dimensions.get('screen').width

export default function App() {
  const toastConfig = {
    ToastMessage: ({ props }: any) => (
      <View
        style={{
          width: '92%',
          backgroundColor: colors.black,
          padding: width * 0.04,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: width * 0.015,
        }}
      >
        <Text
          style={{
            fontSize: width * 0.05,
            color: colors.white,
            textAlign: 'left',
          }}
        >
          {props.title}
        </Text>
      </View>
    ),
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <AppComponent />
          <MainNavigation />
        </NavigationContainer>
      </GestureHandlerRootView>
      <Toast config={toastConfig} />
    </Provider>
  )
}
