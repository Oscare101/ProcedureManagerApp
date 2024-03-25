import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import colors from '../../constants/colors'
import text from '../../constants/text'
import { Ionicons } from '@expo/vector-icons'

const width = Dimensions.get('screen').width

export default function CinfirmationBlock(props: { confirmed: boolean }) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{text.Confirmed}</Text>
      <TouchableOpacity style={styles.button}>
        {props.confirmed ? (
          <Ionicons
            name="checkbox-outline"
            size={width * 0.06}
            color={colors.text}
          />
        ) : (
          <Ionicons
            name="square-outline"
            size={width * 0.06}
            color={colors.text}
          />
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '92%',
    padding: width * 0.02,
    backgroundColor: colors.white,
    marginTop: width * 0.02,
    borderRadius: width * 0.03,
    height: width * 0.12,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: width * 0.04,
    color: colors.text,
  },
  button: {
    height: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
