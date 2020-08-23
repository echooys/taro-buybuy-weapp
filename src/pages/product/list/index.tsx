import React from 'react'
import Taro from '@tarojs/taro'
import { ScrollView, View } from '@tarojs/components'
import Page from '_/components/Page'
import SearchBar from '_/components/SearchBar'
import Product from '_/components/Product'
import LoadingMore from '_/components/LoadingMore'

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
      pageSize: 12
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
    const { value, page, pageSize } = this.state
    if (!value) return false
    this.setState({ loading: true })
    searchProduct({ keyword: value, pageSize, page }).then(res => {
      const { result, data } = res
      if (result === 'ok') {
        this.setState({
          list: data.goodsInfoList,
          loading: false,
          page: page + 1,
          finished: data.goodsInfoList.length === Number(data.pageInfo.pageSize)
        })
      }
    })
  }

  handleSubmit (key) {
    this.setState({
      page: 1, value: key, loading: false, finished: true, list: []
    }, () => {
      this.onLoad()
    })
  }

  render () {
    const { value, list, loading, finished } = this.state
    return (
      <Page>
        <View className='search-header--bar'>
          <SearchBar value={value} onSubmit={this.handleSubmit.bind(this)} />
          <View className='search-sort'>

          </View>
        </View>
        <View className='page-view'>
          <ScrollView className='page-scroll' scrollY onScrollToUpper={this.onLoad.bind(this)}>
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
