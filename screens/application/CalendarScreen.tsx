import { Button, Text, View } from 'react-native'
import globalStyles from '../../constants/globalStyles'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { useCallback, useMemo, useRef } from 'react'
import BottomModalBlock from '../../components/bottomSheetModal/BottomModalBlock'
import { LogOut } from '../../functions/actions'
import ButtonBlock from '../../components/application/ButtonBlock'
import text from '../../constants/text'
import Header from '../../components/application/Header'

export default function CalendarScreen({ navigation }: any) {
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
        <Header title={text.calendarTitle} />
      </View>
      <Button onPress={onPresentModal} title="Present Modal" color="black" />

      <BottomModalBlock
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        dismiss={onDismisModal}
      />
    </BottomSheetModalProvider>
  )
}
