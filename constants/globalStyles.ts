import { StyleSheet } from 'react-native'
import colors from './colors'

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
})
