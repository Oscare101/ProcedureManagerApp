import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import colors from '../../constants/colors'
import text from '../../constants/text'
import { Agenda } from '../../constants/interfaces'

const width = Dimensions.get('screen').width

function MonthStatCard(props: { date: Date; stat: Agenda[] }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{text.AgendasAmount}</Text>
      <Text style={styles.title}>{props.stat.length}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '92%',
    height: width * 0.12,
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: width * 0.03,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: width * 0.02,
    paddingHorizontal: '3%',
  },
  title: {
    fontSize: width * 0.05,
    color: colors.text,
  },
})

export default memo(MonthStatCard)
