import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from '../../constants/colors'
import text from '../../constants/text'
import { useNavigation } from '@react-navigation/native'

const width = Dimensions.get('screen').width

export default function EmptyItem(props: { title: string; action: any }) {
  const navigation: any = useNavigation()
  return (
    <View style={[styles.card, styles.rowBetween]}>
      <Text style={styles.cardComment}>{props.title}</Text>
      <TouchableOpacity
        style={styles.editButton}
        activeOpacity={0.8}
        onPress={props.action}
      >
        <Text style={styles.editButtonTitle}>{text.choose}</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  card: {
    width: '92%',
    padding: width * 0.02,
    backgroundColor: colors.white,
    marginTop: width * 0.02,
    borderRadius: width * 0.03,
    height: width * 0.12,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardComment: { fontSize: width * 0.04, color: colors.comment },

  editButton: {
    paddingVertical: width * 0.01,
    paddingHorizontal: width * 0.02,
    borderRadius: width * 0.02,
    backgroundColor: colors.card2,
  },
  editButtonTitle: {
    fontSize: width * 0.04,
    color: colors.card2Title,
  },
})
