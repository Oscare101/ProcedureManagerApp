import {
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import colors from '../../constants/colors'
import MessengerModal from './MessengerModal'
import MastersScheduleModal from './MastersScheduleModal copy'
import TimePickerModal from './TimePickerModal'

const width = Dimensions.get('screen').width

interface BottomModalBlockProps {
  bottomSheetModalRef: any
  snapPoints: any
  dismiss: any
  content: string
  data?: any
  setData?: any
}

export default function BottomModalBlock(props: BottomModalBlockProps) {
  const contentData: any = {
    mastersSchedule: (
      <MastersScheduleModal
        date={props.data.date}
        setDate={(newDate: Date) => props.setData(newDate)}
      />
    ),
    messengerModal: (
      <MessengerModal
        date={props.data.date}
        setDate={(newDate: Date) => props.setData(newDate)}
      />
    ),
    timePicker: (
      <TimePickerModal
        data={props.data.data}
        setData={(newData: string) => props.setData(newData)}
      />
    ),
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
          ></View>
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
