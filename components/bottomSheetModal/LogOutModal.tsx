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
import { LogOut } from '../../functions/actions'
import { useNavigation } from '@react-navigation/native'

const width = Dimensions.get('screen').width

export default function LogOutModal(props: { onClose: any }) {
  const navigation: any = useNavigation()

  async function LogOutFunc() {
    await LogOut()
    navigation.reset({
      index: 0,
      routes: [{ name: 'LaunchScreen' }],
    })
  }

  return (
    <>
      <Text style={styles.title}>{text.DoYouWantToLogOut}</Text>
      <ButtonBlock
        title={text.LogOut}
        action={LogOutFunc}
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
    marginBottom: width * 0.02,
  },
})
