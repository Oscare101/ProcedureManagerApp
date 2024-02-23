import { Dimensions, StyleSheet } from 'react-native'
import colors from './colors'

const width = Dimensions.get('screen').width

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.bg,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleCardHeight1: {
    height: width * 0.1,
  },
  scheduleCardHeight2: {
    height: width * 0.2,
  },
  scheduleCardHeight3: {
    height: width * 0.3,
  },
})
