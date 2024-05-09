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
import globalStyles, { minCardHeight } from '../../constants/globalStyles'
import React, { memo, useEffect, useMemo, useState } from 'react'
import CreateProcedureCard from './CreateProcedureCard'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import { Agenda, Customer, Master, Procedure } from '../../constants/interfaces'
import { DateTimeBlockAgenda, IsDateToday } from '../../functions/functions'
import RenderScheduleCard from './RenderScheduleCard'
import { auth } from '../../firebase'

interface ScheduleBlockProps {
  date: Date
}

const width = Dimensions.get('screen').width

const ScheduleBlock = React.memo(function (props: ScheduleBlockProps) {
  const agendas: Agenda[] = useSelector((state: RootState) => state.agendas)
  const masters: Master[] = useSelector((state: RootState) => state.masters)
  const schedule = useSelector((state: RootState) => state.schedule)
  const procedures: Procedure[] = useSelector(
    (state: RootState) => state.procedures
  )
  const customers: Customer[] = useSelector(
    (state: RootState) => state.customers
  )
  const permissions: any = useSelector((state: RootState) => state.permissions)
  const isAdmin: boolean =
    !!auth.currentUser &&
    !!auth.currentUser.email &&
    permissions[auth.currentUser?.email.replaceAll('.', ',')] === 'admin'

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
    const isNow = new Date().getHours()
    return (
      <View style={[styles.timesItem, globalStyles.scheduleCardHeight2]}>
        <Text style={styles.timesTitle}>{item}</Text>
        <Text style={styles.timesTitle}>-</Text>
        {isNow === +item.split(':')[0] && IsDateToday(props.date) ? (
          <>
            <View
              style={{
                width: '90%',
                height: width * 0.01,
                backgroundColor: colors.accent,
                position: 'absolute',
                borderRadius: width,
                top:
                  minCardHeight * 2 * (new Date().getMinutes() / 60) -
                  width * 0.005 +
                  width * 0.02,
              }}
            ></View>
            <View
              style={{
                position: 'absolute',
                left: 0,
                top:
                  minCardHeight * 2 * (new Date().getMinutes() / 60) -
                  width * 0.015 +
                  width * 0.02,
                height: width * 0.03,
                width: width * 0.03,
                backgroundColor: colors.accent,
                borderRadius: width,
              }}
            />
          </>
        ) : (
          <></>
        )}
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

  function RenderScheduleItem({ item, index }: any) {
    return (
      <View
        style={[
          styles.scheduleItem,
          globalStyles.scheduleCardHeight1,
          index === rules.timesArrFullReversed.length - 1
            ? { borderTopWidth: 0 }
            : {},
        ]}
      >
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
            masters={masters}
            schedule={schedule}
            isAdmin={isAdmin}
          />
        ))}
      </View>
    )
  }

  return (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <FlatList
          inverted
          scrollEnabled={false}
          style={styles.timesBlock}
          data={rules.timesArrReversed}
          renderItem={RenderTimesItem}
        />

        <FlatList
          inverted
          scrollEnabled={false}
          style={styles.scheduleBlock}
          data={rules.timesArrFullReversed}
          renderItem={RenderScheduleItem}
        />
      </View>
    </ScrollView>
  )
})

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
    flexDirection: 'column-reverse',
  },
  scheduleItem: {
    borderTopWidth: 1,
    borderColor: colors.bg,
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
})

export default ScheduleBlock
