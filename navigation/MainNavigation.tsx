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

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

export default function MainNavigation() {
  function DrawerNavigation() {
    return (
      <Drawer.Navigator
        initialRouteName="PortfolioScreen"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          options={{ headerShown: false }}
          name="CalendarScreen"
          component={CalendarScreen}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="CustomersScreen"
          component={CustomersScreen}
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
          gestureEnabled: true,
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
          gestureEnabled: true,
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
    </Stack.Navigator>
  )

  return <>{navigation}</>
}
