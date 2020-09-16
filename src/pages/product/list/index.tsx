import React from 'react'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import { Input, ScrollView, Text, View } from '@tarojs/components'
import Page from '_/components/Page'
import SearchBar from '_/components/SearchBar'
import Product from '_/components/Product'
import LoadingMore from '_/components/LoadingMore'
import Icon from '_/components/Icon'

import { searchProduct } from '_/api/common'
import './index.less'

export default class ProductList extends React.Component<any, any> {
  constructor (props) {
    super(props)
    this.state = {
      value: undefined,
      list: [],
      loading: false,
      finished: true,
      page: 1,
      pageSize: 12,

      sortType: undefined,
      // 综合排序
      compList: [
        { key: 'TAOBAO', text: '淘宝' },
        { key: 'JD', text: '京东' },
        { key: 'PDD', text: '拼多多' }
      ],
      compValue: 'TAOBAO',
      // 价格排序
      minPriceValue: undefined,
      maxPriceValue: undefined
    }
  }

  componentDidMount (): void {
    const router = Taro.getCurrentInstance().router
    if (router?.params.key) {
      this.setState({ value: router.params.key }, () => {
        this.onLoad()
      })
    }
  }

  onLoad () {
    const { value, page, pageSize, list, compValue, minPriceValue, maxPriceValue } = this.state
    if (!value) return false
    const param = `default-${compValue}`
    let params: any = {
      keyword: value,
      pageSize,
      page,
      param
    }
    if (minPriceValue && maxPriceValue) {
      params.priceFilter = `${minPriceValue}-${maxPriceValue}`
    }
    this.setState({ loading: true })
    searchProduct(params).then(res => {
      const { result, data } = res
      if (result === 'ok') {
        this.setState({
          list: list.concat(data.goodsInfoList),
          loading: false,
          page: page + 1,
          finished: data.goodsInfoList.length ===
            Number(data.pageInfo.pageSize)
        })
      }
    })
  }

  /**
   * 开始搜搜
   * @param key
   */
  handleSubmit (key) {
    this.setState({
      page: 1, value: key, loading: false, finished: true, list: []
    }, () => {
      this.onLoad()
    })
  }

  /**
   * 选择排序模式
   * @param type
   */
  handleChangeSortType (type) {
    const { sortType } = this.state
    if (sortType === type) {
      this.setState({ sortType: undefined })
    } else {
      this.setState({ sortType: type })
    }
  }

  /**
   * 综合排序改变
   * @param value
   */
  handleSetCompValue (value) {
    this.setState({ compValue: value }, () => {
      this.handleSubmit(this.state.value)
    })
  }

  /**
   * 最低价改变
   * @param e
   */
  handleChangeMinValue (e) {
    const value = e.detail.value
    if (/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(value)) {
      this.setState({ minPriceValue: value })
    } else {
      this.setState({ minPriceValue: undefined })
    }
  }

  /**
   * 最高价改变
   * @param e
   */
  handleChangeMaxValue (e) {
    const value = e.detail.value
    if (/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(value)) {
      this.setState({ maxPriceValue: value })
    } else {
      this.setState({ maxPriceValue: undefined })
    }
  }

  render () {
    const {
      value,
      list,
      loading,
      finished,
      minPriceValue,
      maxPriceValue,
      sortType,
      compValue,
      compList
    } = this.state
    return (
      <Page>
        <View className='search-header--bar'>
          <SearchBar value={value} onSubmit={this.handleSubmit.bind(this)} />
          <View className='search-sort'>
            <View className='search-sort-wrapper'>
              <View
                className={classNames(
                  'search-sort--item',
                  { 'active': sortType === 'comp' }
                )}
                onClick={this.handleChangeSortType.bind(this, 'comp')}
              >
                <Icon
                  name='changyongtubiao_Farmshezhi'
                  color='#6D7278'
                  className='search-sort--item-icon'
                  size={16}
                />
                <Text className='search-sort--item-text'>综合</Text>
                <Icon
                  name={sortType === 'comp' ? 'xiangshang' : 'tubiaozhizuo-'}
                  color='#C7C7CD'
                  className='search-sort--item-icon'
                  size={12}
                />
              </View>
              <View
                className={classNames(
                  'search-sort--item',
                  { 'active': sortType === 'price' }
                )}
                onClick={this.handleChangeSortType.bind(this, 'price')}
              >
                <Icon
                  name='RectangleCopy'
                  color='#6D7278'
                  className='search-sort--item-icon'
                  size={18}
                />
                <Text className='search-sort--item-text'>价格</Text>
                <Icon
                  name={sortType === 'price' ? 'xiangshang' : 'tubiaozhizuo-'}
                  color='#C7C7CD'
                  className='search-sort--item-icon'
                  size={12}
                />
              </View>
            </View>
            {sortType && (
              <View className='search-sort--container'>
                {sortType === 'comp' && (
                  <View className='search-sort--comp flex-left'>
                    {compList.map((item, key) => {
                      return (
                        <Text
                          key={key}
                          className={classNames(
                            'search-sort--comp_text',
                            {
                              'active': compValue === item.key
                            }
                          )}
                          onClick={this.handleSetCompValue.bind(this, item.key)}
                        >
                          {item.text}
                        </Text>
                      )
                    })}
                  </View>
                )}
                {sortType === 'price' && (
                  <View className='search-sort--comp flex-right'>
                    <Input
                      value={minPriceValue}
                      placeholder='最低价'
                      type='number'
                      onInput={this.handleChangeMinValue.bind(this)}
                      className='search-sort--comp_input'
                    />
                    <Text className='search-sort--comp_line' />
                    <Input
                      value={maxPriceValue}
                      type='number'
                      onInput={this.handleChangeMaxValue.bind(this)}
                      placeholder='最高价'
                      className='search-sort--comp_input'
                    />
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
        <View className='page-view'>
          <ScrollView
            className='page-scroll'
            scrollY
            onScrollToLower={this.onLoad.bind(this)}
          >
            <View className='search-content--list'>
              {list.map((item, key) => {
                return <Product sourceData={item} isIcon={false} key={key} />
              })}
            </View>
            <LoadingMore loading={loading} finished={finished} />
          </ScrollView>
        </View>
      </Page>
    )
  }

}
