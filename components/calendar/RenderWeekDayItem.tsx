import { Dimensions, StyleSheet, Text, View } from 'react-native'
import colors from '../../constants/colors'

const width = Dimensions.get('screen').width

export function RenderWeekDayItem(props: any) {
  return (
    <View
      style={{
        width: `${100 / 7}%`,
        height: width * 0.09,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={styles.weekDay}>{props.item}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  weekDay: {
    fontSize: width * 0.05,
    color: colors.cardPale,
  },
})
