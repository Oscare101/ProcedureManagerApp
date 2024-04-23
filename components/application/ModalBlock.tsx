import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import colors from '../../constants/colors'
import globalStyles from '../../constants/globalStyles'
import text from '../../constants/text'
import { useNavigation } from '@react-navigation/native'

const width = Dimensions.get('screen').width

export default function ModalBlock(props: {
  modal: boolean
  closeModal: any
  title: string
  text: string
}) {
  const navigation: any = useNavigation()
  return (
    <Modal transparent style={{ flex: 1 }} visible={props.modal}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000060',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: colors.white,
            width: width * 0.8,
            padding: width * 0.05,
            borderRadius: width * 0.05,
          }}
        >
          <Text style={{ fontSize: width * 0.07, color: colors.text }}>
            {props.title}
          </Text>
          <Text
            style={{
              fontSize: width * 0.05,
              color: colors.comment,
              marginVertical: width * 0.05,
            }}
          >
            {props.text}
          </Text>
          <View style={globalStyles.rowBetween}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={props.closeModal}
              style={styles.button}
            >
              <Text style={[styles.buttonTitle, { color: colors.text }]}>
                {text.Cancel}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                props.closeModal()
                navigation.goBack()
              }}
              style={styles.button}
            >
              <Text
                style={[styles.buttonTitle, { color: colors.lightErrorTitle }]}
              >
                {text.Exit}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: width * 0.1,
  },
  buttonTitle: {
    fontSize: width * 0.05,
  },
})
