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

export default function CalendarBlock(props: CalendarBlockProps) {
  const heightAnim = useRef(new Animated.Value(0)).current
  const flatListRef: any = useRef(null)

  const [datesMonths, setDatesMonths] = useState<any[]>([
    new Date(new Date(props.date).setDate(0)),
    new Date(props.date),
    new Date(
      new Date(new Date(props.date).setDate(1)).setMonth(
        props.date.getMonth() + 1
      )
    ),
  ])

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: props.open ? width * 0.1 * 8 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start()
  }, [props.open])

  const SetMonths = useCallback((date: Date) => {
    props.setDate(date)
    setDatesMonths([
      new Date(new Date(date).setDate(0)),
      new Date(date),
      new Date(
        new Date(new Date(date).setDate(1)).setMonth(date.getMonth() + 1)
      ),
    ])
  }, [])

  useEffect(() => {
    SetMonths(props.date)
  }, [props.date])

  function OnPreviousMonth() {
    const date = new Date(datesMonths[1])
    date.setDate(0)
    props.setDate(date)
    SetMonths(date)
  }

  function OnNextMonth() {
    const date = new Date(datesMonths[1])
    date.setDate(1)
    date.setMonth(date.getMonth() + 1)
    props.setDate(date)
    SetMonths(date)
  }

  return (
    <Animated.View style={[styles.calendarBlock, { height: heightAnim }]}>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={datesMonths}
        renderItem={({ item }: any) => (
          <View
            style={{
              width: width,
            }}
          >
            <MonthBlock
              date={item}
              onPreviousMonth={OnPreviousMonth}
              onNextMonth={OnNextMonth}
            />
            <WeekDaysBlock />
            <DatesBlock date={props.date} month={item} setDate={SetMonths} />
          </View>
        )}
        snapToInterval={width}
        snapToAlignment="start"
        initialScrollIndex={1}
        decelerationRate={'fast'}
        onMomentumScrollEnd={(event: any) => {
          if (Math.floor((event.nativeEvent.contentOffset.x + 2) / width) < 1) {
            OnPreviousMonth()
          } else if (
            Math.floor((event.nativeEvent.contentOffset.x + 2) / width) > 1
          ) {
            OnNextMonth()
          }
          const index: number = 1
          flatListRef.current.scrollToIndex({ animated: false, index })
        }}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
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
