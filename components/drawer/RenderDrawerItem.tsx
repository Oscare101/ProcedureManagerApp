import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'
import colors from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'

interface DrawerItemProps {
  item: any
  index: number
  navigation: any
  routeNames: any[]
}

const width = Dimensions.get('screen').width

export function RenderDrawerItem(props: DrawerItemProps) {
  const isCurrenctScreen: boolean =
    props.routeNames[props.index] === props.item.screen

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        props.navigation(props.item.screen)
      }}
      style={[
        styles.screenButton,
        {
          height: width * 0.13,
          paddingHorizontal: width * 0.05,
        },
      ]}
    >
      <Ionicons
        name={props.item.icon}
        size={18}
        color={isCurrenctScreen ? colors.white : colors.card2Title}
      />
      <Text
        style={{
          color: isCurrenctScreen ? colors.white : colors.card2Title,
          marginLeft: 20,
          fontSize: 18,
        }}
      >
        {props.item.title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  screenButton: {
    width: '92%',
    height: width * 0.13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: width * 0.05,
  },
})
