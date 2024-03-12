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

const width = Dimensions.get('screen').width

export default function CalendarScreen({ navigation }: any) {
  const [openCalendar, setOpenCalendar] = useState<boolean>(false)
  const [date, setDate] = useState<Date>(new Date())

  const [dates, setDates] = useState<any[]>([
    new Date(new Date(date).setDate(date.getDate() - 1)),
    new Date(date),
    new Date(new Date(date).setDate(date.getDate() + 1)),
  ])

  const flatListRef: any = useRef(null)

  const [modalContent, setModalContent] = useState<string>('')

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => [width * 0.7, '100%'], [])
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

  function SetDates(date: Date) {
    setDates([
      new Date(new Date(date).setDate(date.getDate() - 1)),
      new Date(date),
      new Date(new Date(date).setDate(date.getDate() + 1)),
    ])
  }

  const openCalendarFunc = useCallback(() => {
    setOpenCalendar(!openCalendar)
  }, [openCalendar])

  return (
    <BottomSheetModalProvider>
      <View style={globalStyles.container}>
        <CalendarHeader
          title={text.months[date.getMonth()]}
          toggle={openCalendarFunc}
          toggleValue={openCalendar}
        />
        <CalendarBlock
          open={openCalendar}
          date={date}
          setDate={(newDate: Date) => {
            setDate(newDate)
            SetDates(newDate)
          }}
        />
        <FlatList
          ref={flatListRef}
          horizontal
          pagingEnabled
          data={dates}
          renderItem={({ item }: any) => (
            <View
              style={{
                width: width,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <DateInfoBlock
                date={item}
                setDate={(date: Date) => {
                  setDate(date)
                  SetDates(date)
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
              <ScheduleBlock date={item} />
            </View>
          )}
          snapToInterval={width}
          snapToAlignment="start"
          initialScrollIndex={1}
          decelerationRate={'fast'}
          onMomentumScrollEnd={(event: any) => {
            if (
              Math.floor((event.nativeEvent.contentOffset.x + 2) / width) < 1
            ) {
              const newDate = new Date(date)
              newDate.setDate(newDate.getDate() - 1)
              setDate(newDate)
              SetDates(newDate)
            } else if (
              Math.floor((event.nativeEvent.contentOffset.x + 2) / width) > 1
            ) {
              const newDate = new Date(date)
              newDate.setDate(newDate.getDate() + 1)
              setDate(newDate)
              SetDates(newDate)
            }
            const index: number = 1
            flatListRef.current.scrollToIndex({ animated: false, index })
          }}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />
      </View>

      <BottomModalBlock
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        dismiss={onDismisModal}
        content={modalContent}
        data={{ date: date }}
        setData={(newDate: Date) => {
          setDate(newDate)
          SetDates(newDate)
        }}
      />
    </BottomSheetModalProvider>
  )
}
