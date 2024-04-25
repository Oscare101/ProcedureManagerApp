import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'

const width = Dimensions.get('screen').width

export default function LogValueBlock(props: {
  title: string
  icon: keyof typeof Ionicons.glyphMap
}) {
  return (
    <View
      style={{
        backgroundColor: colors.bg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        paddingHorizontal: width * 0.02,
        paddingVertical: width * 0.01,
      }}
    >
      <Ionicons name={props.icon} size={width * 0.05} color={colors.text} />
      <Text
        style={{
          fontSize: width * 0.04,
          color: colors.text,
          marginLeft: width * 0.02,
        }}
      >
        {props.title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({})
