import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from '../../constants/colors'
import { IsChosenDate, IsDateToday } from '../../functions/functions'

const width = Dimensions.get('screen').width

interface DateItemProps {
  item: any
  date: Date
  setDate: any
}

export function RenderDateItem(props: DateItemProps) {
  const today = IsDateToday(props.item)
  const inMonth = new Date(props.item).getMonth() === props.date.getMonth()
  const isChosenDate = IsChosenDate(props.item, props.date)

  function GetDateSchedule() {
    return []
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
            color: inMonth
              ? today
                ? colors.accent
                : colors.card2Title
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
              width: width * 0.012,
              height: width * 0.012,
              borderRadius: width * 0.01,
              backgroundColor: master,
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
