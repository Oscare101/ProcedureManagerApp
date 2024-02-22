import { Dimensions, FlatList, View } from 'react-native'
import { RenderDrawerItem } from './RenderDrawerItem'
import colors from '../../constants/colors'

const width = Dimensions.get('screen').width

interface DrawerButtonsBlockProps {
  data: any[]
  state: any
  navigation: any
}

export default function DrawerButtonsBlock(props: DrawerButtonsBlockProps) {
  return (
    <FlatList
      scrollEnabled={false}
      style={{ width: '100%', marginTop: width * 0.05 }}
      data={props.data}
      renderItem={({ item }) => (
        <RenderDrawerItem
          item={item}
          index={props.state.index}
          routeNames={props.state.routeNames}
          navigation={(screen: string) => props.navigation(screen)}
        />
      )}
      ItemSeparatorComponent={() => (
        <View
          style={{
            width: '92%',
            height: 1,
            alignSelf: 'center',
            backgroundColor: colors.card2,
          }}
        />
      )}
    />
  )
}
