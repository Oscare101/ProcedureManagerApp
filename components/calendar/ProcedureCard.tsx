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

const width = Dimensions.get('screen').width

export default function ProcedureCard(props: {
  agenda: Agenda
  customers: Customer[]
  masters: Master[]
  procedures: Procedure[]
}) {
  const navigation: any = useNavigation()
  const customer = props.customers.find(
    (c: Customer) => c.id === props.agenda.customerId
  )
  const master = props.masters.find(
    (m: Master) => m.id === props.agenda.masterId
  )
  const procedures: any = props.agenda.procedures.map((item: any) => {
    return props.procedures.find((p: Procedure) => p.id === item)
  })
  const proceduresString = procedures
    .sort((a: Procedure, b: Procedure) => b.time - a.time)
    .map((item: any) => {
      return item.short
    })
    .join(' ')

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
          navigation.navigate('AgendaInfoScreen', { agendaId: props.agenda.id })
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
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              overflow: 'hidden',
            }}
          >
            <Text numberOfLines={1} style={styles.procedureTitle}>
              {proceduresString}
            </Text>
          </View>

          <View
            style={[
              styles.masterColor,
              {
                backgroundColor: master?.color,
              },
            ]}
          />
        </View>
        <Text numberOfLines={1} style={styles.customer}>
          {customer?.name}
        </Text>
        <Text numberOfLines={1} style={styles.link}>
          {customer?.link || customer?.phone}
        </Text>
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
    overflow: 'hidden',
  },
  customer: {
    fontSize: width * 0.035,
    color: colors.text,
  },
  link: { fontSize: width * 0.035, color: colors.comment },
  masterColor: {
    width: width * 0.02,
    height: width * 0.02,
    borderRadius: width * 0.02,
  },
  procedureTitle: {
    fontSize: width * 0.035,
    color: colors.card2Title,
    flex: 1,
  },
})
