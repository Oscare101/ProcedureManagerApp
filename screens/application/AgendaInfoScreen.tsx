import { Dimensions, StyleSheet, Text, View } from 'react-native'
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
import { Agenda, Customer } from '../../constants/interfaces'
import { RootState } from '../../redux'
import PrepaymentBlock from '../../components/agenda/PrepaymentBlock'
import { useState } from 'react'
import DeleteAgendaModal from '../../components/agenda/DeleteAgendaModal'
import { DeleteAgenda, UpdateAgenda } from '../../functions/actions'
import AgendaActionsBlock from '../../components/agenda/AgendaActionsBlock'
import * as Clipboard from 'expo-clipboard'
import CommentCardBlock from '../../components/agenda/CommentCardBlock'
import Toast from 'react-native-toast-message'
import {
  GetDateFormateFromString,
  TodayOrFuture,
} from '../../functions/functions'
import ConfirmationBlock from '../../components/agenda/ConfirmationBlock'
import OtherPersonBlock from '../../components/agenda/OtherPersonBlock'
import OtherProcedureBlock from '../../components/agenda/OtherProcedureBlock'
import { auth } from '../../firebase'
import CustomerNameBlock from '../../components/agenda/CustomerNameBlock'
import AgendaIdBlock from '../../components/agenda/AgendaIdBlock'
import { ScrollView } from 'react-native-gesture-handler'
import DiscountBlock from '../../components/agenda/DiscountBlock'

const width = Dimensions.get('screen').width

export default function AgendaInfoScreen({ navigation, route }: any) {
  const customers: Customer[] = useSelector(
    (state: RootState) => state.customers
  )
  const agendas: Agenda[] = useSelector((state: RootState) => state.agendas)
  const agenda: Agenda = agendas.find(
    (a: Agenda) => a.id === route.params.agendaId
  ) as Agenda
  const permissions: any = useSelector((state: RootState) => state.permissions)
  const isAdmin: boolean =
    !!auth.currentUser &&
    !!auth.currentUser.email &&
    permissions[auth.currentUser?.email.replaceAll('.', ',')] === 'admin'

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

  async function ToggleComfirmation() {
    await UpdateAgenda({ ...agenda, confirmed: !agenda.confirmed })
  }

  return (
    <View style={globalStyles.container}>
      <Header title={text.agenda} action="back" />

      {agenda?.date ? (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, width: '100%' }}
          >
            <View
              style={{
                flex: 1,
                width: width,
                backgroundColor: colors.bg,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <DateTimeBlock
                date={GetDateFormateFromString(agenda.date).getTime()}
                time={agenda.time}
                static={true}
                onModal={false}
              />
              <Text style={styles.comment}>{text.customer}</Text>
              {isAdmin ? (
                <ChosenCustomerItem
                  customerId={agenda.customerId}
                  static={true}
                />
              ) : (
                <CustomerNameBlock
                  name={
                    agenda.otherPerson ||
                    customers.find((c: Customer) => c.id === agenda.customerId)
                      ?.name ||
                    ''
                  }
                />
              )}

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
                procedureString={isAdmin ? '' : agenda.otherProcedure}
                duration={agenda.duration}
              />
              {!agenda.canceled && TodayOrFuture(agenda.date) ? (
                <ConfirmationBlock
                  confirmed={!!agenda.confirmed}
                  toggleComfirmation={ToggleComfirmation}
                  static={!isAdmin}
                />
              ) : (
                <></>
              )}

              {agenda.prepayment ? (
                <PrepaymentBlock
                  amount={agenda.prepayment}
                  onChange={false}
                  static={true}
                />
              ) : (
                <></>
              )}

              {agenda.otherPerson ? (
                <OtherPersonBlock
                  name={agenda.otherPerson}
                  onChange={false}
                  static={true}
                />
              ) : (
                <></>
              )}
              {agenda.otherProcedure && isAdmin ? (
                <OtherProcedureBlock
                  procedure={agenda.otherProcedure}
                  onChange={false}
                  static={true}
                />
              ) : (
                <></>
              )}
              {agenda.discount ? (
                <DiscountBlock
                  amount={agenda.discount}
                  onChange={false}
                  static={true}
                />
              ) : (
                <></>
              )}
              {isAdmin ? (
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
              ) : (
                <></>
              )}

              {agenda.comment ? (
                <CommentCardBlock comment={agenda.comment} />
              ) : (
                <></>
              )}
              <AgendaIdBlock agenda={agenda} />
            </View>
          </ScrollView>

          {/* <View style={{ flex: 1 }} /> */}
          {isAdmin ? (
            <ButtonBlock
              title={text.edit}
              action={() => {
                dispatch(updateAgenda(agenda))
                navigation.navigate('CreateAgendaScreen', {
                  agenda: agenda,
                })
              }}
              buttonStyles={{
                marginBottom: width * 0.05,
                backgroundColor: '#00000000',
              }}
              titleStyles={{ color: colors.card1 }}
            />
          ) : (
            <></>
          )}

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
