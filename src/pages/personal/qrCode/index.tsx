import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { Button, Image, ScrollView, Text, View } from '@tarojs/components'
import { connect } from 'react-redux'
import Page from '_/components/Page'
import Icon from '_/components/Icon'
import { getQrCode } from '_/api/user'

import './index.less'

interface QrCodeProps {
  user: {
    userInfo: {
      avatarUrl: string,
      nickName: string
    }
  }
}

@connect(({ user }) => ({
  user
}))
class MyQrCode extends Component<QrCodeProps, any> {
  constructor (props) {
    super(props)
    this.state = {
      qr: undefined
    }
  }

  componentDidMount () {
    Taro.showLoading({ title: '初始化请稍后...' })
    getQrCode().then(res => {
      const { result, data: { qrImgUrl } } = res
      if (result === 'ok') {
        this.setState({ qr: qrImgUrl })
      }
    }).finally(() => {
      Taro.hideLoading()
    })
  }

  render () {
    const { user: { userInfo } } = this.props
    const { qr } = this.state
    return (
      <Page>
        <View className='page-view'>
          <ScrollView className='page-scroll' scrollY>
            <View className='my-code--wrapper'>
              <View className='my-code--content'>
                <Image src={userInfo.avatarUrl} className='my-code--avatar' />
                <Text className='my-code--name'>{userInfo.nickName}</Text>
                <Image className='my-code--image' src={qr} />
              </View>
              <View className='my-code--actions'>
                <Button openType='share' className='my-code--btn'>
                  <Icon name='weixin' size={60} color='#4cba3f' />
                  <Text className='my-code--text'>分享给好友</Text>
                </Button>
                <Button className='my-code--btn'>
                  <Icon name='pengyouquan' color='#1eb4fb' size={60} />
                  <Text className='my-code--text'>分享到朋友圈</Text>
                </Button>
              </View>
            </View>
          </ScrollView>
        </View>
      </Page>
    )
  }

}

export default MyQrCode
