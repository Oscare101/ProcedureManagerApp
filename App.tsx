import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigation from './navigation/MainNavigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MMKV } from 'react-native-mmkv'
import { StatusBar } from 'react-native'
import colors from './constants/colors'
import { Provider, useDispatch } from 'react-redux'
import { store } from './redux/store'
import { useEffect } from 'react'
import { auth } from './firebase'
import { getDatabase, onValue, ref } from 'firebase/database'
import { updateMasters } from './redux/masters'
import { Master } from './constants/interfaces'

export const storage = new MMKV()

export default function App() {
  function AppComponent() {
    return (
      <StatusBar barStyle={'light-content'} backgroundColor={colors.card1} />
    )
  }

  return (
    <Provider store={store}>
      <AppComponent />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  )
}
