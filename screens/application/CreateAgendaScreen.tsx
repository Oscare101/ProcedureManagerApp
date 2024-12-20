import {
  BackHandler,
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import { Agenda, Master } from '../../constants/interfaces'
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
import {
  CalculateIsEnoughtTimeForProcedure,
  GetDateFormateFromString,
  IsToday,
  IsTomorrow,
} from '../../functions/functions'
import { CreateAgenda, DeleteAgenda } from '../../functions/actions'
import rules from '../../constants/rules'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import PrepaymentBlock from '../../components/agenda/PrepaymentBlock'
import OtherPersonBlock from '../../components/agenda/OtherPersonBlock'
import OtherProcedureBlock from '../../components/agenda/OtherProcedureBlock'
import ModalBlock from '../../components/application/ModalBlock'
import { useRoute } from '@react-navigation/native'
import DiscountBlock from '../../components/agenda/DiscountBlock'
import { Ionicons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard'
import Toast from 'react-native-toast-message'

const width = Dimensions.get('screen').width

export default function CreateAgendaScreen({ navigation, route }: any) {
  const agenda: Agenda = useSelector((state: RootState) => state.agenda)
  const schedule: any = useSelector((state: RootState) => state.schedule)
  const agendas: Agenda[] = useSelector((state: RootState) => state.agendas)
  const masters: Master[] = useSelector((state: RootState) => state.masters)

  const dispatch = useDispatch()
  const [modalData, setModalData] = useState<string>('timePicker')
  const [loading, setLoading] = useState<boolean>(false)
  const [isEnoughtTime, setIsEnoughtTime] = useState<boolean>(true)
  const [exitModal, setExitModal] = useState<boolean>(false)

  // prevent go back
  useEffect(() => {
    const backAction = () => {
      if (
        (agenda.customerId || agenda.procedures.length) &&
        navigation.isFocused()
      ) {
        setExitModal(true)
        return true
      }
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove()
  }, [agenda])

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => [width * 1.3], [])
  const onPresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const onDismisModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, [])

  async function CreateAgendaFunc() {
    const discountString: string = agenda.discount.replace(/^\D+/g, '')
      ? agenda.discount
      : ''

    setLoading(true)
    const agendaData: Agenda = {
      ...agenda,
      created: new Date().getTime(),
      lastUpdated: new Date().getTime(),
      id: new Date().getTime().toString(),
      discount: discountString,
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
      !schedule['year-' + +agenda.date.split('.')[2]]?.[
        `month-${+agenda.date.split('.')[1]}`
      ]?.['date-' + +agenda.date.split('.')[0]]?.includes(agenda.masterId)
    ) {
      dispatch(updateAgenda({ ...agenda, masterId: '' }))
    }
    const isEnoughtTime = CalculateIsEnoughtTimeForProcedure(agenda, agendas)
    setIsEnoughtTime(isEnoughtTime)
  }, [
    agenda.date,
    agenda.time,
    agenda.masterId,
    agenda.duration,
    agendas,
    schedule,
  ])

  return (
    <BottomSheetModalProvider>
      <View style={globalStyles.container}>
        <Header
          title={
            route.params?.agenda ? text.editProcedure : text.createProcedure
          }
          action={
            agenda.customerId || agenda.procedures.length ? 'modal' : 'back'
          }
          onModal={() => {
            setExitModal(true)
          }}
        />
        <ScrollView
          style={{ flex: 1, width: '100%' }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <DateTimeBlock
              onModal={() => {
                setModalData('timePicker')
                onPresentModal()
              }}
              date={GetDateFormateFromString(agenda.date).getTime()}
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
                onChatPhraseEnabled={
                  !!(
                    agenda.date &&
                    agenda.masterId &&
                    agenda.time &&
                    agenda.customerId &&
                    agenda.procedures.length > 0 &&
                    isEnoughtTime
                  )
                }
                onChatPhrase={async () => {
                  const phrase = IsToday(agenda.date)
                    ? text.chatPhraseToday
                        .replace('time', agenda.time)
                        .replace(
                          'master',
                          masters.find((m: Master) => m.id === agenda.masterId)!
                            .name
                        )
                    : IsTomorrow(agenda.date)
                    ? text.chatPhraseTomorrow
                        .replace('time', agenda.time)
                        .replace(
                          'master',
                          masters.find((m: Master) => m.id === agenda.masterId)!
                            .name
                        )
                    : text.chatPhrase
                        .replace(
                          'date',
                          `${agenda.date.split('.')[0]}.${
                            agenda.date.split('.')[1]
                          }`
                        )
                        .replace('time', agenda.time)
                        .replace(
                          'master',
                          masters.find((m: Master) => m.id === agenda.masterId)!
                            .name
                        )
                  await Clipboard.setStringAsync(phrase)
                  Toast.show({
                    type: 'ToastMessage',
                    props: {
                      title: phrase,
                    },
                    position: 'bottom',
                  })
                }}
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

            <PrepaymentBlock
              amount={agenda.prepayment}
              onChange={(num: string) =>
                dispatch(updateAgenda({ ...agenda, prepayment: num }))
              }
            />
            <OtherPersonBlock
              name={agenda.otherPerson}
              onChange={(name: string) =>
                dispatch(updateAgenda({ ...agenda, otherPerson: name }))
              }
            />
            <OtherProcedureBlock
              procedure={agenda.otherProcedure}
              onChange={(newProcedure: string) =>
                dispatch(
                  updateAgenda({ ...agenda, otherProcedure: newProcedure })
                )
              }
            />
            <DiscountBlock
              amount={agenda.discount || ''}
              onChange={(num: string) =>
                dispatch(updateAgenda({ ...agenda, discount: num }))
              }
            />

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
          title={
            !isEnoughtTime
              ? text.cantCreateAgendaBeacauseOfTime
              : route.params?.agenda
              ? text.save
              : text.create
          }
          action={route.params?.agenda ? UpdateAgendaFunc : CreateAgendaFunc}
          buttonStyles={{
            marginBottom: width * 0.05,
            alignSelf: 'center',
            backgroundColor: !isEnoughtTime
              ? colors.lightErrorBg
              : colors.card1,
          }}
          titleStyles={{
            fontSize: !isEnoughtTime ? width * 0.035 : width * 0.06,
            color: !isEnoughtTime ? colors.lightErrorTitle : colors.card1Title,
            fontWeight: !isEnoughtTime ? '400' : '300',
          }}
          loading={loading}
        />
      </View>
      <ModalBlock
        modal={exitModal}
        closeModal={() => {
          setExitModal(false)
        }}
        title={text.Exit}
        text={text.UnsavedChanges}
      />
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
