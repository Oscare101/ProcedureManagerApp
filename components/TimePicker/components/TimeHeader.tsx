import { Text, TouchableOpacity, View } from 'react-native'
import styles from '../constants/styles'
import colors from '../../../constants/colors'

export default function TimeHeader(props: any) {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.setActive('hour')}
        style={[styles.hourMinuteBlock, { ...props.timeCardStyles }]}
      >
        <Text
          style={[
            styles.hourMinuteTitle,
            {
              ...props.timeTitleStyles,
              color: props.active === 'hour' ? colors.card2 : colors.comment,
            },
          ]}
        >
          {props.hours.toString().padStart(2, '0')}
        </Text>
      </TouchableOpacity>
      <View style={styles.dotBlock}>
        <View
          style={[
            styles.dot,
            { backgroundColor: props.timeDotColor || colors.card2 },
          ]}
        />
        <View
          style={[
            styles.dot,
            { backgroundColor: props.timeDotColor || colors.card2 },
          ]}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.setActive('minute')}
        style={[styles.hourMinuteBlock, { ...props.timeCardStyles }]}
      >
        <Text
          style={[
            styles.hourMinuteTitle,
            {
              ...props.timeTitleStyles,
              color: props.active === 'minute' ? colors.card2 : colors.comment,
            },
          ]}
        >
          {props.minutes.toString().padStart(2, '0')}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
