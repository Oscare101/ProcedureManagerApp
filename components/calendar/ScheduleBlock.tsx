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
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import { Agenda, Customer, Master, Procedure } from '../../constants/interfaces'
import { DateTimeBlockAgenda } from '../../functions/functions'
import RenderScheduleCard from './RenderScheduleCard'

interface ScheduleBlockProps {
  date: Date
}

const width = Dimensions.get('screen').width

export default function ScheduleBlock(props: ScheduleBlockProps) {
  const agendas: Agenda[] = useSelector((state: RootState) => state.agendas)
  const masters: Master[] = useSelector((state: RootState) => state.masters)
  const procedures: Procedure[] = useSelector(
    (state: RootState) => state.procedures
  )
  const customers: Customer[] = useSelector(
    (state: RootState) => state.customers
  )

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
        {[...masters].map((_: any, index: number) => (
          <RenderScheduleCard
            key={index}
            date={props.date}
            time={item}
            column={index + 1}
            setCardPreview={() =>
              setCardPreview({
                date: props.date,
                time: item,
                column: index + 1,
              })
            }
            isPreview={IsPreview(item, index + 1)}
            agenda={DateTimeBlockAgenda(
              props.date,
              item,
              index + 1,
              agendas,
              masters
            )}
            procedures={procedures}
            customers={customers}
          />
        ))}
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
    borderRadius: width * 0.03,
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
})
