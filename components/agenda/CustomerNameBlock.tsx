import { useNavigation } from '@react-navigation/native'
import {
  Dimensions,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import text from '../../constants/text'
import colors from '../../constants/colors'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import { Agenda, Customer } from '../../constants/interfaces'
import RenderMessengerIcon from '../customers/RenderMessengerIcon'
import {
  OpenMessenger,
  ReturnCustomerMessenger,
  ReturnPhoneString,
} from '../../functions/functions'
import { Ionicons } from '@expo/vector-icons'
import CommentBlock from '../customers/CommentBlock'

const width = Dimensions.get('screen').width

export default function CustomerNameBlock(props: {
  name: string
  openHistory: any
}) {
  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <View style={styles.nameBlock}>
          <Text style={styles.name}>{props.name}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={props.openHistory}
        >
          <Ionicons
            name="open-outline"
            size={width * 0.05}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '92%',
    // padding: width * 0.02,
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: width * 0.03,
    marginVertical: width * 0.02,
    overflow: 'hidden',
    padding: width * 0.02,
  },
  rowBetween: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  nameBlock: {
    borderRadius: width * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card2,
    paddingVertical: width * 0.01,
    paddingHorizontal: width * 0.04,
  },
  name: {
    fontSize: width * 0.04,
    color: colors.card2Title,
  },
  button: {
    height: width * 0.07,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
