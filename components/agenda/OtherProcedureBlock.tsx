import { Dimensions, StyleSheet, Text, View } from 'react-native'
import InputBlock from '../application/InputBlock'
import globalStyles from '../../constants/globalStyles'
import text from '../../constants/text'
import colors from '../../constants/colors'
import rules from '../../constants/rules'
import { Agenda } from '../../constants/interfaces'

const width = Dimensions.get('screen').width

export default function OtherProcedureBlock(props: {
  procedure: Agenda['otherProcedure']
  onChange: any
  static?: boolean
}) {
  return (
    <View style={[styles.card, globalStyles.rowBetween]}>
      <Text style={styles.title}>{text.otherProcedureName}</Text>
      <InputBlock
        value={props.procedure!}
        setValue={(value: string) => {
          props.onChange(value)
        }}
        type="text"
        placeHolder={text.procedure}
        styles={{
          backgroundColor: colors.bg,
          width: '50%',
          borderRadius: width * 0.02,
        }}
        disable={props.static}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '92%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: width * 0.02,
    borderRadius: width * 0.03,
    backgroundColor: colors.white,
    marginTop: width * 0.02,
    alignSelf: 'center',
  },
  title: {
    fontSize: width * 0.04,
    color: colors.comment,
  },
})
