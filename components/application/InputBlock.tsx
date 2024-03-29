import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import colors from '../../constants/colors'
import { useState } from 'react'

const width = Dimensions.get('screen').width

interface InputBlockProps {
  value: string
  setValue: any
  type: 'email' | 'password' | 'text' | 'number'
  placeHolder: string
  styles?: object
  icon?: keyof typeof Ionicons.glyphMap
  iconPosittion?: 'left' | 'right'
  disable?: boolean
  keyboard?: any
  textIcon?: any
}

export default function InputBlock(props: InputBlockProps) {
  const [hidden, setHidden] = useState<boolean>(props.type === 'password')

  return (
    <View
      style={[
        styles.inputBlock,
        props.styles,
        {
          flexDirection:
            props.iconPosittion === 'right' ? 'row-reverse' : 'row',
        },
      ]}
    >
      {props.icon ? (
        <Ionicons
          name={props.icon}
          size={width * 0.05}
          color={colors.text}
          style={{
            marginRight: props.iconPosittion === 'right' ? 0 : width * 0.03,
            marginLeft: props.iconPosittion === 'right' ? width * 0.03 : 0,
          }}
        />
      ) : (
        <></>
      )}
      {props.textIcon ? (
        <Text
          style={[
            styles.title,
            {
              marginRight: props.iconPosittion === 'right' ? 0 : width * 0.03,
              marginLeft: props.iconPosittion === 'right' ? width * 0.03 : 0,
            },
          ]}
        >
          {props.textIcon}
        </Text>
      ) : (
        <></>
      )}

      <TextInput
        value={props.value}
        onChangeText={(value: string) => props.setValue(value)}
        placeholder={props.placeHolder}
        style={styles.input}
        placeholderTextColor={colors.comment}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        secureTextEntry={hidden}
        editable={!props.disable}
        keyboardType={props.keyboard || 'default'}
      />
      {props.type === 'password' ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setHidden(!hidden)}
          style={styles.button}
        >
          <Ionicons
            name={hidden ? 'eye-off-outline' : 'eye-outline'}
            size={width * 0.05}
            color={colors.text}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  inputBlock: {
    width: '92%',
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: width * 0.03,
    paddingHorizontal: width * 0.03,
    height: width * 0.12,
    alignSelf: 'center',
  },
  input: {
    fontSize: width * 0.05,
    color: colors.text,
    flex: 1,
  },
  button: {
    height: width * 0.08,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: width * 0.05,
    color: colors.text,
  },
})
