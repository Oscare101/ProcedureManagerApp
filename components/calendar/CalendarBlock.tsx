import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import colors from '../../constants/colors'
import { useEffect, useRef } from 'react'
import WeekDaysBlock from './WeekDaysBlock'
import DatesBlock from './DatesBlock'
import MonthBlock from './MonthBlock'

const width = Dimensions.get('screen').width

interface CalendarBlockProps {
  open: boolean
  chosenDate: string
  setChosenDate: any
  year: number
  monthIndex: number
  setYear: any
  setMonthIndex: any
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
    if (props.monthIndex) {
      props.setMonthIndex(props.monthIndex - 1)
    } else {
      props.setMonthIndex(11)
      props.setYear(props.year - 1)
    }
  }

  function OnNextMonth() {
    if (props.monthIndex < 11) {
      props.setMonthIndex(props.monthIndex + 1)
    } else {
      props.setMonthIndex(0)
      props.setYear(props.year + 1)
    }
  }

  return (
    <Animated.View style={[styles.calendarBlock, { height: heightAnim }]}>
      <MonthBlock
        year={props.year}
        monthIndex={props.monthIndex}
        setYear={(value: number) => props.setYear(value)}
        setMonthIndex={(value: number) => props.setMonthIndex(value)}
        onPreviousMonth={OnPreviousMonth}
        onNextMonth={OnNextMonth}
      />
      <WeekDaysBlock />
      <DatesBlock
        year={props.year}
        monthIndex={props.monthIndex}
        chosenDate={props.chosenDate}
        setChosenDate={(date: any) => {
          if (
            new Date(date).getMonth() === props.monthIndex - 1 ||
            (props.monthIndex === 0 && new Date(date).getMonth() === 11)
          ) {
            OnPreviousMonth()
          } else if (
            new Date(date).getMonth() === props.monthIndex + 1 ||
            (props.monthIndex === 11 && new Date(date).getMonth() === 0)
          ) {
            OnNextMonth()
          }

          props.setChosenDate(date)
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
