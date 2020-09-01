import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { ScrollView, View, Text, Progress, Image } from '@tarojs/components'
import TabBar from '_/components/TabBar'
import Icon from '_/components/Icon'
import Page from '_/components/Page'
import CustomNavBar from '_/components/CustomNavBar'
import { get } from '_/utils/storage'
import { setUserInfo, setUserCenter } from '_/store/actions/user'

import './index.less'

interface PageMineProps {
  getUserInfo: () => void,
  getUserCenter: (data: any) => void,
  user: any
}

@connect(({ user }) => ({
  user
}), (dispatch) => ({
  getUserInfo () {
    dispatch(setUserInfo())
  },
  getUserCenter (data) {
    dispatch(setUserCenter(data))
  }
}))
class MinePage extends Component<PageMineProps, any> {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount (): void {
    if (get('token')) {
      this.props.getUserInfo()
    }
  }

  componentDidShow () {
    if (!get('token')) {
      Taro.getSetting({}).then(res => {
        if (res.authSetting['scope.userInfo']) {
          this.props.getUserInfo()
          Taro.getUserInfo().then(data => {
            this.props.getUserCenter(data)
          })
        } else {
          //TODO-- 跳转登陆
          Taro.navigateTo({ url: '/pages/auth/index' }).finally()
        }
      })
    } else {
      this.props.getUserInfo()
      Taro.getUserInfo().then(data => {
        this.props.getUserCenter(data)
      })
    }
  }

  render (): JSX.Element {
    const { user } = this.props
    console.log(user)
    return (
      <Page>
        <CustomNavBar title='我的' backgroundColor='rgba(0,0,0,0)'>
        </CustomNavBar>
        <View className='page-view'>
          <ScrollView className='page-scroll' scrollY>
            <View className='mine-user-wrapper'>
              <View className='mine-user--content'>
                <Image
                  src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2077888661,2651676535&fm=26&gp=0.jpg'
                  className='mine-user--avatar'
                  mode='aspectFit'
                />
                <Text className='mine-user--userName'>pandora1699</Text>
                <View className='mine-user--level'>
                  <View className='mine-user--level-vip v2' />
                  <Text className='mine-user--level-text'>创客：钻石会员</Text>
                </View>
              </View>
            </View>
            <View className='user-member-wrapper'>
              <View className='user-member--item'>
                <View className='user-member--item-header'>
                  <View className='user-member--item-left'>
                    <Icon name='huiyuan' size={20} className='user-member--item-icon' color='#FA6400' />
                    <Text className='user-member--item-title'>会员有效期</Text>
                  </View>
                  <Text className='user-member--item-time'>09.28</Text>
                </View>
                <Text className='user-member--item-desc'>还差3位分享升级下一等级-黄金会员</Text>
                <Progress
                  className='user-member--item-progress'
                  percent={50}
                  borderRadius={4}
                  color='#E6E6E6'
                  activeColor='#FA6400'
                  strokeWidth={8}
                />
              </View>
              <View className='user-member--item'>
                <View className='user-member--item-header'>
                  <View className='user-member--item-left'>
                    <Icon name='renwu' size={20} className='user-member--item-icon' color='#FA6400' />
                    <Text className='user-member--item-title'>任务</Text>
                  </View>
                </View>
                <Text className='user-member--item-desc'>当前进度，完成有效分享5人领取65神券</Text>
                <Progress
                  className='user-member--item-progress'
                  percent={50}
                  borderRadius={4}
                  color='#E6E6E6'
                  activeColor='#FA6400'
                  strokeWidth={8}
                />
              </View>
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
