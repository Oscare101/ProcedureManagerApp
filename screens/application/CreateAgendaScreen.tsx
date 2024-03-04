import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import globalStyles from '../../constants/globalStyles'
import Header from '../../components/application/Header'
import text from '../../constants/text'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import colors from '../../constants/colors'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import BottomModalBlock from '../../components/bottomSheetModal/BottomModalBlock'
import { Agenda } from '../../constants/interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { updateAgenda } from '../../redux/agenda'
import ChosenCustomerItem from '../../components/agenda/ChosenCustomerItem'
import DateTimeBlock from '../../components/agenda/DateTimeBlock'
import EmptyItem from '../../components/agenda/EmptyItem'
import ChosenMasterItem from '../../components/agenda/ChosenMasterItem'
import InputBlock from '../../components/application/InputBlock'
import ChosenProceduresItem from '../../components/agenda/ChosenProceduresItem'
import ButtonBlock from '../../components/application/ButtonBlock'
import { CalculateIsEnoughtTimeForProcedure } from '../../functions/functions'
import { CreateAgenda, DeleteAgenda } from '../../functions/actions'
import rules from '../../constants/rules'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const width = Dimensions.get('screen').width

export default function CreateAgendaScreen({ navigation, route }: any) {
  const agenda: Agenda = useSelector((state: RootState) => state.agenda)
  const schedule: any = useSelector((state: RootState) => state.schedule)
  const agendas: Agenda[] = useSelector((state: RootState) => state.agendas)

  const dispatch = useDispatch()

  const [modalData, setModalData] = useState<string>('timePicker')
  const [loading, setLoading] = useState<boolean>(false)
  const [isEnoughtTime, setIsEnoughtTime] = useState<boolean>(true)

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => [width * 1.3], [])
  const onPresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const onDismisModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, [])

  async function CreateAgendaFunc() {
    setLoading(true)
    const agendaData: Agenda = {
      ...agenda,
      created: new Date().getTime(),
      lastUpdated: new Date().getTime(),
      id: new Date().getTime().toString(),
    }

    await CreateAgenda(agendaData)
    navigation.goBack()
  }

  async function UpdateAgendaFunc() {
    setLoading(true)
    await DeleteAgenda(route.params?.agenda)

    const agendaData: Agenda = {
      ...agenda,
      lastUpdated: new Date().getTime(),
    }
    await CreateAgenda(agendaData)
    navigation.goBack()
  }

  useEffect(() => {
    if (
      !schedule['year-' + new Date(agenda.date).getFullYear()]?.[
        `month-${new Date(agenda.date).getMonth() + 1}`
      ]?.['date-' + new Date(agenda.date).getDate()].includes(agenda.masterId)
    ) {
      dispatch(updateAgenda({ ...agenda, masterId: '' }))
    }
    const isEnoughtTime = CalculateIsEnoughtTimeForProcedure(agenda, agendas)
    setIsEnoughtTime(isEnoughtTime)
  }, [agenda.date, agenda.time, agenda.masterId, agenda.duration])

  return (
    <BottomSheetModalProvider>
      <View style={globalStyles.container}>
        <Header
          title={
            route.params?.agenda ? text.editProcedure : text.createProcedure
          }
          action="back"
        />
        <ScrollView
          style={{ flex: 1, width: '100%' }}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <DateTimeBlock
              onModal={() => {
                setModalData('timePicker')
                onPresentModal()
              }}
              date={agenda.date}
              time={agenda.time}
            />
            <Text style={styles.comment}>{text.customer}</Text>
            {agenda.customerId ? (
              <ChosenCustomerItem customerId={agenda.customerId} />
            ) : (
              <EmptyItem
                title={text.customer}
                action={() =>
                  navigation.navigate('CustomersScreen', {
                    withoutDrawer: true,
                  })
                }
              />
            )}
            <Text style={styles.comment}>{text.master}</Text>
            {agenda.masterId ? (
              <ChosenMasterItem
                action={() => {
                  setModalData('masterPicker')
                  onPresentModal()
                }}
                masterId={agenda.masterId}
              />
            ) : (
              <EmptyItem
                title={text.master}
                action={() => {
                  setModalData('masterPicker')
                  onPresentModal()
                }}
              />
            )}
            <Text style={styles.comment}>{text.procedure}</Text>
            {agenda.procedures.length ? (
              <ChosenProceduresItem
                action={() => {
                  navigation.navigate('ProceduresScreen')
                }}
                procedures={agenda.procedures}
                duration={agenda.duration}
              />
            ) : (
              <EmptyItem
                title={text.procedure}
                action={() => {
                  navigation.navigate('ProceduresScreen')
                }}
              />
            )}
            <View style={styles.line} />

            <View style={[styles.card, globalStyles.rowBetween]}>
              <Text style={styles.title}>{text.prepayment}</Text>
              <InputBlock
                value={agenda.prepayment}
                setValue={(value: string) => {
                  if (rules.amountRegrex.test(value.replace(',', '.'))) {
                    let num = ''
                    if (
                      value.replace(',', '.') === '0' ||
                      value.replace(',', '.') === '.'
                    ) {
                      num = ''
                    } else {
                      num = value.replace(',', '.')
                    }
                    console.log(num)

                    dispatch(updateAgenda({ ...agenda, prepayment: num }))
                  } else {
                    return false
                  }
                }}
                textIcon="₴"
                type="number"
                placeHolder={'0.00'}
                styles={{
                  backgroundColor: colors.bg,
                  width: '50%',
                  borderRadius: width * 0.02,
                }}
                keyboard={'numeric'}
              />
            </View>

            <View style={[styles.card, { marginBottom: width * 0.05 }]}>
              <Text style={[styles.title, { marginBottom: width * 0.02 }]}>
                {text.comment}
              </Text>

              <InputBlock
                value={agenda.comment}
                setValue={(value: string) =>
                  dispatch(updateAgenda({ ...agenda, comment: value }))
                }
                icon={'chatbubble-ellipses-outline'}
                type="text"
                placeHolder={text.comment}
                styles={{
                  backgroundColor: colors.bg,
                  width: '100%',
                  borderRadius: width * 0.02,
                }}
              />
            </View>
            <View style={{ flex: 1 }} />
            {!isEnoughtTime ? (
              <Text style={styles.error}>
                {text.cantCreateAgendaBeacauseOfTime}
              </Text>
            ) : (
              <></>
            )}
          </TouchableWithoutFeedback>
        </ScrollView>
        <ButtonBlock
          disable={
            !(
              agenda.time &&
              agenda.masterId &&
              agenda.customerId &&
              agenda.procedures.length &&
              !loading &&
              isEnoughtTime
            )
          }
          title={route.params?.agenda ? text.edit : text.create}
          action={route.params?.agenda ? UpdateAgendaFunc : CreateAgendaFunc}
          buttonStyles={{ marginBottom: width * 0.05, alignSelf: 'center' }}
          loading={loading}
        />
      </View>
      <BottomModalBlock
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        dismiss={onDismisModal}
        content={modalData}
        data={{ data: agenda.time }}
        setData={(newTime: string) =>
          dispatch(updateAgenda({ ...agenda, time: newTime }))
        }
      />
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  comment: {
    width: '92%',
    fontSize: width * 0.04,
    color: colors.comment,
    marginTop: width * 0.01,
    alignSelf: 'center',
  },
  card: {
    width: '92%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: width * 0.02,
    borderRadius: width * 0.03,
    backgroundColor: colors.white,
    marginTop: width * 0.02,
    alignSelf: 'center',
  },
  title: {
    fontSize: width * 0.04,
    color: colors.comment,
  },
  error: {
    fontSize: width * 0.04,
    color: colors.lightErrorTitle,
    marginTop: width * 0.03,
    alignSelf: 'center',
  },
  line: {
    width: '92%',
    height: width * 0.005,
    borderRadius: 10,
    backgroundColor: colors.comment,
    marginTop: width * 0.02,
    alignSelf: 'center',
  },
})
