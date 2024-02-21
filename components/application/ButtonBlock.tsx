import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import colors from '../../constants/colors'
import { useState } from 'react'

const width = Dimensions.get('screen').width

interface InputBlockProps {
  title: string
  action: any
  buttonStyles?: any
  titleStyles?: any
}

export default function ButtonBlock(props: InputBlockProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.action}
      style={[styles.button, props.buttonStyles]}
    >
      <Text style={[styles.title, props.titleStyles]}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: width * 0.12,
    width: '92%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card1,
    borderRadius: width * 0.03,
  },
  title: {
    color: colors.card1Title,
    fontSize: width * 0.06,
    fontWeight: '300',
  },
})
