import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import text from '../../constants/text'
import colors from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'

const width = Dimensions.get('screen').width

interface MonthBlockProps {
  year: number
  monthIndex: number
  setYear: any
  setMonthIndex: any
  onPreviousMonth: any
  onNextMonth: any
}

export default function MonthBlock(props: MonthBlockProps) {
  return (
    <View style={styles.block}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={props.onPreviousMonth}
        style={styles.button}
      >
        <Ionicons
          name="chevron-back"
          size={width * 0.06}
          color={colors.card2Title}
        />
      </TouchableOpacity>
      <Text style={styles.title}>
        {props.year} {text.months[props.monthIndex]}
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={props.onNextMonth}
        style={styles.button}
      >
        <Ionicons
          name="chevron-forward"
          size={width * 0.06}
          color={colors.card2Title}
        />
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  block: {
    width: '100%',
    height: width * 0.09,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: width * 0.05,
    color: colors.card2Title,
  },
  button: {
    height: '100%',
    aspectRatio: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
