import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { memo } from 'react'
import colors from '../../constants/colors'
import text from '../../constants/text'
import { Ionicons } from '@expo/vector-icons'

const width = Dimensions.get('screen').width

function MonthCard(props: { date: Date; setDate: any }) {
  function OnPreviousMonth() {
    const date = new Date(props.date)
    date.setDate(0)
    props.setDate(date)
  }

  function OnNextMonth() {
    const date = new Date(props.date)
    date.setDate(1)
    date.setMonth(date.getMonth() + 1)
    props.setDate(date)
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={OnPreviousMonth}
        style={styles.button}
      >
        <Ionicons name="chevron-back" size={width * 0.07} color={colors.text} />
      </TouchableOpacity>
      <Text style={styles.title}>
        {props.date.getFullYear()} {text.months[props.date.getMonth()]}
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={OnNextMonth}
        style={styles.button}
      >
        <Ionicons
          name="chevron-forward"
          size={width * 0.07}
          color={colors.text}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '92%',
    height: width * 0.12,
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: width * 0.03,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: width * 0.02,
  },
  title: {
    fontSize: width * 0.06,
    color: colors.text,
  },
  button: {
    height: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
export default memo(MonthCard)
