import { Button, Text, View } from 'react-native'
import globalStyles from '../../constants/globalStyles'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { useCallback, useMemo, useRef } from 'react'
import BottomModalBlock from '../../components/bottomSheetModal/BottomModalBlock'
import { LogIn, LogOut } from '../../functions/actions'
import ButtonBlock from '../../components/application/ButtonBlock'
import text from '../../constants/text'

export default function CalendarScreen({ navigation }: any) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['25%', '50%'], [])
  const onPresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const onDismisModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, [])

  async function LogOutFunc() {
    await LogOut()
    navigation.reset({
      index: 0,
      routes: [{ name: 'LaunchScreen' }],
    })
  }

  return (
    <BottomSheetModalProvider>
      <View style={globalStyles.container}>
        <Text>Calendar</Text>
      </View>
      <Button onPress={onPresentModal} title="Present Modal" color="black" />

      <ButtonBlock title={text.logoutButton} action={LogOutFunc} />
      <BottomModalBlock
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        dismiss={onDismisModal}
      />
    </BottomSheetModalProvider>
  )
}
