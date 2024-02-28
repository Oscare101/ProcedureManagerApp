import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'
import colors from '../../constants/colors'
import { Agenda, Procedure } from '../../constants/interfaces'

const width = Dimensions.get('screen').width

export default function RenderProcedureItem(props: {
  procedure: Procedure
  chosenProcedures: Agenda['procedures']
  toggleProcedure: any
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: props.chosenProcedures.includes(props.procedure.id)
            ? colors.card2
            : '#00000000',
        },
      ]}
      activeOpacity={0.8}
      onPress={() => props.toggleProcedure(props.procedure.id)}
    >
      <Text
        style={[
          styles.title,
          {
            color: props.chosenProcedures.includes(props.procedure.id)
              ? colors.card2Title
              : colors.text,
          },
        ]}
      >
        {props.procedure.name}
      </Text>
      <Text
        style={[
          styles.price,
          {
            color: props.chosenProcedures.includes(props.procedure.id)
              ? colors.card2Title
              : colors.text,
          },
        ]}
      >
        {props.procedure.price}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: width * 0.01,
    borderRadius: width * 0.02,
    marginVertical: width * 0.005,
  },
  title: {
    fontSize: width * 0.04,
    flex: 1,
  },
  price: { fontSize: width * 0.04 },
})
