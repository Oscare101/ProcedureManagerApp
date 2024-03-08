import { Dimensions, StyleSheet, Text, View } from 'react-native'
import colors from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'

const width = Dimensions.get('screen').width

export default function CommentBlock(props: { comment: string }) {
  return (
    <View style={styles.commentBlock}>
      <Ionicons
        name="chatbubble-ellipses-outline"
        size={width * 0.05}
        color={colors.comment}
      />
      <Text style={styles.comment}>{props.comment}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  commentBlock: {
    width: width * 0.92 * 0.96,
    borderRadius: width * 0.02,
    backgroundColor: colors.bg,
    marginBottom: width * 0.02,
    alignSelf: 'center',
    padding: width * 0.02,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  comment: {
    fontSize: width * 0.04,
    color: colors.text,
    flex: 1,
    marginLeft: width * 0.02,
  },
})
