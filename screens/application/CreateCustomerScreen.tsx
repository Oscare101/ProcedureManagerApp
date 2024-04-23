import {
  BackHandler,
  Dimensions,
  FlatList,
  Keyboard,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import globalStyles from '../../constants/globalStyles'
import Header from '../../components/application/Header'
import text from '../../constants/text'
import colors from '../../constants/colors'
import InputBlock from '../../components/application/InputBlock'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import BottomModalBlock from '../../components/bottomSheetModal/BottomModalBlock'
import { Ionicons } from '@expo/vector-icons'
import { Customer } from '../../constants/interfaces'
import RenderMessengerIcon from '../../components/customers/RenderMessengerIcon'
import ButtonBlock from '../../components/application/ButtonBlock'
import { CreateCustomer, UpdateCustomer } from '../../functions/actions'
import { auth } from '../../firebase'
import rules from '../../constants/rules'
import {
  OpenLink,
  OpenMessenger,
  ReturnPhoneString,
} from '../../functions/functions'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux'
import ModalBlock from '../../components/application/ModalBlock'

const width = Dimensions.get('screen').width

export default function CreateCustomerScreen({ navigation, route }: any) {
  const customers = useSelector((state: RootState) => state.customers)

  const [name, setName] = useState<string>(route.params?.customer.name || '')
  const [phone, setPhone] = useState<string>(route.params?.customer.phone || '')
  const [messenger, setMessenger] = useState<Customer['messenger'] | ''>(
    route.params?.customer.messenger || ''
  )
  const [link, setLink] = useState<string>(route.params?.customer.link || '')
  const [comment, setComment] = useState<string>(
    route.params?.customer.comment || ''
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [warning, setWarning] = useState<string>('')
  const [exitModal, setExitModal] = useState<boolean>(false)

  // prevent go back
  useEffect(() => {
    const backAction = () => {
      if (name || phone || messenger || link) {
        setExitModal(true)
        return true
      }
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove()
  }, [name, phone, messenger, link])

  async function CreateCustomerFunc(back: boolean) {
    if (
      messenger &&
      name &&
      ((!phone && link) || ClearPhoneString(phone).length === 13) &&
      auth.currentUser &&
      auth.currentUser.email
    ) {
      setLoading(true)
      const customer: Customer = {
        name: name,
        phone: ClearPhoneString(phone),
        messenger: messenger,
        link: link,
        comment: comment,
        id: new Date().getTime().toString(),
      }
      await CreateCustomer(customer)
      if (back) {
        navigation.goBack()
      } else {
        setLoading(false)
        setName('')
        setPhone('')
        setMessenger('')
        setLink('')
      }
    }
  }

  async function UpdateCustomerFunc(back: boolean) {
    if (
      messenger &&
      name &&
      ((!phone && link) || ClearPhoneString(phone).length === 13) &&
      auth.currentUser &&
      auth.currentUser.email &&
      route.params.customer
    ) {
      setLoading(true)
      const customer: Customer = {
        name: name,
        phone: ClearPhoneString(phone),
        messenger: messenger,
        link: link,
        comment: comment,
        id: route.params.customer.id,
      }
      await UpdateCustomer(customer)

      navigation.goBack()
    }
  }

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => [width * 0.6], [])
  const onPresentModal = useCallback(() => {
    Keyboard.dismiss()
    bottomSheetModalRef.current?.present()
  }, [])
  const onDismisModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, [])

  function ClearPhoneString(phone: string) {
    return phone.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '')
  }

  const data = [
    {
      title: text.name,
      value: name,
      setValue: (value: string) => setName(value),
      icon: 'person-outline',
      placeHolder: text.name,
    },
    {
      title: text.phone,
      value: ReturnPhoneString(phone),
      setValue: (value: string) => {
        const valueNumber = ClearPhoneString(value)

        if (valueNumber.length > 13) return false
        const formattedPhoneNumber = valueNumber.replace(/[^0-9]/g, '')

        if (
          formattedPhoneNumber.length > 0 &&
          formattedPhoneNumber[0] !== '+'
        ) {
          setPhone('+' + formattedPhoneNumber)
        } else {
          setPhone(formattedPhoneNumber)
        }
      },
      icon: 'call-outline',
      placeHolder: text.phone,
      keyboard: 'numeric',
    },
    {
      modal: true,
      title: text.messenger,
      placeHolder: text.messenger,
    },
    {
      title: text.link,
      value: link,
      setValue: (value: string) => setLink(value),
      icon: 'link-outline',
      placeHolder: text.link,
      disable: messenger === 'viber' || messenger === 'whatsapp' || !messenger,
      checkButton: true,
    },
    {
      title: text.comment,
      value: comment,
      setValue: (value: string) => setComment(value),
      icon: 'chatbubble-ellipses-outline',
      placeHolder: text.comment,
    },
  ]

  useEffect(() => {
    if (messenger === 'viber' || messenger === 'whatsapp') {
      setLink('')
    }
  }, [messenger])

  useEffect(() => {
    if (
      customers.find((c: Customer) => c.link === link) &&
      route.params?.customer.link !== link &&
      link
    ) {
      setWarning(text.alreadyUsedLink)
    } else if (
      customers.find((c: Customer) => c.phone === ClearPhoneString(phone)) &&
      route.params?.customer.phone !== phone &&
      phone
    ) {
      setWarning(text.alreadyUsedPhone)
    } else {
      setWarning('')
    }
  }, [phone, link])

  function RenderItem({ item }: any) {
    return (
      <View style={[styles.card, { opacity: item.disable ? 0.5 : 1 }]}>
        <View style={styles.rowBetween}>
          <Text style={styles.title}>{item.title}</Text>
          {item.checkButton && (link || (phone && messenger === 'viber')) ? (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.checkButton}
              onPress={() => {
                if (messenger === 'viber' && phone) {
                  Linking.openURL(
                    `viber://chat?number=${phone.replace('+', '')}`
                  )
                } else if (messenger !== '') {
                  OpenLink(link, messenger)
                }
              }}
            >
              <Text style={styles.checkButtonTitle}>{text.check}</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>

        {item.modal ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPresentModal}
            style={styles.messengerButton}
          >
            {messenger ? <RenderMessengerIcon messenger={messenger} /> : <></>}
            <Text
              style={[
                styles.messengerTitle,
                {
                  color: messenger ? colors.text : colors.comment,
                  marginLeft: messenger ? width * 0.03 : 0,
                },
              ]}
            >
              {messenger || item.placeHolder}
            </Text>
            <Ionicons
              name={'chevron-down'}
              size={width * 0.04}
              color={colors.text}
            />
          </TouchableOpacity>
        ) : (
          <InputBlock
            value={item.value}
            setValue={(value: string) => item.setValue(value)}
            icon={item.icon}
            type="text"
            placeHolder={item.placeHolder}
            styles={{
              backgroundColor: colors.bg,
              width: '100%',
              borderRadius: width * 0.02,
            }}
            disable={item.disable}
            keyboard={item.keyboard}
          />
        )}
      </View>
    )
  }

  return (
    <BottomSheetModalProvider>
      <View style={globalStyles.container}>
        <Header
          action={name || phone || messenger || link ? 'modal' : 'back'}
          title={
            route.params?.customer ? text.editCustomer : text.createCustomer
          }
          onModal={() => {
            setExitModal(true)
          }}
        />
        <ScrollView
          style={{ width: '100%', flex: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          <FlatList
            keyboardShouldPersistTaps="always"
            scrollEnabled={false}
            style={{ width: '100%' }}
            data={data}
            renderItem={RenderItem}
            ListFooterComponent={() => (
              <View style={{ height: width * 0.05 }} />
            )}
          />
        </ScrollView>
        {warning ? (
          <View style={styles.warningBlock}>
            <Text style={styles.warningTitle}>{warning}</Text>
          </View>
        ) : (
          <></>
        )}

        <ButtonBlock
          title={route.params?.customer ? text.save : text.create}
          disable={
            !(
              messenger &&
              name &&
              ((!phone && link) || ClearPhoneString(phone).length === 13)
            )
          }
          action={() => {
            if (route.params?.customer) {
              UpdateCustomerFunc(true)
            } else {
              CreateCustomerFunc(true)
            }
          }}
          onLong={() => {
            CreateCustomerFunc(false)
          }}
          buttonStyles={{ marginBottom: width * 0.05 }}
          loading={loading}
        />
      </View>
      <ModalBlock
        modal={exitModal}
        closeModal={() => {
          setExitModal(false)
        }}
        title={text.Exit}
        text={text.UnsavedChanges}
      />
      <BottomModalBlock
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        dismiss={onDismisModal}
        content="messengerModal"
        data={{ date: messenger }}
        setData={(newDate: Customer['messenger']) => {
          setMessenger(newDate)
          onDismisModal()
        }}
      />
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '92%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: width * 0.02,
    borderRadius: width * 0.03,
    backgroundColor: colors.white,
    marginTop: width * 0.02,
    alignSelf: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontSize: width * 0.04,
    color: colors.comment,
    marginBottom: width * 0.02,
  },
  checkButton: {
    marginBottom: width * 0.02,
  },
  checkButtonTitle: { fontSize: width * 0.04, color: colors.accent },
  messengerButton: {
    width: '100%',
    backgroundColor: colors.bg,
    height: width * 0.12,
    alignSelf: 'center',
    borderRadius: width * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.03,
  },
  messengerTitle: { fontSize: width * 0.05, flex: 1 },
  warningBlock: {
    backgroundColor: colors.lightWarningBg,
    padding: width * 0.01,
    borderRadius: width * 0.01,
    maxWidth: '92%',
    marginVertical: width * 0.02,
  },
  warningTitle: {
    fontSize: width * 0.04,
    color: colors.lightWarningTitle,
  },
})
