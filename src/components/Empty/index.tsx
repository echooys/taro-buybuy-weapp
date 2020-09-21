import * as React from 'react'
import { Image, View } from '@tarojs/components'

import './index.less'

export interface EmptyProps {
  type: string
  describe: string
}

export interface EmptyState {
  images: object
}

class Empty extends React.Component<EmptyProps, EmptyState> {
  constructor (props) {
    super(props)
    this.state = {
      images: {
        netWorkError: require('../../assets/error/network-error-image.png'),
        notAddress: require('../../assets/error/not-address-image.png'),
        notOrder: require('../../assets/error/not-order-image.png'),
        payError: require('../../assets/error/pay-error-image.png'),
        paySuccess: require('../../assets/error/pay-success-image.png')
      }
    }
  }

  render (): JSX.Element {
    const { children, type } = this.props
    const { images } = this.state
    return (
      <View className='empty'>
        <View className='empty-wrapper'>
          <Image src={images[type]} className='empty-wrapper--images' />
        </View>
        <View className='empty-text'>
        </View>
        <View className='empty-footer'>
          {children}
        </View>
      </View>
    )
  }
}

export default Empty
