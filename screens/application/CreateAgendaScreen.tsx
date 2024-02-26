import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import globalStyles from '../../constants/globalStyles'
import Header from '../../components/application/Header'
import text from '../../constants/text'
import { useCallback, useMemo, useRef, useState } from 'react'
import colors from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import BottomModalBlock from '../../components/bottomSheetModal/BottomModalBlock'

const width = Dimensions.get('screen').width

export default function CreateAgendaScreen({ navigation, route }: any) {
  const [date, setDate] = useState<Date>(route.params?.date || new Date())
  const [time, setTime] = useState<string>(route.params?.time || '00:00')

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => [width * 1.3], [])
  const onPresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const onDismisModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, [])

  function OnNextDate() {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + 1)
    setDate(newDate)
  }

  function OnPreviousDate() {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() - 1)
    setDate(newDate)
  }

  return (
    <BottomSheetModalProvider>
      <View style={globalStyles.center}>
        <Header title={text.createProcedure} action="back" />
        <View style={[styles.card, styles.rowBetween]}>
          <View style={styles.dateBlock}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={OnPreviousDate}
              style={styles.dateButon}
            >
              <Ionicons
                name="chevron-back"
                size={width * 0.06}
                color={colors.text}
              />
            </TouchableOpacity>
            <Text style={styles.dateTitle}>
              {date.getDate().toString().padStart(2, '0')}.
              {(date.getMonth() + 1).toString().padStart(2, '0')}.
              {date.getFullYear()} (
              {text.weekDaysShort[(date.getDay() || 7) - 1]})
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={OnNextDate}
              style={styles.dateButon}
            >
              <Ionicons
                name="chevron-forward"
                size={width * 0.06}
                color={colors.text}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPresentModal}
            style={styles.timeBlock}
          >
            <Ionicons
              name="time-outline"
              size={width * 0.06}
              color={colors.text}
            />
            <Text style={styles.timeTitle}>{time}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomModalBlock
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        dismiss={onDismisModal}
        content="timePicker"
        data={{ data: time }}
        setData={(newTime: string) => setTime(newTime)}
      />
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '92%',
    padding: width * 0.02,
    backgroundColor: colors.white,
    marginTop: width * 0.02,
    borderRadius: width * 0.03,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateBlock: {
    width: width * 0.86 * 0.65,
    height: width * 0.12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.bg,
    borderRadius: width * 0.02,
  },
  dateButon: {
    height: '80%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTitle: { fontSize: width * 0.04, color: colors.text },
  timeBlock: {
    width: width * 0.86 * 0.35,
    height: width * 0.12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.bg,
    borderRadius: width * 0.02,
  },
  timeTitle: { fontSize: width * 0.04, color: colors.text },
})
