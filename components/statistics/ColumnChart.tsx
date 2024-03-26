import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import colors from '../../constants/colors'
import globalStyles from '../../constants/globalStyles'

const width = Dimensions.get('screen').width
function ColumnChart(props: { date: Date; stat: any[] }) {
  const daysAmount: number = new Date(
    props.date.getFullYear(),
    props.date.getMonth() + 1,
    0
  ).getDate()

  const statPerDay: any[] = [...Array(daysAmount)].map(
    (_: any, index: number) => {
      return props.stat.filter((s: any) => +s.date.split('.')[0] === index + 1)
        .length
    }
  )

  return (
    <View style={styles.card}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          height: width * 0.15,
        }}
      >
        {statPerDay.map((item: any, index: number) => {
          return (
            <View
              key={index}
              style={{
                width: `${100 / daysAmount}%`,
                alignItems: 'center',
                height: '100%',
                justifyContent: 'flex-end',
              }}
            >
              <View
                style={{
                  width: `30%`,
                  height:
                    item && width * 0.15 * (item / Math.max(...statPerDay)),
                  backgroundColor: colors.accent,
                  borderRadius: width * 0.01,
                }}
              />
            </View>
          )
        })}
      </View>
      <View style={[globalStyles.rowBetween, { width: '100%' }]}>
        {[...Array(daysAmount)].map((_: any, index: number) => {
          return (
            <Text
              style={{
                fontSize: width * 0.02,
                width: `${100 / daysAmount}%`,
                textAlign: 'center',
              }}
              key={index}
            >
              {(index + 1) % 2 === 0 ? '' : index + 1}
            </Text>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '92%',
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: width * 0.03,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: width * 0.02,
    padding: width * 0.02,
  },
})

export default memo(ColumnChart)
