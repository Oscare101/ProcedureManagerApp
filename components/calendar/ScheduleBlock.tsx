import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import rules from '../../constants/rules'
import colors from '../../constants/colors'
import globalStyles from '../../constants/globalStyles'

interface ScheduleBlockProps {
  date: Date
}

const width = Dimensions.get('screen').width

export default function ScheduleBlock(props: ScheduleBlockProps) {
  function RenderTimesItem({ item }: any) {
    return (
      <View style={[styles.timesItem, globalStyles.scheduleCardHeight2]}>
        <Text style={styles.timesTitle}>{item}</Text>
        <Text style={styles.timesTitle}>-</Text>
      </View>
    )
  }
  function RenderScheduleItem({ item }: any) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          console.log(item)
        }}
        style={[styles.scheduleItem, globalStyles.scheduleCardHeight1]}
      >
        {/* <Text style={styles.Title}>{item}</Text> */}
      </TouchableOpacity>
    )
  }
  return (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <FlatList
          scrollEnabled={false}
          style={styles.timesBlock}
          data={rules.timesArr}
          renderItem={RenderTimesItem}
        />
        <FlatList
          scrollEnabled={false}
          style={styles.scheduleBlock}
          data={rules.timesArrFull}
          renderItem={RenderScheduleItem}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    width: '92%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: width * 0.02,
  },
  timesBlock: {
    width: width * 0.92 * 0.15,
  },
  timesItem: { height: width * 0.2, alignItems: 'center' },
  timesTitle: { fontSize: width * 0.04, color: colors.text, height: '50%' },
  scheduleBlock: {
    width: width * 0.92 * 0.85,
    backgroundColor: colors.white,
    borderRadius: width * 0.05,
    marginTop: width * 0.02,
  },
  scheduleItem: {
    borderBottomWidth: 1,
    borderColor: colors.bg,
    borderStyle: 'dashed',
  },
})
