import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import text from '../../constants/text'
import colors from '../../constants/colors'
import { Agenda, Master } from '../../constants/interfaces'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'

const width = Dimensions.get('screen').width

export default function ChosenMasterItem(props: {
  action: any
  masterId: Master['id']
  static?: boolean
}) {
  const masters: Master[] = useSelector((state: RootState) => state.masters)
  const master = masters.find((m: Master) => m.id === props.masterId)
  return (
    <View style={[styles.card, styles.rowBetween]}>
      <View
        style={[
          styles.nameBlock,
          {
            backgroundColor: master?.color,
          },
        ]}
      >
        <Text style={styles.name}>{master?.name}</Text>
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
  )
}

const styles = StyleSheet.create({
  card: {
    width: '92%',
    padding: width * 0.02,
    backgroundColor: colors.white,
    marginTop: width * 0.02,
    borderRadius: width * 0.03,
    height: width * 0.12,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameBlock: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderRadius: width * 0.02,
  },
  name: { fontSize: width * 0.05, color: colors.white },
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
})
