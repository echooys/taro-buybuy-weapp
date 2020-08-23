import React, { Component } from 'react'
import { ScrollView, View, Text } from '@tarojs/components'

import TabBar from '_/components/TabBar'
import Icon from '_/components/Icon'
import Page from '_/components/Page'
import CustomNavBar from '_/components/CustomNavBar'

import './index.less'

interface HomeProps {
}

interface HomeState {
}

class MinePage extends Component<HomeProps, HomeState> {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render (): JSX.Element {
    return (
      <Page>
        <CustomNavBar title='我的' backgroundColor='rgba(0,0,0,0)'>
        </CustomNavBar>
        <View className='page-view'>
          <ScrollView className='page-scroll' scrollY>
            <View className='mine-user-wrapper'>

            </View>
            <View className='user-member-wrapper'>

            </View>
            <View className='struct-wrapper'>
              <View className='struct-item'>
                <View className='struct-item__content'>
                  <View className='struct-item__left'>
                    <Icon name='xiugaidingdan' size='18' color='#FA6400' />
                    <Text className='struct-item__text'>我的订单</Text>
                  </View>
                  <View className='struct-item__right'>
                    <Icon name='more' size='14' color='#E6E6E6' />
                  </View>
                </View>
              </View>
              <View className='struct-item'>
                <View className='struct-item__content'>
                  <View className='struct-item__left'>
                    <Icon name='yongjinguanli' size='18' color='#FA6400' />
                    <Text className='struct-item__text'>我的佣金</Text>
                  </View>
                  <View className='struct-item__right'>
                    <Text className='struct-item__money'>￥2345.00元</Text>
                    <Icon name='more' size='14' color='#E6E6E6' />
                  </View>
                </View>
              </View>
              <View className='struct-item'>
                <View className='struct-item__content'>
                  <View className='struct-item__left'>
                    <Icon name='youhuiquan' size='16' color='#FA6400' />
                    <Text className='struct-item__text'>我的神卷</Text>
                  </View>
                  <View className='struct-item__right'>
                    <Text className='struct-item__money'>当前可享65神卷</Text>
                    <Icon name='more' size='14' color='#E6E6E6' />
                  </View>
                </View>
              </View>
              <View className='struct-item'>
                <View className='struct-item__content'>
                  <View className='struct-item__left'>
                    <Icon name='shezhi' size='18' color='#FA6400' />
                    <Text className='struct-item__text'>帮助中心</Text>
                  </View>
                  <View className='struct-item__right'>
                    <Icon name='more' size='14' color='#E6E6E6' />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <TabBar active={2} />
      </Page>
    )
  }
}

export default MinePage
