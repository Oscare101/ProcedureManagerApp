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

const width = Dimensions.get('screen').width

export default function MessengerModal(props: {
  date: Customer['messenger'] | ''
  setDate: any
}) {
  const messengers: { title: Customer['messenger'] }[] = [
    {
      title: 'instagram',
    },
    {
      title: 'telegram',
    },
    {
      title: 'viber',
    },
    {
      title: 'whatsapp',
    },
  ]

  function RenderMessengerItem({ item }: any) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.setDate(item.title)}
        style={[
          styles.button,
          {
            backgroundColor:
              props.date === item.title ? colors.card2 : colors.bg,
          },
        ]}
      >
        <RenderMessengerIcon
          messenger={item.title}
          color={props.date === item.title ? colors.card2Title : colors.comment}
        />
        <Text
          style={[
            styles.title,
            {
              color:
                props.date === item.title ? colors.card2Title : colors.comment,
            },
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <>
      <FlatList data={messengers} renderItem={RenderMessengerItem} />
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '95%',
    height: width * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: width * 0.02,
    marginBottom: width * 0.02,
    alignSelf: 'center',
    paddingHorizontal: width * 0.03,
  },
  title: {
    fontSize: width * 0.04,
    flex: 1,
    textAlign: 'center',
  },
})
