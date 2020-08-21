import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { Image, Text, View } from '@tarojs/components'

import './index.less'

interface ProductProps {
  sourceData: any
}

interface ProductState {

}

class Product extends React.Component<ProductProps, ProductState> {
  public static defaultProps: ProductProps
  public static propTypes: InferProps<ProductProps>

  render (): JSX.Element {
    const { sourceData } = this.props
    return (
      <View className='product'>
        <Image src={sourceData.imgUrl} mode='aspectFill' className='product-image' />
        <View className='product-title'>{sourceData.name}</View>
        <View className='product-level'>
          <Text className='product-level-label'>银牌</Text>
        </View>
        <View className='product-price'>
          <Text className='product-price-after'>￥</Text>
          <Text className='product-price-number'>{sourceData.price}</Text>
        </View>
        <View className='product-hot-icon' />
      </View>
    )
  }
}

Product.defaultProps = {
  sourceData: {
    imgUrl: '',
    name: '',
    price: ''
  }
}

Product.propTypes = {
  sourceData: PropTypes.object
}

export default Product
