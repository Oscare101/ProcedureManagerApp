import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Agenda } from '../../constants/interfaces'
import text from '../../constants/text'
import { GetDateString } from '../../functions/functions'
import globalStyles from '../../constants/globalStyles'
import colors from '../../constants/colors'

const width = Dimensions.get('screen').width

export default function AgendaIdBlock(props: { agenda: Agenda }) {
  return (
    <>
      <View
        style={[
          globalStyles.rowBetween,
          { width: '92%', marginTop: width * 0.02 },
        ]}
      >
        <Text style={styles.title}>{text.created}</Text>
        <Text style={styles.title}>
          {new Date(props.agenda.created)
            .getHours()
            .toString()
            .padStart(2, '0')}
          :
          {new Date(props.agenda.created)
            .getMinutes()
            .toString()
            .padStart(2, '0')}{' '}
          {GetDateString(new Date(props.agenda.created))}
        </Text>
      </View>
      <View style={[globalStyles.rowBetween, { width: '92%' }]}>
        <Text style={styles.title}>{text.lastUpdated}</Text>
        <Text style={styles.title}>
          {new Date(props.agenda.lastUpdated)
            .getHours()
            .toString()
            .padStart(2, '0')}
          :
          {new Date(props.agenda.lastUpdated)
            .getMinutes()
            .toString()
            .padStart(2, '0')}{' '}
          {GetDateString(new Date(props.agenda.lastUpdated))}
        </Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: width * 0.03,
    color: colors.comment,
  },
})
