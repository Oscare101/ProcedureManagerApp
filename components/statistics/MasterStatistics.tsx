import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import colors from '../../constants/colors'
import text from '../../constants/text'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import { Agenda, Master } from '../../constants/interfaces'
import globalStyles from '../../constants/globalStyles'

const width = Dimensions.get('screen').width

function MasterStatistics(props: { date: Date; stat: Agenda[] }) {
  const masters: Master[] = useSelector((state: RootState) => state.masters)

  return (
    <View style={styles.card}>
      {masters.map((master: Master, index: number) => (
        <View
          key={index}
          style={{
            width: '100%',
            height: width * 0.1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={styles.name}>{master.name}</Text>
          <Text style={styles.amount}>
            {props.stat.filter((s: any) => s.masterId === master.id).length}
          </Text>
          <View
            style={{
              width: '60%',
              height: width * 0.02,
              backgroundColor: colors.bg,
              borderRadius: width,
            }}
          >
            <View
              style={{
                height: '100%',
                backgroundColor: master.color,
                width: `${
                  (props.stat.filter((s: any) => s.masterId === master.id)
                    .length *
                    100) /
                  props.stat.length
                }%`,
                borderRadius: width,
              }}
            />
          </View>
        </View>
      ))}
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
    paddingHorizontal: '3%',
  },
  name: {
    fontSize: width * 0.04,
    color: colors.text,
    width: '20%',
  },
  amount: {
    fontSize: width * 0.04,
    color: colors.text,
    width: '10%',
    fontWeight: '300',
  },
})

export default memo(MasterStatistics)
