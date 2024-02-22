import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from '../../constants/colors'

const width = Dimensions.get('screen').width

interface InputBlockProps {
  title: string
  action: any
  buttonStyles?: any
  titleStyles?: any
  loading?: boolean
}

export default function ButtonBlock(props: InputBlockProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.action}
      style={[styles.button, props.buttonStyles]}
    >
      {props.loading ? (
        <View style={styles.circle} />
      ) : (
        <Text style={[styles.title, props.titleStyles]}>{props.title}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: width * 0.12,
    width: '92%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card1,
    borderRadius: width * 0.03,
  },
  title: {
    color: colors.card1Title,
    fontSize: width * 0.06,
    fontWeight: '300',
  },
  circle: {
    height: '70%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: colors.card1Title,
    borderRadius: 100,
  },
})
