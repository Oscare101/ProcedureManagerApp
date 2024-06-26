import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import LaunchScreen from '../screens/login/LaunchScreen'
import CalendarScreen from '../screens/application/CalendarScreen'
import CustomDrawerContent from './CustomDrawerContent'
import LogInScreen from '../screens/login/LogInScreen'
import CustomersScreen from '../screens/application/CustomersScreen'
import CustomerInfoScreen from '../screens/application/CustomerInfoScreen'
import CreateCustomerScreen from '../screens/application/CreateCustomerScreen'
import CreateAgendaScreen from '../screens/application/CreateAgendaScreen'
import ProceduresScreen from '../screens/application/ProceduresScreen'
import AgendaInfoScreen from '../screens/application/AgendaInfoScreen'
import CustomerHistoryScreen from '../screens/application/CustomerHistoryScreen'
import { Dimensions } from 'react-native'
import SettingsScreen from '../screens/application/SettingsScreen'
import StatisticsScreen from '../screens/application/StatisticsScreen'
import CalendarScreenWithoutSwipe from '../screens/application/CalendarScreenWithoutSwipe'
import { RootState } from '../redux'
import { useSelector } from 'react-redux'
import { Settings } from '../constants/interfaces'
import LogsScreen from '../screens/application/LogsScreen'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const width = Dimensions.get('screen').width

export default function MainNavigation() {
  const settings: Settings = useSelector((state: RootState) => state.settings)

  function DrawerNavigation() {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          swipeEdgeWidth: width * 0.05,
        }}
      >
        <Drawer.Screen
          options={{ headerShown: false }}
          name="CalendarScreen"
          component={
            settings.swipe ? CalendarScreen : CalendarScreenWithoutSwipe
          }
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="CustomersScreen"
          component={CustomersScreen}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="StatisticsScreen"
          component={StatisticsScreen}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="SettingsScreen"
          component={SettingsScreen}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="LogsScreen"
          component={LogsScreen}
        />
      </Drawer.Navigator>
    )
  }

  const navigation = (
    <Stack.Navigator initialRouteName="LaunchScreen">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="LaunchScreen"
        component={LaunchScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="LogInScreen"
        component={LogInScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => null,
        }}
        name="DrawerNavigation"
        component={DrawerNavigation}
      />
      {/* other screens then must apear without bottom tab navigation */}
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => null,
          animationEnabled: true,
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="CustomerInfoScreen"
        component={CustomerInfoScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => null,
          animationEnabled: true,
          gestureDirection: 'horizontal',
          // gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="CreateCustomerScreen"
        component={CreateCustomerScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => null,
          animationEnabled: true,
          gestureDirection: 'horizontal',
          // gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="CreateAgendaScreen"
        component={CreateAgendaScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => null,
          animationEnabled: true,
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="CustomersScreen"
        component={CustomersScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => null,
          animationEnabled: true,
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="ProceduresScreen"
        component={ProceduresScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => null,
          animationEnabled: true,
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="AgendaInfoScreen"
        component={AgendaInfoScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => null,
          animationEnabled: true,
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="CustomerHistoryScreen"
        component={CustomerHistoryScreen}
      />
    </Stack.Navigator>
  )

  return <>{navigation}</>
}
