import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { PanGestureHandler } from 'react-native-gesture-handler'

const width = Dimensions.get('screen').width

interface HeaderProps {
  title: string
  toggleValue: boolean
  setValue: any
}

export default function CalendarHeader(props: HeaderProps) {
  const navigation: any = useNavigation()

  const handleGesture = (e: any) => {
    const { nativeEvent } = e
    if (
      Math.abs(nativeEvent.translationY) > Math.abs(nativeEvent.translationX) &&
      nativeEvent.velocityY < 0
    ) {
      props.setValue(false)
    } else if (
      Math.abs(nativeEvent.translationY) > Math.abs(nativeEvent.translationX) &&
      nativeEvent.velocityY > 0
    ) {
      props.setValue(true)
    }
  }
  return (
    <PanGestureHandler onEnded={handleGesture}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.openDrawer()}
          style={styles.button}
        >
          <Ionicons
            name="menu-outline"
            size={width * 0.1}
            color={colors.card1Title}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => props.setValue(!props.toggleValue)}
          style={styles.toggleButton}
        >
          <Ionicons
            name={props.toggleValue ? 'chevron-up' : 'chevron-down'}
            size={width * 0.06}
            color={colors.card1Title}
          />

          <Text style={styles.title}>{props.title}</Text>
        </TouchableOpacity>
      </View>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: width * 0.15,
    backgroundColor: colors.card1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    height: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButton: {
    height: '100%',
    paddingHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: width * 0.06,
    color: colors.card1Title,
    marginLeft: '5%',
  },
})
