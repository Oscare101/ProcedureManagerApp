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
import { updateAgenda } from '../../redux/agenda'
import { Agenda } from '../../constants/interfaces'
import { RootState } from '../../redux'
import PrepaymentBlock from '../../components/agenda/PrepaymentBlock'

const width = Dimensions.get('screen').width

export default function AgendaInfoScreen({ navigation, route }: any) {
  const agendas: Agenda[] = useSelector((state: RootState) => state.agendas)
  const agenda: Agenda = agendas.find(
    (a: Agenda) => a.id === route.params.agendaId
  ) as Agenda

  const dispatch = useDispatch()
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
          {/* TODO open chat + call client */}
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

          {agenda.comment ? (
            <>
              <Text style={styles.comment}>{text.comment}</Text>
              <Text style={styles.text}>{agenda.comment}</Text>
            </>
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
})
