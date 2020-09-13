import * as React from 'react'
import { ScrollView, View } from '@tarojs/components'
import Page from '_/components/Page'

import './index.less'

class Address extends React.Component<any, any> {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render (): JSX.Element {
    return (
      <Page>
        <View className='page-view'>
          <ScrollView className='page-scroll'>

          </ScrollView>
        </View>
        <View className='address-manager'>
          <View className='address-manager--submit'>
            添加收货地址
          </View>
        </View>
      </Page>
    )
  }
}

export default Address
