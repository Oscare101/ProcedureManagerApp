import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import globalStyles from '../../constants/globalStyles'
import { Ionicons } from '@expo/vector-icons'
import colors from '../../constants/colors'

const width = Dimensions.get('screen').width

export default function AgendaActionsBlock(props: {
  onRepeat: any
  onDelete: any
}) {
  return (
    <View style={[globalStyles.rowBetween, { width: width * 0.92 }]}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={props.onRepeat}
      >
        <Ionicons name="copy-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={props.onDelete}
      >
        <Ionicons name="trash-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.92 * 0.485,
    height: width * 0.12,
    backgroundColor: colors.white,
    marginTop: width * 0.02,
    borderRadius: width * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
})
