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
import { useEffect, useState } from 'react'
import CreateProcedureCard from './CreateProcedureCard'

interface ScheduleBlockProps {
  date: Date
}

const width = Dimensions.get('screen').width

export default function ScheduleBlock(props: ScheduleBlockProps) {
  const [cardPreview, setCardPreview] = useState<{
    date: Date
    time: string
    column: number
  } | null>()

  useEffect(() => {
    if (cardPreview !== null) {
      const timer = setTimeout(function () {
        setCardPreview(null)
      }, 5000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [cardPreview])

  function RenderTimesItem({ item }: any) {
    return (
      <View style={[styles.timesItem, globalStyles.scheduleCardHeight2]}>
        <Text style={styles.timesTitle}>{item}</Text>
        <Text style={styles.timesTitle}>-</Text>
      </View>
    )
  }
  function IsPreview(time: string, column: number) {
    return (
      props.date === cardPreview?.date &&
      time === cardPreview?.time &&
      column === cardPreview?.column
    )
  }
  function RenderScheduleItem({ item }: any) {
    return (
      <View style={[styles.scheduleItem, globalStyles.scheduleCardHeight1]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setCardPreview({ date: props.date, time: item, column: 1 })
          }}
          style={[styles.cardPreview, globalStyles.scheduleCardHeight1]}
        >
          {IsPreview(item, 1) ? <CreateProcedureCard /> : <></>}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setCardPreview({ date: props.date, time: item, column: 2 })
          }}
          style={[styles.cardPreview, globalStyles.scheduleCardHeight1]}
        >
          {IsPreview(item, 2) ? <CreateProcedureCard /> : <></>}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setCardPreview({ date: props.date, time: item, column: 3 })
          }}
          style={[styles.cardPreview, globalStyles.scheduleCardHeight1]}
        >
          {IsPreview(item, 3) ? <CreateProcedureCard /> : <></>}
        </TouchableOpacity>
      </View>
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
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  cardPreview: {
    width: (width * 0.92 * 0.85) / 3,
  },
})