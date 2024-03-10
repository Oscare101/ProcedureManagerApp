import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Master } from '../../constants/interfaces'
import colors from '../../constants/colors'
import globalStyles from '../../constants/globalStyles'
import text from '../../constants/text'
import { Ionicons } from '@expo/vector-icons'
import CommentBlock from './CommentBlock'
import {
  GetDateFormateFromString,
  GetDateString,
} from '../../functions/functions'

const width = Dimensions.get('screen').width

export default function RenderCustomerHistoryItem(props: {
  item: any
  master: any
  proceduresString: any
  navigate: any
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.navigate}
      style={styles.card}
    >
      <View style={globalStyles.rowBetween}>
        <View style={styles.procedureBlock}>
          <Text style={styles.procedureTitle}>{props.proceduresString}</Text>
        </View>
        {props.item.prepayment ? (
          <View
            style={[
              styles.infoBlock,
              { backgroundColor: colors.lightSuccessBg },
            ]}
          >
            <Text
              style={[styles.infoTitle, { color: colors.lightSuccessTitle }]}
            >
              ₴ {props.item.prepayment}
            </Text>
          </View>
        ) : (
          <></>
        )}
        {props.item.canceled ? (
          <View
            style={[styles.infoBlock, { backgroundColor: colors.lightErrorBg }]}
          >
            <Text style={[styles.infoTitle, { color: colors.lightErrorTitle }]}>
              {text.canceled}
            </Text>
          </View>
        ) : (
          <></>
        )}

        <View style={{ flex: 1 }} />
        <View
          style={[styles.masterBlock, { backgroundColor: props.master.color }]}
        >
          <Text style={styles.masterTitle}>{props.master.name}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Ionicons
          name="calendar-outline"
          size={width * 0.05}
          color={colors.comment}
        />
        <Text style={styles.values}>
          {props.item.date} (
          {
            text.weekDaysShort[
              (GetDateFormateFromString(props.item.date).getDay() || 7) - 1
            ]
          }
          )
        </Text>
        <Ionicons
          name="time-outline"
          size={width * 0.05}
          color={colors.comment}
        />
        <Text style={styles.values}>{props.item.time}</Text>
      </View>
      {props.item.comment ? (
        <CommentBlock comment={props.item.comment} />
      ) : (
        <></>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '92%',
    // padding: width * 0.02,
    backgroundColor: colors.white,
    marginTop: width * 0.02,
    borderRadius: width * 0.03,
    // height: width * 0.12,
    alignSelf: 'center',
  },
  procedureBlock: {
    borderTopLeftRadius: width * 0.03,
    borderBottomRightRadius: width * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card2,
    paddingVertical: width * 0.01,
    paddingHorizontal: width * 0.04,
  },
  procedureTitle: {
    fontSize: width * 0.04,
    color: colors.card2Title,
  },
  masterBlock: {
    paddingHorizontal: width * 0.01,
    borderRadius: width * 0.01,
    marginRight: width * 0.02,
    marginTop: width * 0.02,
  },
  masterTitle: {
    color: colors.white,
    fontSize: width * 0.04,
  },
  row: {
    padding: width * 0.02,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  values: {
    fontSize: width * 0.04,
    color: colors.text,
    marginHorizontal: width * 0.02,
  },
  infoBlock: {
    paddingHorizontal: width * 0.01,
    paddingVertical: width * 0.005,
    borderRadius: width * 0.01,
    marginLeft: width * 0.02,
  },
  infoTitle: {
    fontSize: width * 0.03,
  },
})
