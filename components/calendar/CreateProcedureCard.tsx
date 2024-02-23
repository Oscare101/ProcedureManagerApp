import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import globalStyles from '../../constants/globalStyles'
import text from '../../constants/text'
import colors from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
const width = Dimensions.get('screen').width

export default function CreateProcedureCard(props: any) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {}}
      style={[styles.card, globalStyles.scheduleCardHeight1]}
    >
      <Text style={styles.title}>{text.createProcedure}</Text>
      <Ionicons name="add" size={width * 0.05} color={colors.card2Title} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: colors.card2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: width * 0.01,
    paddingHorizontal: width * 0.01,
  },
  title: {
    fontSize: width * 0.035,
    color: colors.card2Title,
  },
})
