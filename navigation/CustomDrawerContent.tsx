import { DrawerContentScrollView } from '@react-navigation/drawer'
import colors from '../constants/colors'
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import text from '../constants/text'
import { useNavigation } from '@react-navigation/native'
import { DrawerActions } from '@react-navigation/native'

const width = Dimensions.get('screen').width

export default function CustomDrawerContent(props: any) {
  const screensButtonData = [
    {
      title: 'Календар',
      icon: 'briefcase-outline',
      screen: 'CalendarScreen',
    },
  ]
  const navigation: any = useNavigation()

  function RenderScreenButtonItem({ item }: any) {
    const isCurrenctScreen: boolean =
      props.state.routeNames[props.state.index] === item.screen
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          props.navigation.jumpTo(item.screen)
        }}
        style={[
          styles.screenButton,
          {
            height: width * 0.13,
            paddingHorizontal: width * 0.05,
          },
        ]}
      >
        <Ionicons name={item.icon} size={18} color={colors.card2Title} />
        <Text
          style={{
            color: isCurrenctScreen ? colors.white : colors.card2Title,
            marginLeft: 20,
            fontSize: 18,
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    )
  }

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
        <View style={styles.drawerHeader}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
            style={styles.backButton}
          >
            <Ionicons
              name="chevron-back"
              size={width * 0.08}
              color={colors.card1Title}
            />
          </TouchableOpacity>
          <Text></Text>
        </View>
        <FlatList
          scrollEnabled={false}
          style={{ width: '100%', marginTop: 50 }}
          data={screensButtonData}
          renderItem={RenderScreenButtonItem}
          ItemSeparatorComponent={() => (
            <View
              style={{
                width: '92%',
                height: 1,
                alignSelf: 'center',
              }}
            />
          )}
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
  drawerHeader: {
    height: width * 0.15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    height: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenButton: {
    width: '92%',
    height: width * 0.13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: width * 0.05,
  },
})
