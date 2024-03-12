import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import globalStyles from '../../constants/globalStyles'
import Header from '../../components/application/Header'
import text from '../../constants/text'
import DateTimeBlock from '../../components/agenda/DateTimeBlock'
import colors from '../../constants/colors'
import ChosenCustomerItem from '../../components/agenda/ChosenCustomerItem'
import ChosenMasterItem from '../../components/agenda/ChosenMasterItem'
import ChosenProceduresItem from '../../components/agenda/ChosenProceduresItem'
import ButtonBlock from '../../components/application/ButtonBlock'
import { useDispatch, useSelector } from 'react-redux'
import { updateAgenda, initialStateAgenda } from '../../redux/agenda'
import { Agenda } from '../../constants/interfaces'
import { RootState } from '../../redux'
import PrepaymentBlock from '../../components/agenda/PrepaymentBlock'
import { useState } from 'react'
import DeleteAgendaModal from '../../components/agenda/DeleteAgendaModal'
import { DeleteAgenda, UpdateAgenda } from '../../functions/actions'
import AgendaActionsBlock from '../../components/agenda/AgendaActionsBlock'
import * as Clipboard from 'expo-clipboard'
import CommentCardBlock from '../../components/agenda/CommentCardBlock'
import Toast from 'react-native-toast-message'
import { GetDateFormateFromString } from '../../functions/functions'

const width = Dimensions.get('screen').width

export default function AgendaInfoScreen({ navigation, route }: any) {
  const agendas: Agenda[] = useSelector((state: RootState) => state.agendas)
  const agenda: Agenda = agendas.find(
    (a: Agenda) => a.id === route.params.agendaId
  ) as Agenda

  const [deleteModal, setDeleteModal] = useState<boolean>(false)

  const dispatch = useDispatch()

  async function CloseAgendaFunc() {
    setDeleteModal(false)
    await UpdateAgenda({ ...agenda, canceled: true })
    navigation.goBack()
  }

  async function ReOpenAgendaFunc() {
    setDeleteModal(false)
    await UpdateAgenda({ ...agenda, canceled: false })
    navigation.goBack()
  }

  async function DeleteAgendaFunc() {
    setDeleteModal(false)
    await DeleteAgenda(agenda)
    navigation.goBack()
  }

  return (
    <View style={globalStyles.container}>
      <Header title={text.agenda} action="back" />
      {agenda?.date ? (
        <>
          <DateTimeBlock
            date={GetDateFormateFromString(agenda.date).getTime()}
            time={agenda.time}
            static={true}
            onModal={false}
          />
          <Text style={styles.comment}>{text.customer}</Text>
          <ChosenCustomerItem customerId={agenda.customerId} static={true} />
          <Text style={styles.comment}>{text.master}</Text>
          <ChosenMasterItem
            action={false}
            static={true}
            masterId={agenda.masterId}
          />
          <Text style={styles.comment}>{text.procedure}</Text>
          <ChosenProceduresItem
            action={false}
            static={true}
            procedures={agenda.procedures}
            duration={agenda.duration}
          />
          {agenda.prepayment ? (
            <PrepaymentBlock
              amount={agenda.prepayment}
              onChange={false}
              static={true}
            />
          ) : (
            <></>
          )}
          <AgendaActionsBlock
            onRepeat={() => {
              dispatch(
                updateAgenda({
                  ...initialStateAgenda,
                  date: agenda.date,
                  masterId: agenda.masterId,
                  customerId: agenda.customerId,
                  procedures: agenda.procedures,
                  duration: agenda.duration,
                })
              )
              navigation.navigate('CreateAgendaScreen')
            }}
            onCopy={async () => {
              await Clipboard.setStringAsync(
                text.confirmationAgenda.replace('#', agenda.time)
              )
              Toast.show({
                type: 'ToastMessage',
                props: {
                  title: text.textCopied,
                },
                position: 'bottom',
              })
            }}
            onDelete={() => setDeleteModal(true)}
          />
          {agenda.comment ? (
            <CommentCardBlock comment={agenda.comment} />
          ) : (
            <></>
          )}
          <View style={{ flex: 1 }} />
          <ButtonBlock
            title={text.edit}
            action={() => {
              dispatch(updateAgenda(agenda))
              navigation.navigate('CreateAgendaScreen', {
                agenda: agenda,
              })
            }}
            buttonStyles={{ marginBottom: width * 0.05 }}
          />
          <DeleteAgendaModal
            visible={deleteModal}
            agenda={agenda}
            onClose={() => setDeleteModal(false)}
            onCancel={CloseAgendaFunc}
            onDelete={DeleteAgendaFunc}
            onReOpen={ReOpenAgendaFunc}
          />
        </>
      ) : (
        <></>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  comment: {
    width: '92%',
    fontSize: width * 0.04,
    color: colors.comment,
    marginVertical: width * 0.01,
  },
  text: {
    width: '92%',
    fontSize: width * 0.04,
    color: colors.text,
    marginVertical: width * 0.01,
  },
  deleteButton: {
    height: width * 0.12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: width * 0.05,
  },
  deleteButtonTitle: {
    fontSize: width * 0.04,
    color: colors.lightErrorTitle,
  },
  card: {
    width: '92%',
    padding: width * 0.02,
    backgroundColor: colors.white,
    marginTop: width * 0.02,
    borderRadius: width * 0.03,
    alignSelf: 'center',
  },
})
