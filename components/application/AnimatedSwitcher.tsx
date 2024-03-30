import React, { memo, useRef } from 'react'
import { Animated, TouchableOpacity, Text, View } from 'react-native'
import colors from '../../constants/colors'

interface AnimSwitcherProps {
  value: boolean
  toggle: any
  size: number
}

function AnimatedSwitcher(props: AnimSwitcherProps) {
  const colorAnimation = useRef(new Animated.Value(props.value ? 1 : 0)).current
  const fadeAnimation = useRef(new Animated.Value(props.value ? 0 : 1)).current

  const switchAnimation = useRef(
    new Animated.Value(props.value ? props.size / 2 : -props.size * 0.05)
  ).current

  const buttonRef = useRef(null)
  const startAnimation = () => {
    Animated.timing(colorAnimation, {
      toValue: props.value ? 0 : 1,
      duration: 150,
      useNativeDriver: false,
    }).start()
    Animated.timing(fadeAnimation, {
      toValue: props.value ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start()

    Animated.timing(switchAnimation, {
      toValue: props.value ? -props.size * 0.05 : props.size / 2,
      duration: 150,
      useNativeDriver: false,
    }).start()
  }
  const animatedBackgroundColor = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.card1, colors.card1],
  })

  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      activeOpacity={1}
      onPress={() => {
        startAnimation()
        props.toggle()
      }}
    >
      <View
        ref={buttonRef}
        style={{
          width: props.size,
          height: props.size / 2,
          borderRadius: props.size,
        }}
      >
        <Animated.View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: animatedBackgroundColor,
            borderRadius: props.size,
          }}
        >
          <Animated.View
            style={{
              height: props.size * 0.6,
              width: props.size * 0.6,
              borderRadius: props.size,
              position: 'absolute',
              top: -2,
              left: switchAnimation,
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.lightSuccessBg,
            }}
          >
            <Text
              style={{
                fontSize: props.size / 3,
              }}
            ></Text>

            <Animated.View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: colors.lightErrorBg,

                opacity: fadeAnimation,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: props.size / 3,
                }}
              ></Text>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </View>
    </TouchableOpacity>
  )
}

export default memo(AnimatedSwitcher)
