import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import colors from '../../constants/colors'
import { Agenda, Customer, Master, Procedure } from '../../constants/interfaces'
import text from '../../constants/text'
import globalStyles from '../../constants/globalStyles'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import ButtonBlock from '../application/ButtonBlock'
import { GetDateString } from '../../functions/functions'

const { width, height } = Dimensions.get('screen')

export default function DeleteAgendaModal(props: {
  visible: boolean
  agenda: Agenda
  onClose: any
  onCancel: any
  onDelete: any
  onReOpen: any
}) {
  const customers: Customer[] = useSelector(
    (state: RootState) => state.customers
  )
  const masters: Master[] = useSelector((state: RootState) => state.masters)
  const procedures: Procedure[] = useSelector(
    (state: RootState) => state.procedures
  )

  const proceduresArr: any = props.agenda.procedures.map((item: any) => {
    return procedures.find((p: Procedure) => p.id === item)
  })
  const proceduresString = proceduresArr
    .sort((a: Procedure, b: Procedure) => b.time - a.time)
    .map((item: Procedure) => {
      return item?.short
    })
    .join(' ')

  const data = [
    {
      title: text.date,
      value: `${props.agenda.date} (${
        text.weekDaysShort[(new Date(props.agenda.date).getDay() || 7) - 1]
      })`,
    },
    {
      title: text.time,
      value: props.agenda.time,
    },
    {
      title: text.customer,
      value: customers.find((c: Customer) => c.id === props.agenda.customerId)
        ?.name,
    },
    {
      title: text.master,
      value: masters.find((c: Master) => c.id === props.agenda.masterId)?.name,
    },
    {
      title: text.procedure,
      value: proceduresString,
    },
    {
      title: text.prepayment,
      value: props.agenda.prepayment || text.absent,
    },
  ]

  function RenderItem({ item }: any) {
    return (
      <View style={globalStyles.rowBetween}>
        <Text style={styles.infoText}>{item.title}</Text>
        <Text style={styles.infoText}>{item.value}</Text>
      </View>
    )
  }

  return (
    <Modal transparent visible={props.visible} style={styles.modal}>
      <TouchableWithoutFeedback onPress={props.onClose}>
        <View style={styles.modalView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalBlock}>
              <View style={globalStyles.rowBetween}>
                <Text style={styles.title}>{text.deleteAgenda}</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={props.onClose}
                  style={styles.closeButton}
                >
                  <Ionicons
                    name="close-outline"
                    size={width * 0.06}
                    color={colors.text}
                  />
                </TouchableOpacity>
              </View>

              <FlatList
                style={{ marginVertical: width * 0.05 }}
                data={data}
                renderItem={RenderItem}
              />
              {props.agenda.canceled ? (
                <></>
              ) : (
                <Text style={styles.canceledTitle}>
                  {text.canceledAgendaWillBeSaved}
                </Text>
              )}

              <ButtonBlock
                title={props.agenda.canceled ? text.reOpen : text.Cancel}
                action={props.agenda.canceled ? props.onReOpen : props.onCancel}
                buttonStyles={{
                  width: '100%',
                  backgroundColor: props.agenda.canceled
                    ? colors.lightSuccessBg
                    : colors.lightErrorBg,
                  marginVertical: width * 0.02,
                }}
                titleStyles={{
                  color: props.agenda.canceled
                    ? colors.lightSuccessTitle
                    : colors.lightErrorTitle,
                }}
              />
              <ButtonBlock
                title={text.delete}
                action={props.onDelete}
                buttonStyles={{
                  width: '100%',
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    width: '100%',
  },
  modalView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000066',
  },
  modalBlock: {
    width: width * 0.8,
    // height: height * 0.5,
    borderRadius: width * 0.05,
    padding: width * 0.03,
    backgroundColor: colors.white,
  },
  closeButton: { padding: width * 0.005 },
  title: {
    fontSize: width * 0.055,
    color: colors.text,
  },
  infoText: {
    fontSize: width * 0.04,
    color: colors.text,
    marginVertical: width * 0.005,
  },
  canceledTitle: {
    fontSize: width * 0.03,
    textAlign: 'center',
    color: colors.lightErrorTitle,
  },
})
