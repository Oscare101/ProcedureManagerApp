import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import globalStyles from '../../constants/globalStyles'
import { useState } from 'react'
import colors from '../../constants/colors'
import InputBlock from '../../components/application/InputBlock'
import ButtonBlock from '../../components/application/ButtonBlock'
import rules from '../../constants/rules'
import text from '../../constants/text'

const width = Dimensions.get('screen').width

export default function LogInScreen({ navigation }: any) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  function LogInFunc() {
    if (!rules.emailCheck.test(email)) {
      setError(text.emailError)
    } else if (password.length < rules.passwordMinLengh) {
      setError(text.passwordError)
    }
  }

  return (
    <View style={globalStyles.container}>
      <View style={styles.topCard}>
        <Text style={styles.cardTitle}>{text.loginTitle}</Text>
      </View>
      <InputBlock
        value={email}
        setValue={(value: string) => {
          setError('')
          setEmail(value)
        }}
        type="email"
        placeHolder={text.emailPlaceHolder}
        styles={{ marginTop: width * 0.05 }}
        icon="mail-outline"
      />
      <InputBlock
        value={password}
        setValue={(value: string) => {
          setError('')
          setPassword(value)
        }}
        type="password"
        placeHolder={text.passwordPlaceHolder}
        styles={{ marginTop: width * 0.05 }}
        icon="lock-open-outline"
      />
      <ButtonBlock
        title={text.loginButton}
        action={LogInFunc}
        buttonStyles={{ marginTop: width * 0.05 }}
      />
      {error ? <Text style={styles.error}>{error}</Text> : <></>}
    </View>
  )
}

const styles = StyleSheet.create({
  topCard: {
    height: '30%',
    width: '100%',
    backgroundColor: colors.card2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '10%',
  },
  cardTitle: {
    fontSize: width * 0.1,
    color: colors.card2Title,
    fontWeight: '300',
  },
  error: {
    fontSize: width * 0.04,
    color: colors.lightErrorTitle,
    marginTop: width * 0.03,
  },
})
