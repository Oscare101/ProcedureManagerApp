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

const width = Dimensions.get('screen').width

interface HeaderProps {
  title: string
  toggle: any
  toggleValue: boolean
}

export default function CalendarHeader(props: HeaderProps) {
  const navigation: any = useNavigation()
  return (
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
        onPress={props.toggle}
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
