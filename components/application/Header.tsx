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
  action: 'drawer' | 'back' | 'modal'
  onModal: any
}

export default function Header(props: HeaderProps) {
  const navigation: any = useNavigation()
  return (
    <View style={styles.header}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (props.action === 'drawer') {
            navigation.openDrawer()
          } else if (props.action === 'back') {
            navigation.goBack()
          } else {
            props.onModal()
          }
        }}
        style={styles.button}
      >
        <Ionicons
          name={props.action === 'drawer' ? 'menu-outline' : 'chevron-back'}
          size={width * 0.1}
          color={colors.card1Title}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{props.title}</Text>
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
  title: {
    fontSize: width * 0.06,
    color: colors.card1Title,
    marginRight: '5%',
  },
})
