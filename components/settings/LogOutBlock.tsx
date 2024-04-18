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

const width = Dimensions.get('screen').width

export default function LogOutBlock(props: { onPress: any }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      style={styles.button}
    >
      <Text style={styles.title}>{text.LogOut}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '92%',
    alignSelf: 'center',
    backgroundColor: colors.lightErrorBg,
    borderRadius: width * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: width * 0.04,
    color: colors.lightErrorTitle,
  },
})
