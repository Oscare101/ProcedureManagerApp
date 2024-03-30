import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import colors from '../../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { Settings } from '../../constants/interfaces'
import text from '../../constants/text'
import AnimatedSwitcher from '../application/AnimatedSwitcher'
import { updateSettings } from '../../redux/settings'
import { MMKV } from 'react-native-mmkv'
export const storage = new MMKV()

const width = Dimensions.get('screen').width

export default function SwipeSwitcher() {
  const settings: Settings = useSelector((state: RootState) => state.settings)
  const dispatch = useDispatch()

  const toggle = useCallback(() => {
    const newSettings: Settings = { ...settings, swipe: !settings.swipe }
    dispatch(updateSettings(newSettings))
    storage.set('settings', JSON.stringify(newSettings))
  }, [settings])

  return (
    <View style={styles.card}>
      <Text>{text.SwipeEnable}</Text>
      <AnimatedSwitcher
        value={settings.swipe!}
        toggle={toggle}
        size={width * 0.1}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.92,
    height: width * 0.12,
    backgroundColor: colors.white,
    marginTop: width * 0.02,
    borderRadius: width * 0.03,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: '4%',
  },
})
