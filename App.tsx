import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigation from './navigation/MainNavigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MMKV } from 'react-native-mmkv'
import { StatusBar } from 'react-native'
import colors from './constants/colors'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from './redux/store'
import { useEffect, useState } from 'react'
import { RootState } from './redux'
import { auth } from './firebase'
import { getDatabase, onValue, ref } from 'firebase/database'
import { updateCustomers } from './redux/customers'
import { Customer } from './constants/interfaces'

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

        dispatch(updateCustomers(Object.values(snapshot.val()) as Customer[]))
      })
    }
  }

  useEffect(() => {
    if (!update) {
      GetCustomers()
    }
  }, [schedule])
  return <StatusBar barStyle={'light-content'} backgroundColor={colors.card1} />
}

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <AppComponent />
          <MainNavigation />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  )
}
