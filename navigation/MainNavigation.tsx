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
          name="Calendar"
          component={CalendarScreen}
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
          headerLeft: () => null,
        }}
        name="DrawerNavigation"
        component={DrawerNavigation}
      />
      {/* other screens then must apear without bottom tab navigation */}
      {/* <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => null,
          animationEnabled: true,
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="StockScreen"
        component={StockScreen}
      /> */}
    </Stack.Navigator>
  )

  return <>{navigation}</>
}
