import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import text from '../../constants/text'
import { Agenda, Procedure } from '../../constants/interfaces'
import colors from '../../constants/colors'
import RenderProcedureItem from './RenderProcedureItem'
import { RootState } from '../../redux'
import { useDispatch, useSelector } from 'react-redux'
import { updateAgenda } from '../../redux/agenda'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

const width = Dimensions.get('screen').width

export default function ProceduresCard(props: { procedures: Procedure[] }) {
  const agenda: Agenda = useSelector((state: RootState) => state.agenda)
  const dispatch = useDispatch()

  const [open, setOpen] = useState<boolean>(false)

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
      <TouchableOpacity
        style={styles.cardHeader}
        activeOpacity={0.8}
        onPress={() => setOpen(!open)}
      >
        <Text style={styles.cardTitle}>{text[props.procedures[0].type]}</Text>
        {props.procedures.filter((p: Procedure) =>
          agenda.procedures.includes(p.id)
        ).length ? (
          <View style={styles.amountBlock}>
            <Text style={styles.amountTitle}>
              {
                props.procedures.filter((p: Procedure) =>
                  agenda.procedures.includes(p.id)
                ).length
              }
            </Text>
          </View>
        ) : (
          <></>
        )}
        <View style={{ flex: 1 }} />

        <Ionicons
          name={open ? 'chevron-up' : 'chevron-down'}
          size={width * 0.05}
          color={colors.text}
        />
      </TouchableOpacity>
      {open ? (
        <>
          <View style={styles.line} />
          <FlatList
            style={{ paddingBottom: width * 0.02 }}
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
            initialNumToRender={props.procedures.length}
          />
        </>
      ) : (
        <></>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '92%',
    paddingHorizontal: width * 0.02,
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
    height: width * 0.12,
  },
  cardTitle: { fontSize: width * 0.04, color: colors.text },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.comment,
  },
  amountBlock: {
    height: '40%',
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: colors.card2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: width * 0.03,
  },
  amountTitle: {
    fontSize: width * 0.03,
    color: colors.card2Title,
  },
})
