import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import globalStyles from '../../constants/globalStyles'
import text from '../../constants/text'
import Header from '../../components/application/Header'

export default function StatisticsScreen({ navigation }: any) {
  return (
    <View style={globalStyles.container}>
      <Header title={text.Statistics} action="drawer" />
    </View>
  )
}

const styles = StyleSheet.create({})
