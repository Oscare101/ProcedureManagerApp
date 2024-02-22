import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import colors from '../../constants/colors'
import { useEffect, useRef } from 'react'
import WeekDaysBlock from './WeekDaysBlock'
import DatesBlock from './DatesBlock'
import MonthBlock from './MonthBlock'

const width = Dimensions.get('screen').width

interface CalendarBlockProps {
  open: boolean
  date: Date
  setDate: any
}

export default function CalendarBlock(props: CalendarBlockProps) {
  const heightAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: props.open ? width * 0.1 * 8 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start()
  }, [props.open])

  function OnPreviousMonth() {
    const date = new Date(props.date)
    date.setDate(0)
    props.setDate(date)
  }

  function OnNextMonth() {
    const date = new Date(props.date)
    date.setMonth(date.getMonth() + 1)
    date.setDate(1)
    props.setDate(date)
  }

  return (
    <Animated.View style={[styles.calendarBlock, { height: heightAnim }]}>
      <MonthBlock
        date={props.date}
        onPreviousMonth={OnPreviousMonth}
        onNextMonth={OnNextMonth}
      />
      <WeekDaysBlock />
      <DatesBlock
        date={props.date}
        setDate={(date: Date) => {
          props.setDate(date)
        }}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  calendarBlock: {
    width: '100%',
    backgroundColor: colors.card2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
})
