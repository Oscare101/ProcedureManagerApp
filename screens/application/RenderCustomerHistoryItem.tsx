import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Master } from '../../constants/interfaces'
import colors from '../../constants/colors'
import globalStyles from '../../constants/globalStyles'
import text from '../../constants/text'
import { Ionicons } from '@expo/vector-icons'

const width = Dimensions.get('screen').width

export default function RenderCustomerHistoryItem(props: {
  item: any
  master: any
  proceduresString: any
}) {
  return (
    <View style={styles.card}>
      <View style={globalStyles.rowBetween}>
        <View style={styles.procedureBlock}>
          <Text style={styles.procedureTitle}>{props.proceduresString}</Text>
        </View>
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
          {new Date(props.item.date).getDate().toString().padStart(2, '0')}.
          {(new Date(props.item.date).getMonth() + 1)
            .toString()
            .padStart(2, '0')}
          .{new Date(props.item.date).getFullYear()} (
          {text.weekDaysShort[(new Date(props.item.date).getDay() || 7) - 1]})
        </Text>
        <Ionicons
          name="time-outline"
          size={width * 0.05}
          color={colors.comment}
        />
        <Text style={styles.values}>{props.item.time}</Text>
      </View>
    </View>
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
})
