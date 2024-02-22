import { DrawerContentScrollView } from '@react-navigation/drawer'
import colors from '../constants/colors'
import { Dimensions, FlatList, StyleSheet, View } from 'react-native'
import DrawerHeader from '../components/drawer/DrawerHeader'
import text from '../constants/text'
import { RenderDrawerItem } from '../components/drawer/RenderDrawerItem'

const width = Dimensions.get('screen').width

export default function CustomDrawerContent(props: any) {
  const screensButtonData = [
    {
      title: text.calendarTitle,
      icon: 'grid-outline',
      screen: 'CalendarScreen',
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
        <FlatList
          scrollEnabled={false}
          style={{ width: '100%', marginTop: width * 0.05 }}
          data={screensButtonData}
          renderItem={({ item }) => (
            <RenderDrawerItem
              item={item}
              index={props.state.index}
              routeNames={props.state.routeNames}
              navigation={(screen: string) => props.navigation.jumpTo(screen)}
            />
          )}
          ItemSeparatorComponent={() => (
            <View
              style={{
                width: '92%',
                height: 1,
                alignSelf: 'center',
                backgroundColor: colors.card2,
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
})
