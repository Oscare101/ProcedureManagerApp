import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import RenderMessengerIcon from './RenderMessengerIcon'
import colors from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'

const width = Dimensions.get('screen').width

export function RenderCustomerInfoItem({ item }: any) {
  if (!item.value) {
    return <></>
  }
  return (
    <TouchableOpacity
      disabled={!item.onPress}
      activeOpacity={0.8}
      onPress={item.onPress}
      style={styles.card}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>

      {item.messenger ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <RenderMessengerIcon messenger={item.messenger} />
          <Text style={[styles.cardValue, { marginLeft: width * 0.02 }]}>
            {item.value}
          </Text>
        </View>
      ) : (
        <>
          <Text style={styles.cardValue}>{item.value}</Text>
        </>
      )}
      {item.icon ? (
        <Ionicons
          name={item.icon}
          size={width * 0.05}
          color={colors.text}
          style={{
            position: 'absolute',
            top: width * 0.02,
            right: width * 0.02,
          }}
        />
      ) : (
        <></>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '92%',
    borderRadius: width * 0.03,
    padding: width * 0.02,
    backgroundColor: colors.white,
    marginTop: width * 0.02,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  cardTitle: {
    fontSize: width * 0.04,
    color: colors.comment,
  },
  cardValue: {
    fontSize: width * 0.05,
    color: colors.text,
  },
})
