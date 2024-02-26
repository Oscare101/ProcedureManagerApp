import { useNavigation } from '@react-navigation/native'
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import text from '../../constants/text'
import colors from '../../constants/colors'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import { Agenda } from '../../constants/interfaces'

const width = Dimensions.get('screen').width

export default function EmptyCustomerItem() {
  const agenda: Agenda = useSelector((state: RootState) => state.agenda)
  const navigation: any = useNavigation()

  return (
    <View style={[styles.card, styles.rowBetween]}>
      <Text style={styles.cardComment}>
        {agenda.customerId || text.customer}
        {/* TODO */}
      </Text>
      <TouchableOpacity
        style={[
          styles.editButton,
          {
            backgroundColor: agenda.customerId ? colors.bg : colors.card2,
          },
        ]}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('CustomersScreen', { withoutDrawer: true })
        }
      >
        <Text
          style={[
            styles.editButtonTitle,
            {
              color: agenda.customerId ? colors.text : colors.card2Title,
            },
          ]}
        >
          {agenda.customerId ? text.rechoose : text.choose}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '92%',
    padding: width * 0.02,
    backgroundColor: colors.white,
    marginTop: width * 0.02,
    borderRadius: width * 0.03,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardComment: { fontSize: width * 0.04, color: colors.comment },
  editButton: {
    paddingVertical: width * 0.01,
    paddingHorizontal: width * 0.02,
    borderRadius: width * 0.02,
  },
  editButtonTitle: {
    fontSize: width * 0.04,
  },
})
