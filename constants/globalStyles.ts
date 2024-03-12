import { Dimensions, StyleSheet } from 'react-native'
import colors from './colors'

const { width, height } = Dimensions.get('screen')

export default StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: colors.bg,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scheduleCardHeight1: {
    height: width * 0.07,
  },
  scheduleCardHeight2: {
    height: width * 0.14,
  },
  scheduleCardHeight3: {
    height: width * 0.21,
  },
})
