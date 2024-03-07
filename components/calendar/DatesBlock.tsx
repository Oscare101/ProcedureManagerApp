import { FlatList } from 'react-native'
import { GetDaysTable } from '../../functions/functions'
import RenderDateItem from './RenderDateItem'

interface DatesBlockProps {
  setDate: any
  date: Date
  month: Date
}

export default function DatesBlock(props: DatesBlockProps) {
  return (
    <FlatList
      scrollEnabled={false}
      data={GetDaysTable(props.month.getFullYear(), props.month.getMonth())}
      renderItem={(item: any) => (
        <RenderDateItem
          item={item.item}
          month={props.month}
          date={props.date}
          setDate={(newDate: Date) => props.setDate(newDate)}
        />
      )}
      numColumns={7}
      style={{ width: '100%' }}
    />
  )
}
