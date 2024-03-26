import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import globalStyles from '../../constants/globalStyles'
import text from '../../constants/text'
import Header from '../../components/application/Header'
import colors from '../../constants/colors'
import MonthCard from '../../components/statistics/MonthCard'

export default function StatisticsScreen({ navigation }: any) {
  const [date, setDate] = useState<Date>(new Date())

  const setNewDate = useCallback(
    (value: Date) => {
      setDate(value)
    },
    [date]
  )

  return (
    <View style={[globalStyles.container, { backgroundColor: colors.bg }]}>
      <Header title={text.Statistics} action="drawer" />
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <MonthCard date={date} setDate={setNewDate} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})
