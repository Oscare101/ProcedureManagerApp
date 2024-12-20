import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import text from '../../constants/text'
import colors from '../../constants/colors'
import { Agenda, Procedure } from '../../constants/interfaces'
import { RootState } from '../../redux'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { updateAgenda } from '../../redux/agenda'

const width = Dimensions.get('screen').width

export default function ChosenProceduresItem(props: {
  action: any
  static?: boolean
  procedures: Procedure['id'][]
  duration: Agenda['duration']
  procedureString?: string
  onChatPhrase?: any
  onChatPhraseEnabled?: boolean
}) {
  const agenda: Agenda = useSelector((state: RootState) => state.agenda)
  const procedures: Procedure[] = useSelector(
    (state: RootState) => state.procedures
  )
  const dispatch = useDispatch()

  function SetProceduresDuration(margin: number) {
    if (agenda.duration + margin > 0) {
      dispatch(updateAgenda({ ...agenda, duration: agenda.duration + margin }))
    }
  }

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
      {props.static ? (
        <></>
      ) : (
        <>
          <TouchableOpacity
            style={{
              width: width * 0.12,
              height: '100%',
              backgroundColor: colors.bg,
              borderRadius: width * 0.03,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
            activeOpacity={0.8}
            onPress={props.onChatPhrase}
            disabled={!props.onChatPhraseEnabled}
          >
            <Ionicons
              name="chatbox-ellipses-outline"
              size={24}
              color={props.onChatPhraseEnabled ? colors.text : colors.comment}
            />
          </TouchableOpacity>
          <View style={[styles.line, { marginHorizontal: width * 0.02 }]} />
        </>
      )}
      <View style={styles.proceduresBlock}>
        {props.procedureString ? (
          <View style={styles.procedureItem}>
            <Text style={styles.procedureTitle}>{props.procedureString}</Text>
          </View>
        ) : (
          <>
            {props.procedures.map((item: any, index: number) => (
              <RenderProcedureItem key={index} item={item} />
            ))}
          </>
        )}
      </View>
      <View style={styles.line} />
      <View style={styles.editBlock}>
        {props.static ? (
          <></>
        ) : (
          <View style={styles.rowBetween}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                SetProceduresDuration(-5)
              }}
              style={styles.durationButton}
              disabled={props.static}
            >
              <Ionicons name="remove" size={width * 0.04} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                SetProceduresDuration(+5)
              }}
              style={styles.durationButton}
              disabled={props.static}
            >
              <Ionicons name="add" size={width * 0.04} color={colors.text} />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.durationBlock}>
          <Ionicons
            name="timer-outline"
            size={width * 0.04}
            color={colors.text}
          />
          <Text style={styles.durationTitle}>
            {Math.floor(props.duration / 60)}:
            {(props.duration % 60).toString().padStart(2, '0')}
          </Text>
        </View>
        {props.static ? (
          <></>
        ) : (
          <TouchableOpacity
            style={styles.editButton}
            activeOpacity={0.8}
            onPress={props.action}
            disabled={props.static}
          >
            <Text style={styles.editButtonTitle}>{text.rechoose}</Text>
          </TouchableOpacity>
        )}
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
    alignSelf: 'center',
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
    paddingVertical: width * 0.01,
    paddingHorizontal: width * 0.015,
    borderRadius: width * 0.02,
    backgroundColor: colors.card2,
    margin: width * 0.005,
  },
  procedureTitle: {
    fontSize: width * 0.035,
    color: colors.card2Title,
  },
  durationButton: {
    width: width * 0.07,
    height: width * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
    marginHorizontal: width * 0.01,
    borderRadius: width * 0.02,
  },
  durationBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationTitle: {
    fontSize: width * 0.04,
    color: colors.text,
    marginLeft: width * 0.02,
  },
})
