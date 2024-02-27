import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import text from '../../constants/text'
import colors from '../../constants/colors'

const width = Dimensions.get('screen').width

export default function ChosenMasterItem(props: { action: any }) {
  return (
    <View>
      <TouchableOpacity
        style={styles.editButton}
        activeOpacity={0.8}
        onPress={props.action}
      >
        <Text style={styles.editButtonTitle}>{text.rechoose}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  editButton: {
    paddingVertical: width * 0.01,
    paddingHorizontal: width * 0.02,
    borderRadius: width * 0.02,
    backgroundColor: colors.bg,
    marginTop: width * 0.02,
    marginRight: width * 0.02,
  },
  editButtonTitle: {
    fontSize: width * 0.04,
    color: colors.text,
  },
})
