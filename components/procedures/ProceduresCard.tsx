import {
  Animated,
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
import { useEffect, useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { CalculateProceduresDurstion } from '../../functions/functions'

const width = Dimensions.get('screen').width

export default function ProceduresCard(props: { procedures: Procedure[] }) {
  const agenda: Agenda = useSelector((state: RootState) => state.agenda)
  const procedures: Procedure[] = useSelector(
    (state: RootState) => state.procedures
  )
  const dispatch = useDispatch()
  const [open, setOpen] = useState<boolean>(false)

  const heightAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: open ? width * 0.08 * props.procedures.length + width * 0.02 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start()
  }, [open])

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
          duration: CalculateProceduresDurstion(newProceduresArr, procedures),
        })
      )
    } else {
      dispatch(
        updateAgenda({
          ...agenda,
          procedures: [...agenda.procedures, procedureId],
          duration: CalculateProceduresDurstion(
            [...agenda.procedures, procedureId],
            procedures
          ),
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

      <Animated.View style={{ height: heightAnim }}>
        <View style={styles.line} />
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ paddingBottom: width * 0.02 }}
          scrollEnabled={false}
          data={props.procedures.sort(
            (a: Procedure, b: Procedure) => a.priority - b.priority
          )}
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
      </Animated.View>
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
    overflow: 'hidden',
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
