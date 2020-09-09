import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import PropTypes, { InferProps } from 'prop-types'
import { ScrollView, View, Text, Progress, Image } from '@tarojs/components'
import TabBar from '_/components/TabBar'
import Icon from '_/components/Icon'
import Page from '_/components/Page'
import CustomNavBar from '_/components/CustomNavBar'
import { get } from '_/utils/storage'
import { setUserInfo, setUserCenter } from '_/store/actions/user'
import getSysInfo, { SystemInfoFace } from '_/utils/getSysInfo'
import { toRouter } from '_/utils/common'

import './index.less'

interface PageMineProps {
  getUserInfo: (data: any) => void,
  getUserCenter: () => void,
  user: User
}

interface User {
  userInfo: {
    avatarUrl: string,
    nickName: string
  },
  userCenter: UserCenter
}

interface UserCenter {
  userLevel: {
    levelCode: string,
    expTime: string,
    description: string,
    progressBar: string
  },
  taskInfo: {
    name: string,
    description: string,
    progressBar: string
  },
  walletInfo: {
    money: number
  },
  couponInfo: {
    description: string
  }
}

interface PageMineState {
  levelCode: object,
  info: SystemInfoFace
}

@connect(({ user }) => ({
  user
}), (dispatch) => ({
  getUserInfo (data) {
    dispatch(setUserInfo(data))
  },
  getUserCenter () {
    dispatch(setUserCenter())
  }
}))
class MinePage extends Component<PageMineProps, PageMineState> {
  public static defaultProps: PageMineProps
  public static propTypes: InferProps<PageMineProps>

  constructor (props) {
    super(props)
    this.state = {
      levelCode: {
        sliver: '白银会员',
        gold: '黄金会员',
        diamond: '钻石会员'
      },
      info: getSysInfo()
    }
  }

  componentDidMount (): void {
    if (get('token')) {
      this.props.getUserCenter()
    }
  }

  componentDidShow () {
    if (!get('token')) {
      Taro.getSetting({}).then(res => {
        if (res.authSetting['scope.userInfo']) {
          this.props.getUserCenter()
          Taro.getUserInfo().then(({ userInfo }) => {
            this.props.getUserInfo(userInfo)
          })
        } else {
          //TODO-- 跳转登陆
          Taro.navigateTo({ url: '/pages/auth/index' }).finally()
        }
      })
    } else {
      this.props.getUserCenter()
      Taro.getUserInfo().then(({ userInfo }) => {
        this.props.getUserInfo(userInfo)
      })
    }
  }

  render (): JSX.Element {
    const {
      user: {
        userInfo, userCenter: {
          userLevel,
          taskInfo,
          couponInfo,
          walletInfo
        }
      }
    } = this.props
    const { levelCode, info } = this.state

    const paddingTop = info.navBarHeight + info.navBarExtendHeight + 'px'

    return (
      <Page>
        <CustomNavBar title='我的' backgroundColor='rgba(0,0,0,0)' />
        <View className='page-view'>
          <ScrollView className='page-scroll' scrollY>
            <View className='mine-user-wrapper' style={{ paddingTop: paddingTop }}>
              <View className='mine-user--content'>
                <Image
                  src={userInfo.avatarUrl}
                  className='mine-user--avatar'
                  mode='aspectFit'
                />
                <Text className='mine-user--userName'>{userInfo.nickName}</Text>
                <View className='mine-user--level'>
                  <View className='mine-user--level-vip v2' />
                  <Text className='mine-user--level-text'>创客：{levelCode[userLevel.levelCode] ||
                  '普通用户'}</Text>
                </View>
                <Icon
                  name='ico'
                  className='mine-user--code'
                  onClick={() => toRouter('/pages/personal/qrCode/index')}
                  size={20}
                  color='#fff'
                />
              </View>
            </View>
            <View className='user-member-wrapper'>
              <View className='user-member--item'>
                <View className='user-member--item-header'>
                  <View className='user-member--item-left'>
                    <Icon name='huiyuan' size={20} className='user-member--item-icon' color='#FA6400' />
                    <Text className='user-member--item-title'>会员有效期</Text>
                  </View>
                  <Text className='user-member--item-time'>{userLevel.expTime ||
                  '永久有效'}</Text>
                </View>
                <Text className='user-member--item-desc'>{userLevel.description}</Text>
                <Progress
                  className='user-member--item-progress'
                  percent={Number(userLevel.progressBar.replace('%', ''))}
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
                    <Text className='user-member--item-title'>{taskInfo.name}</Text>
                  </View>
                </View>
                <Text className='user-member--item-desc'>{taskInfo.description}</Text>
                <Progress
                  className='user-member--item-progress'
                  percent={Number(taskInfo.progressBar.replace('%', ''))}
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
                    <Text className='struct-item__money'>￥{walletInfo.money.toFixed(
                      2)}元</Text>
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
                    <Text className='struct-item__money'>{couponInfo.description}</Text>
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

MinePage.defaultProps = {
  user: {
    userInfo: {
      avatarUrl: '',
      nickName: ''
    },
    userCenter: {
      userLevel: {
        levelCode: '',
        expTime: '',
        description: '',
        progressBar: ''
      },
      taskInfo: {
        name: '',
        description: '',
        progressBar: ''
      },
      walletInfo: {
        money: 0
      },
      couponInfo: {
        description: ''
      }
    }
  },
  getUserInfo: () => {
  },
  getUserCenter: () => {
  }
}
MinePage.propTypes = {
  user: PropTypes.object
}

export default MinePage
