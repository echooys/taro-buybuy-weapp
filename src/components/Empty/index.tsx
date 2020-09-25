import * as React from 'react'
import { Image, View } from '@tarojs/components'

import './index.less'

import netWorkError from '../../assets/error/network-error-image.png'
import notAddress from '../../assets/error/not-address-image.png'
import notOrder from '../../assets/error/not-order-image.png'
import payError from '../../assets/error/pay-error-image.png'
import paySuccess from '../../assets/error/pay-success-image.png'

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
        netWorkError: netWorkError,
        notAddress: notAddress,
        notOrder: notOrder,
        payError: payError,
        paySuccess: paySuccess
      }
    }
  }

  render (): JSX.Element {
    const { children, type, describe } = this.props
    const { images } = this.state
    return (
      <View className='empty'>
        <View className='empty-wrapper'>
          <Image src={images[type]} className='empty-wrapper--images' />
        </View>
        <View className='empty-text'>
          {describe}
        </View>
        <View className='empty-footer'>
          {children}
        </View>
      </View>
    )
  }
}

export default Empty
