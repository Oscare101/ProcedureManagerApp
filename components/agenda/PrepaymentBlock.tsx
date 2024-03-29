import { Dimensions, StyleSheet, Text, View } from 'react-native'
import InputBlock from '../application/InputBlock'
import globalStyles from '../../constants/globalStyles'
import text from '../../constants/text'
import colors from '../../constants/colors'
import rules from '../../constants/rules'
import { Agenda } from '../../constants/interfaces'

const width = Dimensions.get('screen').width

export default function PrepaymentBlock(props: {
  amount: Agenda['prepayment']
  onChange: any
  static?: boolean
}) {
  return (
    <View style={[styles.card, globalStyles.rowBetween]}>
      <Text style={styles.title}>{text.prepayment}</Text>
      <InputBlock
        value={props.amount}
        setValue={(value: string) => {
          if (rules.amountRegrex.test(value.replace(',', '.'))) {
            let num = ''
            if (
              value.replace(',', '.') === '0' ||
              value.replace(',', '.') === '.'
            ) {
              num = ''
            } else {
              num = value.replace(',', '.')
            }
            props.onChange(num)
          } else {
            return false
          }
        }}
        textIcon="₴"
        type="number"
        placeHolder={'0.00'}
        styles={{
          backgroundColor: colors.bg,
          width: '50%',
          borderRadius: width * 0.02,
        }}
        keyboard={'numeric'}
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
