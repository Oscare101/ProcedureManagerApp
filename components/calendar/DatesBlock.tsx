import { FlatList } from 'react-native'
import { GetDaysTable } from '../../functions/functions'
import { RenderDateItem } from './RenderDateItem'

interface DatesBlockProps {
  year: number
  monthIndex: number
  setChosenDate: any
  chosenDate: string
}

export default function DatesBlock(props: DatesBlockProps) {
  return (
    <FlatList
      scrollEnabled={false}
      data={GetDaysTable(props.year, props.monthIndex)}
      renderItem={(item: any) => (
        <RenderDateItem
          item={item.item}
          monthIndex={props.monthIndex}
          year={props.year}
          chosenDate={props.chosenDate}
          setChosenDate={(value: any) => props.setChosenDate(value)}
        />
      )}
      numColumns={7}
      style={{ width: '100%' }}
    />
  )
}
