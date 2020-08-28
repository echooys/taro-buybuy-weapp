import React from 'react'
import Taro from '@tarojs/taro'
import { ScrollView, View, OpenData, Button } from '@tarojs/components'
import Page from '_/components/Page'
import { userAuth } from '_/api/user'
import { put } from '_/utils/storage'

import './index.less'

class AuthPage extends React.Component<any, any> {
  constructor (props) {
    super(props)
    this.state = {}
  }

  /**
   * 获取用户信息 并登录
   * @param data
   */
  onGotUserInfo = ({ detail }) => {
    if (detail['errMsg'] === 'getUserInfo:ok') {
      Taro.login({
        success: ({ code }) => {
          Taro.showLoading({
            title: '登录中...',
            mask: true
          })
          // 使用code 登录
          userAuth(code, 'wxf4aab3a69d357020').then(res => {
            const { data: { token, expTime }, result } = res
            if (result === 'ok') {
              put('token', token, expTime)
              Taro.navigateBack()
            }
          }).finally(() => {
            Taro.hideLoading()
          })
        }
      })
    } else {
      Taro.showToast({ icon: 'none', title: '您拒绝了微信授权，将不能正常使用系统功能！可以再次发起授权' })
    }
  }

  render (): JSX.Element {
    return (
      <Page>
        <View className='page-view'>
          <ScrollView className='page-scroll' scrollY>
            <View className='get-user-info'>
              <View className='user-info'>
                <View className='user-info-avatar'>
                  <OpenData type='userAvatarUrl' />
                </View>
                <View className='user-info-name'>
                  <OpenData type='userNickName' />
                </View>
              </View>
              <View className='auth-content'>
                <View className='auth-title'>
                  申请获取以下权限
                </View>
                <View className='auth-desc'>
                  获取你的公开信息（昵称、头像、地区、及性别）
                </View>
                <Button
                  open-type='getUserInfo'
                  type='primary'
                  className='auth-btn'
                  lang='zh_CN'
                  onGetUserInfo={this.onGotUserInfo}
                >
                  授权登录
                </Button>
              </View>
            </View>
          </ScrollView>
        </View>
      </Page>
    )
  }

}

export default AuthPage
