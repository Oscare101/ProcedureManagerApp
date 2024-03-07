import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from '../../constants/colors'
import { IsChosenDate, IsDateToday } from '../../functions/functions'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import { Master } from '../../constants/interfaces'

const width = Dimensions.get('screen').width

interface DateItemProps {
  item: any
  month: Date
  setDate: any
  date: Date
}

export default function RenderDateItem(props: DateItemProps) {
  const masters = useSelector((state: RootState) => state.masters)
  const schedule: any = useSelector((state: RootState) => state.schedule)

  const today = IsDateToday(props.item)
  const inMonth = new Date(props.item).getMonth() === props.month.getMonth()
  const isChosenDate = IsChosenDate(props.item, props.date)

  function GetDateSchedule() {
    return Object.values(
      schedule['year-' + props.item.getFullYear()]?.[
        'month-' + (props.item.getMonth() + 1)
      ]?.['date-' + props.item.getDate()] || []
    )
  }

  return (
    <TouchableOpacity
      style={{
        width: `${100 / 7}%`,
        height: width * 0.09,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      activeOpacity={0.8}
      onPress={() => {
        props.setDate(props.item)
      }}
    >
      {isChosenDate ? <View style={styles.chosenDate} /> : <></>}

      <Text
        style={[
          styles.date,
          {
            color: today
              ? colors.accent
              : inMonth
              ? colors.card2Title
              : colors.cardPale,
          },
        ]}
      >
        {new Date(props.item).getDate()}
      </Text>
      <View style={styles.mastersBlock}>
        {GetDateSchedule().map((master: any, index: number) => (
          <View
            key={index}
            style={{
              opacity: inMonth ? 1 : 0.5,
              width: width * 0.012,
              height: width * 0.012,
              borderTopLeftRadius: width * 0.01,
              borderTopRightRadius: width * 0.01,
              borderBottomLeftRadius: width * 0.01,
              borderBottomRightRadius: width * 0.01,
              backgroundColor: masters.find((m: Master) => m.id === master)
                ?.color,
              marginHorizontal: width * 0.002,
            }}
          />
        ))}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  date: { fontSize: width * 0.05 },
  chosenDate: {
    height: '100%',
    aspectRatio: 1,
    borderWidth: width * 0.004,
    borderColor: colors.accent,
    position: 'absolute',
    borderRadius: 100,
  },
  mastersBlock: {
    height: width * 0.012,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: width * 0.01,
  },
})
