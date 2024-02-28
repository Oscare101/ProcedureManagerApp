import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import text from '../../constants/text'
import colors from '../../constants/colors'
import { Agenda, Master, Procedure } from '../../constants/interfaces'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'

const width = Dimensions.get('screen').width

export default function ChosenProceduresItem(props: { action: any }) {
  const agenda: Agenda = useSelector((state: RootState) => state.agenda)
  const procedures: Procedure[] = useSelector(
    (state: RootState) => state.procedures
  )

  function RenderProcedureItem({ item }: any) {
    return (
      <View style={styles.procedureItem}>
        <Text style={styles.procedureTitle}>
          {procedures.find((p: Procedure) => p.id === item)?.short}
        </Text>
      </View>
    )
  }
  return (
    <View style={[styles.card, styles.rowBetween]}>
      <View style={styles.proceduresBlock}>
        {agenda.procedures.map((item: any, index: number) => (
          <RenderProcedureItem key={index} item={item} />
        ))}
      </View>

      <View style={styles.line} />
      <View style={styles.editBlock}>
        <Text>{text.duration}</Text>
        {/* <Text>{CalculateProceduresDurstion(agenda.procedures)}</Text> */}
        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.8}
          onPress={props.action}
        >
          <Text style={styles.editButtonTitle}>{text.rechoose}</Text>
        </TouchableOpacity>
      </View>
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
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line: { height: '100%', width: 1, backgroundColor: colors.comment },
  editBlock: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: width * 0.02,
  },
  editButton: {
    paddingVertical: width * 0.01,
    paddingHorizontal: width * 0.02,
    borderRadius: width * 0.02,
    backgroundColor: colors.bg,
  },
  editButtonTitle: {
    fontSize: width * 0.04,
    color: colors.text,
  },
  proceduresBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    height: '100%',
  },
  procedureItem: {
    padding: width * 0.01,
    borderRadius: width * 0.02,
    backgroundColor: colors.card2,
    margin: width * 0.005,
  },
  procedureTitle: {
    fontSize: width * 0.035,
    color: colors.card2Title,
  },
})
