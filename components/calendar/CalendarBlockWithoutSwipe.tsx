import { Animated, Dimensions, FlatList, StyleSheet, View } from 'react-native'
import colors from '../../constants/colors'
import { useCallback, useEffect, useRef, useState } from 'react'
import WeekDaysBlock from './WeekDaysBlock'
import DatesBlock from './DatesBlock'
import MonthBlock from './MonthBlock'

const width = Dimensions.get('screen').width

interface CalendarBlockProps {
  open: boolean
  date: Date
  setDate: any
}

export default function CalendarBlockWithoutSwipe(props: CalendarBlockProps) {
  const heightAnim = useRef(new Animated.Value(0)).current
  const flatListRef: any = useRef(null)

  const [dateMonths, setDateMonths] = useState<Date>(new Date(props.date))

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: props.open ? width * 0.1 * 8 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start()
  }, [props.open])

  const SetMonths = useCallback((date: Date) => {
    props.setDate(date)
    setDateMonths(new Date(date))
  }, [])

  useEffect(() => {
    SetMonths(props.date)
  }, [props.date])

  function OnPreviousMonth() {
    const date = new Date(dateMonths)
    date.setDate(0)
    props.setDate(date)
    SetMonths(date)
  }

  function OnNextMonth() {
    const date = new Date(dateMonths)
    date.setDate(1)
    date.setMonth(date.getMonth() + 1)
    props.setDate(date)
    SetMonths(date)
  }

  return (
    <Animated.View style={[styles.calendarBlock, { height: heightAnim }]}>
      <View
        style={{
          width: width,
        }}
      >
        <MonthBlock
          date={dateMonths}
          onPreviousMonth={OnPreviousMonth}
          onNextMonth={OnNextMonth}
        />
        <WeekDaysBlock />
        <DatesBlock date={props.date} month={dateMonths} setDate={SetMonths} />
      </View>
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
