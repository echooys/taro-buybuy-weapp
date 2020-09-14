import React from 'react'
import { Image, ScrollView, Text, View } from '@tarojs/components'
import Page from '_/components/Page'
import Icon from '_/components/Icon'
import { toRouter } from '_/utils/common'

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
              <View
                className='created-order--address'
                onClick={() => toRouter('/pages/personal/address/index')}
              >
                <Image
                  className='created-order--address_icon'
                  src={'../../../assets/common/address-icon.png'}
                />
                <View className='created-order--address_content'>
                  <Text className='created-order--address_content_default'>
                    您还没有填写收货地址
                  </Text>
                  <Text className='created-order--address_content_select'>
                    李雪峰 15223150743
                  </Text>
                </View>
                <View className='created-order--address-more'>
                  <Text className='created-order--address-more-text'>
                    去填写
                  </Text>
                  <Icon name='more' size={14} color='#777' />
                </View>
              </View>
              <View className='created-order--details'>
                <View className='created-order--title'>京东商品</View>
                <View className='created-order--product'>
                  <View className='created-order--product-image'>
                  </View>
                  <View className='created-order--product-content'>
                    <Text className='created-order--product-title'>果MacBook Pro
                      13.3英寸2.0GHz四核16G内存 512G/1T固态苹果笔记本电脑…</Text>
                    <View className='created-order--product-more'>
                      <Text className='created-order--product-price color'>￥8999.00</Text>
                      <Text className='created-order--product-num'>x1</Text>
                    </View>
                  </View>
                </View>
                <View className='created-order--item'>
                  <Text className='created-order--item-label'>商品价格</Text>
                  <View className='created-order--item-right'>
                    <Text style={{ color: '#777' }}>￥8900.00</Text>
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
