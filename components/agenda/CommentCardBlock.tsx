import { Dimensions, StyleSheet, Text, View } from 'react-native'
import colors from '../../constants/colors'
import text from '../../constants/text'
import globalStyles from '../../constants/globalStyles'
import { Ionicons } from '@expo/vector-icons'

const width = Dimensions.get('screen').width

export default function CommentCardBlock(props: { comment: string }) {
  return (
    <View style={[styles.card, { backgroundColor: colors.white }]}>
      <Text style={[styles.comment, { marginTop: 0 }]}>{text.comment}</Text>
      <View style={[globalStyles.rowBetween, { alignItems: 'flex-start' }]}>
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={width * 0.05}
          color={colors.comment}
        />
        <Text
          style={[
            styles.text,
            {
              marginVertical: 0,
              color: colors.text,
            },
          ]}
        >
          {props.comment}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  comment: {
    width: '92%',
    fontSize: width * 0.04,
    color: colors.comment,
    marginVertical: width * 0.01,
  },
  text: {
    width: '92%',
    fontSize: width * 0.04,
    marginVertical: width * 0.01,
  },

  card: {
    width: '92%',
    padding: width * 0.02,
    marginTop: width * 0.02,
    borderRadius: width * 0.03,
    alignSelf: 'center',
  },
})
