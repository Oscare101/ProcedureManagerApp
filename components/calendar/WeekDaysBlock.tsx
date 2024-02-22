import { Dimensions, FlatList } from 'react-native'
import rules from '../../constants/rules'
import text from '../../constants/text'
import { RenderWeekDayItem } from './RenderWeekDayItem'
// import { RenderWeekDayItem } from './RenderWeekDayItem'

const width = Dimensions.get('screen').width

export default function WeekDaysBlock(props: any) {
  return (
    <FlatList
      scrollEnabled={false}
      data={text.weekDaysShort}
      renderItem={(item: any) => (
        <RenderWeekDayItem
          item={item.item}
          weekDayStyles={props.weekDayStyles}
        />
      )}
      numColumns={7}
      style={{ width: '100%', height: width * 0.09 }}
    />
  )
}
