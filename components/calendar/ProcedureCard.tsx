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
import { Ionicons } from '@expo/vector-icons'
import { GetDiscountType } from '../../functions/functions'

const width = Dimensions.get('screen').width

export default function ProcedureCard(props: {
  agenda: Agenda
  customers: Customer[]
  masters: Master[]
  procedures: Procedure[]
  isAdmin: boolean
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
    .map((item: Procedure) => {
      return item?.short
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
          {props.agenda.confirmed ? (
            <Ionicons
              name="checkbox"
              size={width * 0.03}
              color={colors.lightSuccessBg}
              style={{ marginRight: width * 0.01 }}
            />
          ) : (
            <></>
          )}
          {props.agenda.prepayment ? (
            <Text style={styles.prepaymentTitle}>₴</Text>
          ) : (
            <></>
          )}
          {props.agenda.discount ? (
            <Text style={styles.discountTitle}>
              -{GetDiscountType(props.agenda.discount)}
            </Text>
          ) : (
            <></>
          )}
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              overflow: 'hidden',
            }}
          >
            <Text numberOfLines={1} style={styles.procedureTitle}>
              {props.agenda.otherProcedure || proceduresString}
            </Text>
          </View>
          {props.agenda.otherPerson && props.isAdmin ? (
            <Ionicons
              name="person-outline"
              size={width * 0.03}
              color={colors.lightWarningTitle}
              style={{ marginRight: width * 0.01 }}
            />
          ) : (
            <></>
          )}
          {props.agenda.comment ? (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={width * 0.03}
              color={colors.lightWarningTitle}
              style={{ marginRight: width * 0.01 }}
            />
          ) : (
            <></>
          )}

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
          {props.isAdmin
            ? customer?.name
            : props.agenda.otherPerson || customer?.name}
        </Text>

        {props.isAdmin ? (
          <Text numberOfLines={1} style={styles.link}>
            {customer?.link || customer?.phone}
          </Text>
        ) : (
          <></>
        )}

        {props.agenda.comment ? (
          <Text numberOfLines={1} style={styles.link}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={width * 0.03}
              color={colors.text}
              style={{ marginRight: width * 0.01 }}
            />
            {props.agenda.comment}
          </Text>
        ) : (
          <></>
        )}
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
    marginLeft: width * 0.005,
  },
  link: {
    fontSize: width * 0.035,
    color: colors.comment,
    marginLeft: width * 0.005,
  },
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
  prepaymentTitle: {
    fontSize: width * 0.03,
    color: colors.darkSuccessTitle,
    marginRight: width * 0.01,
  },
  discountTitle: {
    fontSize: width * 0.03,
    color: colors.comment,
    marginRight: width * 0.01,
  },
})
