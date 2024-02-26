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
import { Agenda, Customer } from '../../constants/interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { updateAgenda } from '../../redux/agenda'

const width = Dimensions.get('screen').width

export default function CreateAgendaScreen({ navigation }: any) {
  const customers: Customer[] = useSelector(
    (state: RootState) => state.customers
  )
  const agenda: Agenda = useSelector((state: RootState) => state.agenda)
  const dispatch = useDispatch()

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => [width * 1.3], [])
  const onPresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const onDismisModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, [])

  function OnNextDate() {
    const newDate = new Date(agenda.date)
    newDate.setDate(newDate.getDate() + 1)

    dispatch(updateAgenda({ ...agenda, date: newDate.getTime() }))
  }

  function OnPreviousDate() {
    const newDate = new Date(agenda.date)
    newDate.setDate(newDate.getDate() - 1)
    dispatch(updateAgenda({ ...agenda, date: newDate.getTime() }))
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
              {new Date(agenda.date).getDate().toString().padStart(2, '0')}.
              {(new Date(agenda.date).getMonth() + 1)
                .toString()
                .padStart(2, '0')}
              .{new Date(agenda.date).getFullYear()} (
              {text.weekDaysShort[(new Date(agenda.date).getDay() || 7) - 1]})
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
            {+agenda.time.split(':')[0] < 10 ||
            +agenda.time.split(':')[0] > 20 ||
            !agenda.time ? (
              <Ionicons
                name="alert-circle-outline"
                size={width * 0.035}
                color={colors.lightErrorTitle}
                style={{
                  position: 'absolute',
                  left: width * 0.01,
                  top: width * 0.01,
                }}
              />
            ) : (
              <></>
            )}
            <Ionicons
              name="time-outline"
              size={width * 0.06}
              color={colors.text}
            />
            <Text style={styles.timeTitle}>{agenda.time}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.comment}>{text.customer}</Text>
        <View style={[styles.card, styles.rowBetween]}>
          <Text style={styles.cardComment}>
            {agenda.customerId || text.customer}
            {/* TODO */}
          </Text>
          <TouchableOpacity
            style={[
              styles.editButton,
              { backgroundColor: agenda.customerId ? colors.bg : colors.card2 },
            ]}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('CustomersScreen', { withoutDrawer: true })
            }
          >
            <Text
              style={[
                styles.editButtonTitle,
                {
                  color: agenda.customerId ? colors.text : colors.card2Title,
                },
              ]}
            >
              {agenda.customerId ? text.rechoose : text.choose}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomModalBlock
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        dismiss={onDismisModal}
        content="timePicker"
        data={{ data: agenda.time }}
        setData={(newTime: string) =>
          dispatch(updateAgenda({ ...agenda, time: newTime }))
        }
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
  comment: {
    width: '92%',
    fontSize: width * 0.04,
    color: colors.comment,
    marginVertical: width * 0.01,
  },

  //
  cardComment: { fontSize: width * 0.04, color: colors.comment },
  editButton: {
    paddingVertical: width * 0.01,
    paddingHorizontal: width * 0.02,
    borderRadius: width * 0.02,
  },
  editButtonTitle: {
    fontSize: width * 0.04,
  },
})
