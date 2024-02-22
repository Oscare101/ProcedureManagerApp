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

import { Provider, useDispatch } from 'react-redux'
import { store } from '../../redux/store'
import { useEffect } from 'react'
import { auth } from '../../firebase'
import { getDatabase, onValue, ref } from 'firebase/database'
import { updateMasters } from '../../redux/masters'
import { Master } from '../../constants/interfaces'

export default function CalendarScreen({ navigation }: any) {
  const [openCalendar, setOpenCalendar] = useState<boolean>(false)
  const [date, setDate] = useState<Date>(new Date())

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['25%', '50%'], [])
  const onPresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const onDismisModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, [])

  const dispatch = useDispatch()

  function GetMastersData() {
    if (auth.currentUser && auth.currentUser.email) {
      const data = ref(getDatabase(), `business/PoboiskayaSofia/masters`)
      onValue(data, (snapshot) => {
        dispatch(updateMasters(Object.values(snapshot.val()) as Master[]))
      })
    }
  }

  useEffect(() => {
    GetMastersData()
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
          onEdit={onPresentModal}
          onAdd={() => {}}
        />
        {/* <Button onPress={onPresentModal} title="Present Modal" color="black" /> */}
      </View>

      <BottomModalBlock
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        dismiss={onDismisModal}
        content={'masters'}
      />
    </BottomSheetModalProvider>
  )
}
