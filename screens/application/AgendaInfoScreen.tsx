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
import { updateAgenda } from '../../redux/agenda'
import { Agenda } from '../../constants/interfaces'
import { RootState } from '../../redux'
import PrepaymentBlock from '../../components/agenda/PrepaymentBlock'
import { useState } from 'react'
import DeleteAgendaModal from '../../components/agenda/DeleteAgendaModal'
import { DeleteAgenda, UpdateAgenda } from '../../functions/actions'
import { Ionicons } from '@expo/vector-icons'
import AgendaActionsBlock from '../../components/agenda/AgendaActionsBlock'

const width = Dimensions.get('screen').width

export default function AgendaInfoScreen({ navigation, route }: any) {
  const agendas: Agenda[] = useSelector((state: RootState) => state.agendas)
  const agenda: Agenda = agendas.find(
    (a: Agenda) => a.id === route.params.agendaId
  ) as Agenda

  const [deleteModal, setDeleteModal] = useState<boolean>(false)

  const dispatch = useDispatch()

  async function CloseAgendaFunc() {
    await UpdateAgenda({ ...agenda, canceled: true })
    navigation.goBack()
  }

  async function DeleteAgendaFunc() {
    await DeleteAgenda(agenda)
    navigation.goBack()
  }

  return (
    <View style={globalStyles.container}>
      <Header title={text.agenda} action="back" />
      {agenda?.date ? (
        <>
          <DateTimeBlock
            date={agenda.date}
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
            onRepeat={() => {}}
            onDelete={() => setDeleteModal(true)}
          />
          {agenda.comment ? (
            <View style={styles.card}>
              <Text style={[styles.comment, { marginTop: 0 }]}>
                {text.comment}
              </Text>
              <View
                style={[globalStyles.rowBetween, { alignItems: 'flex-start' }]}
              >
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={width * 0.05}
                  color={colors.comment}
                />
                <Text style={[styles.text, { marginVertical: 0 }]}>
                  {agenda.comment}
                </Text>
              </View>
            </View>
          ) : (
            <></>
          )}
          <View style={{ flex: 1 }} />
          {/* <TouchableOpacity
            style={styles.deleteButton}
            activeOpacity={0.8}
            onPress={() => {
              setDeleteModal(true)
            }}
          >
            <Text style={styles.deleteButtonTitle}>{text.delete}</Text>
          </TouchableOpacity> */}
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
