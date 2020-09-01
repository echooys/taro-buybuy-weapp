import React from 'react'
import Taro from '@tarojs/taro'
import {
  ScrollView,
  View,
  Swiper,
  SwiperItem,
  Image,
  Text
} from '@tarojs/components'
import classNames from 'classnames'
import Page from '_/components/Page'
import Icon from '_/components/Icon'
import Popup from '_/components/Popup'
import { getGoodsDetails } from '_/api/common'

import './index.less'

interface SkuItemFace {
  attrImgs: any[]
  skuList: any[]
  skuPrices: any[]
}

interface DetailInfo {
  spuId: string
  name: string
  picUrl: string
  description: string
  descImgs: string[]
  imgUrlList: any[]
  skuItem: SkuItemFace
  skuPrice: any[]
  detail: object
  detail2: object
}

interface DetailState {
  spuId: string | undefined
  type: string | undefined
  detail: DetailInfo | undefined,
  visibleSkuModel: boolean,
  selectSku: any,
  selectCurrentSku: any
  num: number
}

class ProductDetails extends React.Component<any, DetailState> {
  constructor (props) {
    super(props)
    this.state = {
      spuId: undefined,
      type: undefined,
      detail: undefined,
      visibleSkuModel: false,
      selectSku: {},
      selectCurrentSku: undefined,
      num: 1
    }
  }

  componentDidMount (): void {
    const router = Taro.getCurrentInstance().router
    if (router?.params.spuId && router?.params.type) {
      this.setState({ spuId: router.params.spuId, type: router.params.type },
        () => {
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
    Taro.showLoading({ title: '加载中,请稍后...' }).finally()
    getGoodsDetails(spuId, type).then(res => {
      const { result, data } = res
      if (result === 'ok') {
        this.setState({ detail: data })
      }
    }).finally(() => {
      Taro.hideLoading()
    })
  }

  selectSkuHandle (spu, sku) {
    const { selectSku } = this.state
    let _selectSku: any = {}
    if (selectSku[spu.id] === sku.id) {
      _selectSku[spu.id] = undefined
    } else {
      _selectSku[spu.id] = sku.id
    }

    this.setState({
      selectSku: Object.assign({}, selectSku, _selectSku)
    }, () => {
      this.changeCurrentSkuInfo()
    })
  }

  changeCurrentSkuInfo () {
    const { selectSku, detail } = this.state
    let skuString: string[] = []
    for (let k in selectSku) {
      skuString.push(`${k}:${selectSku[k]}`)
    }
    let selectSkuString = skuString.join(';')

    // 查找匹配的sku
    let s = detail?.skuItem.skuPrices.find(item => item.key === selectSkuString)
    this.setState({ selectCurrentSku: s })
  }

  minusNumber () {
    const { num } = this.state
    if (num > 1) {
      this.setState({ num: num - 1 })
    }
  }

  addNumber () {
    const { num } = this.state
    this.setState({ num: num + 1 })
  }

  /*
  * 规格选择
  * */
  renderSelectProductSku () {
    const { selectCurrentSku } = this.state
    let name: string[] = []
    if (selectCurrentSku) {
      let s = selectCurrentSku.attrName.split(';')
      s.forEach(item => {
        let _s = item.split(':')
        name.push(_s[_s.length - 1])
      })
    }
    return (
      <View
        className='row-sku-select'
        onClick={() => {
          this.setState({ visibleSkuModel: true })
        }}
      >
        <Text className='row-sku-select__title'>商品规格</Text>
        <View className='row-sku-select__content'>
          <Text className='row-sku-select__text'>
            {selectCurrentSku ? name.join('-') : '请选择'}
          </Text>
          <Icon name='more' size='12' color='#333' />
        </View>
      </View>
    )
  }

  handleSubmit () {
    const { selectCurrentSku } = this.state
    if (!selectCurrentSku) {
      Taro.showToast({ title: '请选择sku', icon: 'none' }).finally()
      return
    }
    // TODO: 提交订单
  }

  render (): JSX.Element {
    const { detail, visibleSkuModel, selectSku, num, selectCurrentSku } = this.state
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
              {selectCurrentSku && (
                <View className='goods-content--price'>
                  <Text className='goods-content--price_now'>
                    85买卖网：<Text className='price'>￥{selectCurrentSku.price}</Text>
                  </Text>
                  <Text className='goods-content--price_org'>
                    原价：<Text className='price'>￥{selectCurrentSku.originalPrice}</Text>
                  </Text>
                </View>
              )}
            </View>
            {this.renderSelectProductSku()}
            {detail?.descImgs && (
              <View className='goods-detail'>
                <View className='goods-detail--title'>商品详情</View>
                {detail?.descImgs.map((item, key) => {
                  return (
                    <Image src={item} mode='widthFix' key={key} className='goods-detail--img' />
                  )
                })}
              </View>
            )}
          </ScrollView>
        </View>
        <View
          className='goods-submit'
          onClick={this.handleSubmit.bind(this)}
        >
          立即购买
        </View>
        <Popup
          isOpened={visibleSkuModel}
          position='bottom'
          round
          customStyle={{ maxHeight: '500px', height: '100%' }}
          onClose={() => {this.setState({ visibleSkuModel: false })}}
        >
          <View className='sku-select-wrapper'>
            <View className='page-view'>
              <ScrollView scrollY className='page-scroll'>
                {detail && (
                  <View className='sku-model'>
                    <View className='sku-model--header'>
                      <Image src={detail?.picUrl} className='sku-model--header_image' />
                      <View className='sku-model--header_content'>
                        <Text className='sku-model--header_title'>{detail?.name}</Text>
                        {selectCurrentSku && (
                          <Text className='sku-model--header_price'>
                            <Text className='sub'>￥</Text>
                            {selectCurrentSku.price}
                          </Text>
                        )}
                      </View>
                    </View>
                    {detail.skuItem.skuList.map((item, key) => {
                      return (
                        <View className='sku-model-select' key={key}>
                          <View className='sku-model-select__title'>
                            {item.classify.name}
                          </View>
                          <View className='sku-model-select__list'>
                            {item.options.map((_item, _key) => {
                              const ia = selectSku[item.classify.id] == _item.id
                              const _itemClass = classNames(
                                'sku-model-select__item', { 'active': ia }
                              )
                              return (
                                <Text
                                  className={_itemClass}
                                  onClick={this.selectSkuHandle.bind(this,
                                    item.classify, _item)}
                                  key={_key}
                                >
                                  {_item.name}
                                </Text>
                              )
                            })}
                          </View>
                        </View>
                      )
                    })}
                    <View className='sku-model-number'>
                      <Text>数量</Text>
                      <View className='sku-model-number_controller'>
                        <Icon
                          name='plus-minus'
                          onClick={this.minusNumber.bind(this)}
                          className='sku-model-number-button'
                          size={10}
                          color='#989898'
                        />
                        <Text className='sku-model-number-text'>{num}</Text>
                        <Icon
                          name='add'
                          onClick={this.addNumber.bind(this)}
                          className='sku-model-number-button'
                          size={10}
                          color='#989898'
                        />
                      </View>
                    </View>
                  </View>
                )}
              </ScrollView>
            </View>
            <View
              className='goods-submit'
              onClick={this.handleSubmit.bind(this)}
            >
              立即购买
            </View>
          </View>
        </Popup>
      </Page>
    )
  }

}

export default ProductDetails
