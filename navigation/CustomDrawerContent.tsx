import { DrawerContentScrollView } from '@react-navigation/drawer'
import colors from '../constants/colors'
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const width = Dimensions.get('screen').width

export default function CustomDrawerContent(props: any) {
  const screensButtonData = [
    {
      title: 'Календар',
      icon: 'briefcase-outline',
      screen: 'PortfolioScreen',
    },
  ]

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
            color: colors.card2Title,
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
      }}
      {...props}
    >
      <View style={styles.topContainer}>
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
  navigationButton: {
    width: '92%',
    borderRadius: width * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },

  topBlock: {
    width: '100%',
    aspectRatio: 2,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  topBlockCircle: {
    width: '35%',
    aspectRatio: 1,
    borderRadius: width,
    position: 'absolute',
    right: '5%',
    bottom: '-35%',
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  money: {
    width: '100%',
    textAlign: 'left',
  },
  topContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    width: '100%',
  },
  screenButton: {
    width: '92%',
    height: width * 0.13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: width * 0.05,
  },
  card: {
    width: '92%',
    aspectRatio: 2,
    padding: width * 0.03,
    borderRadius: width * 0.03,
    marginTop: width * 0.03,
    alignSelf: 'center',
  },
  rowBetween: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  columnStart: {
    flexDirection: 'column',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
})
