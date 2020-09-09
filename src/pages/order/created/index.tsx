import React from 'react'
import Page from '_/components/Page'
import Icon from '_/components/Icon'
import { ScrollView, Text, View } from '@tarojs/components'

import './index.less'

class OrderCreated extends React.Component<any, any> {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <Page>
        <View className='page-view'>
          <ScrollView className='page-scroll' scrollY>
            <View className='created-order--content'>
              <View className='created-order--address'></View>
              <View className='created-order--details'>
                <View className='created-order--title'>京东商品</View>
                <View className='created-order--product'>
                </View>
                <View className='created-order--item'>
                  <Text className='created-order--item-label'>商品价格</Text>
                  <View className='created-order--item-right'>
                    <Text>￥8900.00</Text>
                  </View>
                </View>
                <View className='created-order--item'>
                  <Text className='created-order--item-label'>优惠劵</Text>
                  <View className='created-order--item-right'>
                    <Text className='color'>89神劵</Text>
                    <Icon name='more' size={14} color='#666' />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View className='order-submit'>
          <View className='order-submit--text'>
            合计：
            <Text className='color'>￥</Text>
            <Text className='color' style={{ fontSize: '18px' }}>7900.</Text>
            <Text className='color'>00</Text>
          </View>
          <View className='order-submit--btn'>提交订单</View>
        </View>
      </Page>
    )
  }

}

export default OrderCreated
