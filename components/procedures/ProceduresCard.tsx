import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import text from '../../constants/text'
import { Agenda, Procedure } from '../../constants/interfaces'
import colors from '../../constants/colors'
import RenderProcedureItem from './RenderProcedureItem'
import { RootState } from '../../redux'
import { useDispatch, useSelector } from 'react-redux'
import { updateAgenda } from '../../redux/agenda'

const width = Dimensions.get('screen').width

export default function ProceduresCard(props: { procedures: Procedure[] }) {
  const agenda: Agenda = useSelector((state: RootState) => state.agenda)
  const dispatch = useDispatch()

  function ToggleProcedureFunc(procedureId: Procedure['id']) {
    if (agenda.procedures.includes(procedureId)) {
      let newProceduresArr = agenda.procedures
      newProceduresArr = newProceduresArr.filter(
        (p: Procedure['id']) => p !== procedureId
      )
      dispatch(
        updateAgenda({
          ...agenda,
          procedures: newProceduresArr,
        })
      )
    } else {
      dispatch(
        updateAgenda({
          ...agenda,
          procedures: [...agenda.procedures, procedureId],
        })
      )
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{text[props.procedures[0].type]}</Text>
      </View>
      <FlatList
        scrollEnabled={false}
        data={props.procedures}
        renderItem={({ item }) => (
          <RenderProcedureItem
            procedure={item}
            toggleProcedure={(value: Procedure['id']) =>
              ToggleProcedureFunc(value)
            }
            chosenProcedures={agenda.procedures}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '92%',
    padding: width * 0.02,
    backgroundColor: colors.white,
    marginTop: width * 0.02,
    borderRadius: width * 0.03,
    alignSelf: 'center',
  },
  cardHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: { fontSize: width * 0.04, color: colors.text },
})
