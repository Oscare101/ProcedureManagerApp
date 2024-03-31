import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import colors from '../../constants/colors'
import { useCallback, useEffect, useRef, useState } from 'react'
import WeekDaysBlock from './WeekDaysBlock'
import DatesBlock from './DatesBlock'
import MonthBlock from './MonthBlock'
import { PanGestureHandler } from 'react-native-gesture-handler'

const width = Dimensions.get('screen').width

interface CalendarBlockProps {
  open: boolean
  date: Date
  setDate: any
  onClose: any
}

export default function CalendarBlockWithoutSwipe(props: CalendarBlockProps) {
  const heightAnim = useRef(new Animated.Value(0)).current

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

  const handleGesture = (e: any) => {
    const { nativeEvent } = e
    if (
      Math.abs(nativeEvent.translationY) < Math.abs(nativeEvent.translationX) &&
      nativeEvent.velocityX > 0
    ) {
      OnPreviousMonth()
    } else if (
      Math.abs(nativeEvent.translationY) < Math.abs(nativeEvent.translationX) &&
      nativeEvent.velocityX < 0
    ) {
      OnNextMonth()
    } else if (
      Math.abs(nativeEvent.translationY) > Math.abs(nativeEvent.translationX) &&
      nativeEvent.velocityY < 0
    ) {
      props.onClose()
    }
  }

  return (
    <Animated.View style={[styles.calendarBlock, { height: heightAnim }]}>
      <PanGestureHandler onEnded={handleGesture}>
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
          <DatesBlock
            date={props.date}
            month={dateMonths}
            setDate={SetMonths}
          />
        </View>
      </PanGestureHandler>
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
