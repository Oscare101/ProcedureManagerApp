import { Dimensions, StyleSheet, View } from 'react-native'
import colors from '../../constants/colors'
import InputBlock from '../application/InputBlock'
import text from '../../constants/text'

const width = Dimensions.get('screen').width

interface SearchBlockProps {
  value: string
  setValue: any
}

export default function SearchBlock(props: SearchBlockProps) {
  return (
    <View style={styles.card}>
      <View>
        <InputBlock
          type="text"
          placeHolder={text.searchClient}
          value={props.value}
          setValue={(value: string) => props.setValue(value)}
          icon="search-outline"
          iconPosittion="right"
          styles={{ backgroundColor: colors.bg, width: '100%' }}
        />
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
    borderRadius: width * 0.05,
  },
})
