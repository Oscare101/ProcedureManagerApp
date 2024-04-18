import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { Agenda, Master } from '../../constants/interfaces'
import { auth } from '../../firebase'
import { useEffect, useState } from 'react'
import { getDatabase, onValue, ref } from 'firebase/database'
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from '../../constants/colors'
import text from '../../constants/text'
import { updateAgenda } from '../../redux/agenda'
import ButtonBlock from '../application/ButtonBlock'

const width = Dimensions.get('screen').width

export default function LogOutModal(props: { onClose: any }) {
  const masters: Master[] = useSelector((state: RootState) => state.masters)
  const agenda: Agenda = useSelector((state: RootState) => state.agenda)
  const dispatch = useDispatch()

  return (
    <>
      <Text style={styles.title}>{text.DoYouWantToLogOut}</Text>
      <ButtonBlock
        title={text.LogOut}
        action={props.onClose}
        buttonStyles={{
          marginTop: width * 0.02,
          backgroundColor: colors.lightErrorBg,
        }}
        titleStyles={{ color: colors.lightErrorTitle }}
      />
      <ButtonBlock
        title={text.Cancel}
        action={props.onClose}
        buttonStyles={{ marginTop: width * 0.02 }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: width * 0.05,
    color: colors.text,
  },
  button: {
    width: '95%',
    height: width * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: width * 0.02,
    marginBottom: width * 0.02,
    alignSelf: 'center',
  },
})
