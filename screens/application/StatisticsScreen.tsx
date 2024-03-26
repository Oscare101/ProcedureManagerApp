import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import globalStyles from '../../constants/globalStyles'
import text from '../../constants/text'
import Header from '../../components/application/Header'
import colors from '../../constants/colors'
import MonthCard from '../../components/statistics/MonthCard'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import { Agenda } from '../../constants/interfaces'
import { GenerateStatisticData } from '../../functions/statistics'
import ColumnChart from '../../components/statistics/ColumnChart'
import MonthStatCard from '../../components/statistics/MonthStatCard'
import MasterStatistics from '../../components/statistics/MasterStatistics'

export default function StatisticsScreen({ navigation }: any) {
  const agendas: Agenda[] = useSelector((state: RootState) => state.agendas)

  const [date, setDate] = useState<Date>(new Date())
  const [monthStat, setMonthStat] = useState<Agenda[]>([])

  const setNewDate = useCallback(
    (value: Date) => {
      setDate(value)
    },
    [date]
  )

  useEffect(() => {
    setMonthStat(GenerateStatisticData(agendas, date))
  }, [date])

  return (
    <View style={[globalStyles.container, { backgroundColor: colors.bg }]}>
      <Header title={text.Statistics} action="drawer" />
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <MonthCard date={date} setDate={setNewDate} />
        <MonthStatCard date={date} stat={monthStat} />
        <ColumnChart date={date} stat={monthStat} />
        <MasterStatistics date={date} stat={monthStat} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})
