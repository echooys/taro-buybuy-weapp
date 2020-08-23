import React from 'react'
import Taro from '@tarojs/taro'
import { ScrollView, View, Swiper, SwiperItem, Image, Text, RichText } from '@tarojs/components'
import Page from '_/components/Page'
import { getGoodsDetails } from '_/api/common'

import './index.less'

interface DetailInfo {
  spuId: string
  name: string
  picUrl: string
  description: string
  imgUrlList: any[]
  skuList: any[]
  skuPrice: any[]
  detail: object
  detail2: object
}

interface DetailState {
  spuId: string | undefined
  type: string | undefined
  detail: DetailInfo | undefined
}

class ProductDetails extends React.Component<any, DetailState> {
  constructor (props) {
    super(props)
    this.state = {
      spuId: undefined,
      type: undefined,
      detail: undefined
    }
  }

  componentDidMount (): void {
    const router = Taro.getCurrentInstance().router
    if (router?.params.spuId && router?.params.type) {
      this.setState({ spuId: router.params.spuId, type: router.params.type }, () => {
        this.initGoodsDetail(this.state.spuId, this.state.type)
      })
    }
  }

  /**
   * 初始化商品详情
   * @param spuId
   * @param type
   */
  initGoodsDetail (spuId, type) {
    getGoodsDetails(spuId, type).then(res => {
      const { result, data } = res
      if (result === 'ok') {
        this.setState({ detail: data })
      }
    })
  }

  render (): JSX.Element {
    const { detail } = this.state
    console.log(detail)
    return (
      <Page>
        <View className='page-view'>
          <ScrollView className='page-scroll' scrollY>
            <Swiper
              className='goods-swipe'
              indicatorColor='#fefefe'
              indicatorActiveColor='#FA6400'
              circular
              indicatorDots
              autoplay
            >
              {detail?.imgUrlList.map((item, key) => {
                return (
                  <SwiperItem key={key} className='goods-swipe__item'>
                    <Image src={item.imgUrl} mode='aspectFit' className='goods-swipe__item-img' />
                  </SwiperItem>
                )
              })}
            </Swiper>
            <View className='goods-content'>
              <Text className='goods-content--title'>{detail?.name}</Text>
            </View>
            <View className='goods-detail'>
              <View className='goods-detail--title'>商品详情</View>
              <RichText nodes={detail?.description} />
            </View>
          </ScrollView>
        </View>
        <View className='goods-submit'>立即购买</View>
      </Page>
    )
  }

}

export default ProductDetails
