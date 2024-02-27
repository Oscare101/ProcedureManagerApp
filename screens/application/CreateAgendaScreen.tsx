import { Dimensions, StyleSheet, Text, View } from 'react-native'
import globalStyles from '../../constants/globalStyles'
import Header from '../../components/application/Header'
import text from '../../constants/text'
import { useCallback, useMemo, useRef, useState } from 'react'
import colors from '../../constants/colors'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import BottomModalBlock from '../../components/bottomSheetModal/BottomModalBlock'
import { Agenda } from '../../constants/interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { updateAgenda } from '../../redux/agenda'
import ChosenCustomerItem from '../../components/agenda/ChosenCustomerItem'
import DateTimeBlock from '../../components/agenda/DateTimeBlock'
import EmptyItem from '../../components/agenda/EmptyItem'
import ChosenMasterItem from '../../components/agenda/ChosenMasterItem'

const width = Dimensions.get('screen').width

export default function CreateAgendaScreen({ navigation }: any) {
  const agenda: Agenda = useSelector((state: RootState) => state.agenda)
  const dispatch = useDispatch()

  const [modalData, setModalData] = useState<string>('timePicker')

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => [width * 1.3], [])
  const onPresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const onDismisModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, [])

  return (
    <BottomSheetModalProvider>
      <View style={globalStyles.center}>
        <Header title={text.createProcedure} action="back" />
        <DateTimeBlock
          onModal={() => {
            setModalData('timePicker')
            onPresentModal()
          }}
        />
        <Text style={styles.comment}>{text.customer}</Text>
        {agenda.customerId ? (
          <ChosenCustomerItem />
        ) : (
          <EmptyItem
            title={text.customer}
            action={() =>
              navigation.navigate('CustomersScreen', { withoutDrawer: true })
            }
          />
        )}
        <Text style={styles.comment}>{text.master}</Text>
        {agenda.masterId ? (
          <ChosenMasterItem
            action={() => {
              setModalData('masterPicker')
              onPresentModal()
            }}
          />
        ) : (
          <EmptyItem
            title={text.master}
            action={() => {
              setModalData('masterPicker')
              onPresentModal()
            }}
          />
        )}
      </View>
      <BottomModalBlock
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        dismiss={onDismisModal}
        content={modalData}
        data={{ data: agenda.time }}
        setData={(newTime: string) =>
          dispatch(updateAgenda({ ...agenda, time: newTime }))
        }
      />
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  comment: {
    width: '92%',
    fontSize: width * 0.04,
    color: colors.comment,
    marginVertical: width * 0.01,
  },
  //
  columnStart: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
})
