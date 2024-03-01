import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import globalStyles from '../../constants/globalStyles'
import { Agenda, Customer, Master, Procedure } from '../../constants/interfaces'
import colors from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'
import agenda from '../../redux/agenda'

const width = Dimensions.get('screen').width

export default function ProcedureCard(props: {
  agenda: Agenda
  customers: Customer[]
  masters: Master[]
  procedures: Procedure[]
}) {
  const navigation = useNavigation()
  return (
    <View
      style={[
        { width: (width * 0.92 * 0.85) / 3 },
        globalStyles.scheduleCardHeight1,
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          // props.setCardPreview()
        }}
        style={[
          styles.card,
          {
            top: width * 0.07 * ((+props.agenda.time.split(':')[1] % 30) / 30),
            height: width * 0.07 * (props.agenda.duration / 30),
          },
        ]}
      >
        <View style={styles.procedureHeader}>
          <Text style={styles.customer}>
            {
              props.customers.find(
                (c: Customer) => c.id === props.agenda.customerId
              )?.name
            }
          </Text>
          <View
            style={[
              styles.masterColor,
              {
                backgroundColor: props.masters.find(
                  (m: Master) => m.id === props.agenda.masterId
                )?.color,
              },
            ]}
          />
        </View>
        {props.agenda.procedures.map((item: any, index: number) => (
          <Text key={index} style={styles.procedureTitle}>
            {props.procedures.find((p: Procedure) => p.id === item)?.short}
          </Text>
        ))}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: (width * 0.92 * 0.85) / 3,
    borderWidth: 1,
    borderRadius: width * 0.02,
    backgroundColor: colors.white,
    position: 'absolute',
    overflow: 'hidden',
  },
  procedureHeader: {
    width: '100%',
    height: width * 0.05,
    backgroundColor: colors.card2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
  customer: {
    fontSize: width * 0.035,
    color: colors.card2Title,
  },
  masterColor: {
    width: width * 0.02,
    height: width * 0.02,
    borderRadius: width * 0.02,
  },
  procedureTitle: { fontSize: width * 0.035, color: colors.text },
})
