import { Dimensions, View } from 'react-native'
import globalStyles from '../../constants/globalStyles'
import Header from '../../components/application/Header'
import text from '../../constants/text'
import SwipeSwitcher from '../../components/settings/SwipeSwitcher'
import LogOutBlock from '../../components/settings/LogOutBlock'
import { useCallback, useMemo, useRef } from 'react'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import BottomModalBlock from '../../components/bottomSheetModal/BottomModalBlock'

const width = Dimensions.get('screen').width

export default function SettingsScreen({ navigation }: any) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => [width * 0.6, '100%'], [])
  const onPresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const onDismisModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, [])

  return (
    <BottomSheetModalProvider>
      <View style={globalStyles.container}>
        <Header title={text.Settings} action="drawer" />
        <SwipeSwitcher />
        <LogOutBlock onPress={onPresentModal} />
      </View>
      <BottomModalBlock
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        dismiss={onDismisModal}
        content={'logOut'}
        data={{}}
      />
    </BottomSheetModalProvider>
  )
}
