import { Button, Text, View } from 'react-native'
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

export default function CalendarScreen({ navigation }: any) {
  const [openCalendar, setOpenCalendar] = useState<boolean>(false)
  const [date, setDate] = useState<Date>(new Date())
  // const [year, setYear] = useState<number>(new Date().getFullYear())
  // const [monthIndex, setMonthIndex] = useState<number>(new Date().getMonth())

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['25%', '50%'], [])
  const onPresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const onDismisModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, [])

  return (
    <BottomSheetModalProvider>
      <View style={globalStyles.container}>
        <CalendarHeader
          title={text.months[date.getMonth()]}
          toggle={() => setOpenCalendar(!openCalendar)}
          toggleValue={openCalendar}
        />
        <CalendarBlock
          open={openCalendar}
          date={date}
          setDate={(newDate: Date) => {
            setDate(newDate)
          }}
        />
        <DateInfoBlock
          date={date}
          setDate={(date: Date) => {
            setDate(date)
          }}
        />
        {/* <Button onPress={onPresentModal} title="Present Modal" color="black" /> */}
      </View>

      <BottomModalBlock
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        dismiss={onDismisModal}
      />
    </BottomSheetModalProvider>
  )
}
