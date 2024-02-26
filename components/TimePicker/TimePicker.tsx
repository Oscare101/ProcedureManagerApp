import { View } from 'react-native'
import styles from './constants/styles'
import TimeHeader from './components/TimeHeader'
import { useEffect, useState } from 'react'
import DialBlock from './components/DialBlock'
import { TimePickerProps } from './constants/interfaces'

export default function TimePicker(props: TimePickerProps) {
  const [hours, setHours] = useState<number>(
    props.initialHours !== undefined
      ? props.initialHours
      : new Date().getHours()
  )
  const [minutes, setMinutes] = useState<number>(
    props.initialMinutes !== undefined
      ? props.initialMinutes
      : new Date().getMinutes()
  )
  const [active, setActive] = useState<string>('hour')

  useEffect(() => {
    if (props.onSetHours) {
      props.onSetHours(hours)
    }
  }, [hours])

  useEffect(() => {
    if (props.onSetMinutes) {
      props.onSetMinutes(minutes)
    }
  }, [minutes])

  return (
    <View style={[styles.container, { ...props.containerStyles }]}>
      <TimeHeader
        hours={hours}
        minutes={minutes}
        setActive={(value: string) => setActive(value)}
        active={active}
        timeCardStyles={props.timeCardStyles}
        timeTitleStyles={props.timeTitleStyles}
        timeDotColor={props.timeDotColor}
        activecolors={props.activecolors}
      />
      <DialBlock
        active={active}
        minutes={minutes}
        setMinutes={(value: number) => setMinutes(value)}
        hours={hours}
        setHours={(value: number) => {
          setHours(value)
          setActive('minute')
        }}
        dialStyles={props.dialStyles}
        dialHourTitleStyles={props.dialHourTitleStyles}
        dialHourTitleActiveStyles={props.dialHourTitleActiveStyles}
        activecolors={props.activecolors}
        minuteDotColor={props.minuteDotColor}
      />
    </View>
  )
}
