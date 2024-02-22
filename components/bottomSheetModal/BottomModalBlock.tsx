import {
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from 'react-native'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import colors from '../../constants/colors'
import MastersScheduleModal from './MastersScheduleModal'

const width = Dimensions.get('screen').width

interface BottomModalBlockProps {
  bottomSheetModalRef: any
  snapPoints: any
  dismiss: any
  content: string
  data?: any
}

export default function BottomModalBlock(props: BottomModalBlockProps) {
  const contentData: any = {
    mastersSchedule: <MastersScheduleModal date={props.data.date} />,
  }

  return (
    <BottomSheetModal
      handleIndicatorStyle={{
        backgroundColor: colors.accent,
      }}
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
        }}
      >
        {contentData[props.content]}
      </View>
    </BottomSheetModal>
  )
}
