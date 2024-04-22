import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../constants/colors'

const width = Dimensions.get('screen').width

export default function LogStatus(props: {
  title: string
  status: 'delete' | 'update' | 'create' | 'none'
}) {
  function GetColor() {
    switch (props.status) {
      case 'delete':
        return [colors.lightErrorBg, colors.lightErrorTitle]
      case 'update':
        return [colors.lightWarningBg, colors.lightWarningTitle]
      case 'create':
        return [colors.lightSuccessBg, colors.lightSuccessTitle]
      default:
        return [colors.bg, colors.comment]
    }
  }

  return (
    <View
      style={{
        backgroundColor: GetColor()[0],
        paddingHorizontal: width * 0.02,
        borderRadius: width * 0.02,
        marginRight: width * 0.01,
      }}
    >
      <Text style={{ fontSize: width * 0.035, color: GetColor()[1] }}>
        {props.title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({})
