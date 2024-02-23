import { Dimensions } from 'react-native'
import colors from '../../constants/colors'
import { Customer } from '../../constants/interfaces'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'

const width = Dimensions.get('screen').width

export default function RenderMessengerIcon(props: {
  messenger: Customer['messenger']
}) {
  if (props.messenger === 'viber') {
    return <FontAwesome5 name="viber" size={width * 0.05} color={colors.text} />
  }
  return (
    <Ionicons
      name={
        props.messenger === 'instagram'
          ? 'logo-instagram'
          : props.messenger === 'whatsapp'
          ? 'logo-whatsapp'
          : props.messenger === 'telegram'
          ? 'paper-plane-outline'
          : 'call-outline'
      }
      size={width * 0.05}
      color={colors.text}
    />
  )
}
