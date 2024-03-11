import { FlatList } from 'react-native'
import { GetDaysTable } from '../../functions/functions'
import RenderDateItem from './RenderDateItem'
import { memo, useCallback } from 'react'

interface DatesBlockProps {
  setDate: any
  date: Date
  month: Date
}

function DatesBlock(props: DatesBlockProps) {
  const setDate = useCallback((newDate: Date) => {
    props.setDate(newDate)
  }, [])

  return (
    <FlatList
      scrollEnabled={false}
      data={GetDaysTable(props.month.getFullYear(), props.month.getMonth())}
      renderItem={(item: any) => (
        <RenderDateItem
          item={item.item}
          month={props.month}
          date={props.date}
          setDate={setDate}
        />
      )}
      numColumns={7}
      style={{ width: '100%' }}
    />
  )
}

export default memo(DatesBlock)
