import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { Image, Text, View } from '@tarojs/components'
import { GoodTypes, toRouter } from '_/utils/common'

import './index.less'

interface ProductProps {
  sourceData: any,
  isIcon: boolean
}

class Product extends React.Component<ProductProps, any> {
  public static defaultProps: ProductProps
  public static propTypes: InferProps<ProductProps>

  jumpProductDetails (item) {
    toRouter(
      `/pages/product/details/index?spuId=${item.spuId}&type=${item.source}`)
  }

  render (): JSX.Element {
    const { sourceData, isIcon } = this.props
    return (
      <View
        className='product'
        onClick={this.jumpProductDetails.bind(this, sourceData)}
      >
        <Image src={sourceData.imgUrl} mode='aspectFill' className='product-image' />
        <View className='product-title'>{sourceData.name}</View>
        <View className='product-level'>
          {sourceData.source && (
            <Text className='product-level-label'>{GoodTypes[sourceData.source]}</Text>
          )}
        </View>
        <View className='product-price'>
          <Text className='product-price-after'>￥</Text>
          <Text className='product-price-number'>{sourceData.price}</Text>
        </View>
        {isIcon && <View className='product-hot-icon' />}
      </View>
    )
  }
}

Product.defaultProps = {
  sourceData: {
    imgUrl: '',
    name: '',
    price: ''
  },
  isIcon: true
}

Product.propTypes = {
  sourceData: PropTypes.object,
  isIcon: PropTypes.bool
}

export default Product
