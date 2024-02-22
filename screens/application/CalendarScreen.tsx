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

export default function CalendarScreen({ navigation }: any) {
  const [openCalendar, setOpenCalendar] = useState<boolean>(false)
  const [chosenDate, setChosenDate] = useState<string>('')
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [monthIndex, setMonthIndex] = useState<number>(new Date().getMonth())

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
          title={text.months[monthIndex]}
          toggle={() => setOpenCalendar(!openCalendar)}
          toggleValue={openCalendar}
        />
        <CalendarBlock
          open={openCalendar}
          chosenDate={chosenDate}
          setChosenDate={(date: string) => {
            setChosenDate(date)
          }}
          year={year}
          monthIndex={monthIndex}
          setYear={(value: number) => setYear(value)}
          setMonthIndex={(value: number) => setMonthIndex(value)}
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
