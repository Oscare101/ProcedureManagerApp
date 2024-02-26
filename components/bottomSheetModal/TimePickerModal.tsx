import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import colors from '../../constants/colors'
import { Customer } from '../../constants/interfaces'
import RenderMessengerIcon from '../clients/RenderMessengerIcon'
import TimePicker from '../TimePicker/TimePicker'
import { TimePickerProps } from '../TimePicker/constants/interfaces'

const width = Dimensions.get('screen').width

export default function TimePickerModal(props: { data: string; setData: any }) {
  const hours = (props.data.split(':')[0] ||
    0) as TimePickerProps['initialHours']
  const minutes = (props.data.split(':')[1] ||
    0) as TimePickerProps['initialMinutes']
  return (
    <>
      <TimePicker
        initialHours={hours}
        initialMinutes={minutes}
        onSetHours={(value: number) =>
          props.setData(value.toString().padStart(2, '0') + ':' + minutes)
        }
        onSetMinutes={(value: number) =>
          props.setData(hours + ':' + value.toString().padStart(2, '0'))
        }
      />
    </>
  )
}

const styles = StyleSheet.create({})
