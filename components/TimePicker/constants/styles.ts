import { Dimensions, StyleSheet } from 'react-native'
import colors from '../../../constants/colors'

const width = Dimensions.get('screen').width

export default StyleSheet.create({
  container: {
    width: width * 0.9,
    backgroundColor: colors.bg,
    padding: '5%',
    borderRadius: width * 0.06,
  },

  hourMinuteBlock: {
    width: '40%',
    backgroundColor: colors.white,
    aspectRatio: 1.5,
    borderRadius: width * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  hourMinuteTitle: {
    fontSize: width * 0.15,
    color: colors.text,
  },
  dotBlock: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: width * 0.07,
  },
  dot: {
    width: width * 0.02,
    aspectRatio: 1,
    backgroundColor: colors.text,
    borderRadius: 100,
  },

  dialBlock: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderRadius: width,
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonsBlock: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: width * 0.03,
    paddingHorizontal: '5%',
  },
  cancelButton: {
    fontSize: width * 0.05,
    color: colors.text,
    alignSelf: 'flex-start',
  },
  confirmButton: {
    fontSize: width * 0.05,
    color: colors.text,
    alignSelf: 'flex-end',
  },
})
