import { useNavigation } from '@react-navigation/native'
import { DrawerActions } from '@react-navigation/native'
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'

const width = Dimensions.get('screen').width

export default function DrawerHeader() {
  const navigation: any = useNavigation()

  return (
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
      <></>
    </View>
  )
}

const styles = StyleSheet.create({
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
})
