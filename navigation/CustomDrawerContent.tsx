import { DrawerContentScrollView } from '@react-navigation/drawer'
import colors from '../constants/colors'
import { StyleSheet, View } from 'react-native'
import DrawerHeader from '../components/drawer/DrawerHeader'
import text from '../constants/text'
import DrawerButtonsBlock from '../components/drawer/DrawerButtonsBlock'
import { RootState } from '../redux/store'
import { useSelector } from 'react-redux'
import { auth } from '../firebase'

export default function CustomDrawerContent(props: any) {
  const permissions: any = useSelector((state: RootState) => state.permissions)

  const screensData = [
    {
      title: text.calendarTitle,
      icon: 'grid-outline',
      iconActive: 'grid',
      screen: 'CalendarScreen',
    },
    {
      title: text.Statistics,
      icon: 'stats-chart-outline',
      iconActive: 'stats-chart',
      screen: 'StatisticsScreen',
    },
    {
      title: text.Settings,
      icon: 'settings-outline',
      iconActive: 'settings-sharp',
      screen: 'SettingsScreen',
    },
  ]

  const screensDataForAdmin = [
    {
      title: text.calendarTitle,
      icon: 'grid-outline',
      iconActive: 'grid',
      screen: 'CalendarScreen',
    },
    {
      title: text.customersTitle,
      icon: 'people-outline',
      iconActive: 'people',
      screen: 'CustomersScreen',
    },
    {
      title: text.Statistics,
      icon: 'stats-chart-outline',
      iconActive: 'stats-chart',
      screen: 'StatisticsScreen',
    },
    {
      title: text.Settings,
      icon: 'settings-outline',
      iconActive: 'settings-sharp',
      screen: 'SettingsScreen',
    },
    {
      title: text.History,
      icon: 'code-slash-outline',
      iconActive: 'code-slash',
      screen: 'LogsScreen',
    },
  ]

  return (
    <DrawerContentScrollView
      style={{
        flex: 1,
        padding: 0,
      }}
      contentContainerStyle={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: colors.card1,
      }}
      {...props}
    >
      <View style={styles.topContainer}>
        <DrawerHeader />
        <DrawerButtonsBlock
          data={
            auth.currentUser &&
            auth.currentUser.email &&
            permissions[auth.currentUser?.email.replaceAll('.', ',')] ===
              'admin'
              ? screensDataForAdmin
              : screensData
          }
          state={props.state}
          navigation={(screen: string) => props.navigation.jumpTo(screen)}
        />
      </View>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    width: '100%',
    backgroundColor: colors.card1,
  },
})
