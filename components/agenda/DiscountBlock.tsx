import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import InputBlock from '../application/InputBlock'
import globalStyles from '../../constants/globalStyles'
import text from '../../constants/text'
import colors from '../../constants/colors'
import rules from '../../constants/rules'
import { Agenda } from '../../constants/interfaces'
import { GetDiscountType } from '../../functions/functions'

const width = Dimensions.get('screen').width

export default function DiscountBlock(props: {
  amount: Agenda['discount']
  onChange: any
  static?: boolean
}) {
  function SetDiscount(type: '₴' | '%', amount: string) {
    props.onChange(`${type} ${amount.replace(/^\D+/g, '')}`)
  }

  return (
    <View style={[styles.card, globalStyles.rowBetween]}>
      <Text style={styles.title}>{text.discount}</Text>
      {props.static ? (
        <></>
      ) : (
        <View style={styles.switchBlock}>
          <TouchableOpacity
            onPress={() => SetDiscount('₴', props.amount.replace(/^\D+/g, ''))}
            activeOpacity={0.8}
            style={[
              styles.switchButton,
              {
                backgroundColor:
                  GetDiscountType(props.amount) === '₴'
                    ? colors.card1
                    : '#00000000',
              },
            ]}
          >
            <Text
              style={[
                styles.switchTitle,
                {
                  color:
                    GetDiscountType(props.amount) === '₴'
                      ? colors.card1Title
                      : colors.text,
                },
              ]}
            >
              ₴
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => SetDiscount('%', props.amount.replace(/^\D+/g, ''))}
            activeOpacity={0.8}
            style={[
              styles.switchButton,
              {
                backgroundColor:
                  GetDiscountType(props.amount) === '%'
                    ? colors.card1
                    : '#00000000',
              },
            ]}
          >
            <Text
              style={[
                styles.switchTitle,
                {
                  color:
                    GetDiscountType(props.amount) === '%'
                      ? colors.card1Title
                      : colors.text,
                },
              ]}
            >
              %
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <InputBlock
        value={props.amount.replace(/^\D+/g, '')}
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
            SetDiscount(GetDiscountType(props.amount), num)
          } else {
            return false
          }
        }}
        textIcon={props.static ? GetDiscountType(props.amount) : ''}
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
    flex: 1,
  },
  switchBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchButton: {
    height: width * 0.12,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 0.5,
    borderRadius: width * 0.02,
    marginRight: width * 0.02,
  },
  switchTitle: {
    fontSize: width * 0.05,
    fontWeight: '300',
  },
})
