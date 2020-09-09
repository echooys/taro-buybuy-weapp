import React from 'react'
import { ScrollView, View } from '@tarojs/components'
import Page from '_/components/Page'

class Coupon extends React.Component<any, any> {
  constructor (props) {
    super(props)
    this.state = {
      couponList: []
    }
  }

  render () {
    return (
      <Page>
        <View className='page-view'>
          <ScrollView className='page-scroll' scrollY>
          </ScrollView>
        </View>
      </Page>
    )
  }
}

export default Coupon
