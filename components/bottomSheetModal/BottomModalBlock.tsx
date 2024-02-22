import {
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from 'react-native'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import colors from '../../constants/colors'

const width = Dimensions.get('screen').width

interface BottomModalBlockProps {
  bottomSheetModalRef: any
  snapPoints: any
  dismiss: any
  content: string
}

export default function BottomModalBlock(props: BottomModalBlockProps) {
  // const contentData: any = {
  //   themeBlock: <ThemeBlockModal />,

  // }

  return (
    <BottomSheetModal
      // backgroundStyle={{ backgroundColor: '#00000000' }}
      handleIndicatorStyle={{
        backgroundColor: colors.accent,
      }}
      // handleComponent={() => (
      //   <View style={{ width: 10, height: 10, backgroundColor: 'red' }}></View>
      // )}
      ref={props.bottomSheetModalRef}
      snapPoints={props.snapPoints}
      backdropComponent={({ style }) => (
        <TouchableWithoutFeedback onPress={props.dismiss}>
          <View
            style={[
              style,
              {
                backgroundColor: '#00000066',
              },
            ]}
          >
            <StatusBar backgroundColor={colors.white} />
          </View>
        </TouchableWithoutFeedback>
      )}
    >
      <View
        style={{
          backgroundColor: colors.white,
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          // overflow: 'hidden',
        }}
      >
        {/* {contentData[props.content]} */}
      </View>
    </BottomSheetModal>
  )
}
