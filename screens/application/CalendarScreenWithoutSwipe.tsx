import { Dimensions, FlatList, View } from 'react-native'
import globalStyles from '../../constants/globalStyles'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { useCallback, useMemo, useRef, useState } from 'react'
import BottomModalBlock from '../../components/bottomSheetModal/BottomModalBlock'
import text from '../../constants/text'
import CalendarBlock from '../../components/calendar/CalendarBlock'
import CalendarHeader from '../../components/application/CalendarHeader'
import DateInfoBlock from '../../components/calendar/DateInfoBlock'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { auth } from '../../firebase'
import { getDatabase, onValue, ref } from 'firebase/database'
import { clearSchedule, updateSchedule } from '../../redux/schedule'
import ScheduleBlock from '../../components/calendar/ScheduleBlock'
import { initialStateAgenda, updateAgenda } from '../../redux/agenda'
import { GetDateString } from '../../functions/functions'
import CalendarBlockWithoutSwipe from '../../components/calendar/CalendarBlockWithoutSwipe'

const width = Dimensions.get('screen').width

export default function CalendarScreenWithoutSwipe({ navigation }: any) {
  const [openCalendar, setOpenCalendar] = useState<boolean>(false)
  const [date, setDate] = useState<Date>(new Date())
  console.log('date: ')

  const [modalContent, setModalContent] = useState<string>('')

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => [width * 0.6, '100%'], [])
  const onPresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const onDismisModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, [])

  const dispatch = useDispatch()

  function GetSchedule(date: Date) {
    if (auth.currentUser && auth.currentUser.email) {
      const data = ref(getDatabase(), `business/PoboiskayaSofia/schedule/`)
      onValue(data, (snapshot) => {
        dispatch(clearSchedule())
        if (snapshot.val()) {
          dispatch(updateSchedule(snapshot.val()))
        }
      })
    }
  }

  useEffect(() => {
    GetSchedule(date)
  }, [])

  const openCalendarFunc = useCallback(
    (value: boolean) => {
      setOpenCalendar(value)
    },
    [openCalendar]
  )

  return (
    <BottomSheetModalProvider>
      <View style={globalStyles.container}>
        <CalendarHeader
          title={text.months[date.getMonth()]}
          setValue={openCalendarFunc}
          toggleValue={openCalendar}
        />
        <CalendarBlockWithoutSwipe
          open={openCalendar}
          date={date}
          setDate={(newDate: Date) => {
            setDate(newDate)
          }}
          onClose={openCalendarFunc}
        />

        <DateInfoBlock
          date={date}
          setDate={(date: Date) => {
            setDate(date)
          }}
          onEdit={() => {
            setModalContent('mastersSchedule')
            onPresentModal()
          }}
          onAdd={() => {
            dispatch(
              updateAgenda({
                ...initialStateAgenda,
                date: GetDateString(date),
              })
            )
            navigation.navigate('CreateAgendaScreen')
          }}
          onGetScheule={() => {
            setModalContent('getSchedule')
            onPresentModal()
          }}
        />
        <ScheduleBlock date={date} />
      </View>

      <BottomModalBlock
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        dismiss={onDismisModal}
        content={modalContent}
        data={{ date: date }}
        setData={(newDate: Date) => {
          setDate(newDate)
        }}
      />
    </BottomSheetModalProvider>
  )
}
