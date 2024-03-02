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
import { useDispatch } from 'react-redux'
import { updateAgenda } from '../../redux/agenda'

const width = Dimensions.get('screen').width

export default function AgendaInfoScreen({ navigation, route }: any) {
  const dispatch = useDispatch()
  return (
    <View style={globalStyles.container}>
      <Header title={text.agenda} action="back" />
      <DateTimeBlock
        date={route.params.agenda.date}
        time={route.params.agenda.time}
        static={true}
        onModal={false}
      />
      <Text style={styles.comment}>{text.customer}</Text>
      <ChosenCustomerItem
        customerId={route.params.agenda.customerId}
        static={true}
      />
      <Text style={styles.comment}>{text.master}</Text>
      <ChosenMasterItem
        action={false}
        static={true}
        masterId={route.params.agenda.masterId}
      />
      <Text style={styles.comment}>{text.procedure}</Text>
      <ChosenProceduresItem
        action={false}
        static={true}
        procedures={route.params.agenda.procedures}
        duration={route.params.agenda.duration}
      />
      {route.params.agenda.comment ? (
        <>
          <Text style={styles.comment}>{text.comment}</Text>
          <Text style={styles.text}>{route.params.agenda.comment}</Text>
        </>
      ) : (
        <></>
      )}
      <View style={{ flex: 1 }} />
      <ButtonBlock
        title={text.edit}
        action={() => {
          dispatch(updateAgenda(route.params.agenda))
          navigation.navigate('CreateAgendaScreen', {
            agenda: route.params.agenda,
          })
        }}
        buttonStyles={{ marginBottom: width * 0.05 }}
      />
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
