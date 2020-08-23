import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, ScrollView, Text } from '@tarojs/components'

import CustomNavBar from '_/components/CustomNavBar'
import TabBar from '_/components/TabBar'
import Page from '_/components/Page'
import Product from '_/components/Product'
import Icon from '_/components/Icon'
import LoadingMore from '_/components/LoadingMore'
import { getHomeHotProduct } from '_/api/home'

import './index.less'

interface HomeProps {
}

interface HomeState {
  list: any[],
  page: number,
  loading: boolean,
  finished: boolean
}

class HomePage extends Component<HomeProps, HomeState> {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      loading: false,
      finished: true,
      page: 1
    }
  }

  componentDidMount (): void {
    this.load()
  }

  load () {
    const { page, finished } = this.state
    if (!finished) {
      return
    }
    this.setState({ loading: true })
    getHomeHotProduct(page).then(res => {
      const { result, data } = res
      if (result === 'ok') {
        this.setState({
          list: data.items,
          loading: false,
          page: page + 1,
          finished: data.items.length === Number(data.pageInfo.pageSize)
        })
      }
    })
  }

  jumpSearchHandle () {
    Taro.navigateTo({ url: '/pages/search/index' }).finally(() => {})
  }

  render (): JSX.Element {
    const { list, loading, finished } = this.state
    return (
      <Page>
        <CustomNavBar title='85买卖网' backgroundColor='rgba(0,0,0,0)'>
          <View className='home-search-wrapper'>
            <View
              className='home-search-wrapper-content'
              onClick={this.jumpSearchHandle.bind(this)}
            >
              <Icon name='sousuo' size={14} color='#fff' />
              <Text className='home-search-wrapper--text'>京东宝贝链接、淘口令</Text>
            </View>
          </View>
        </CustomNavBar>
        <View className='page-view'>
          <ScrollView
            className='page-scroll'
            scrollY
            onScrollToUpper={this.load.bind(this)}
          >
            <View className='home-banner'>
            </View>
            <View className='home-content'>
              <View className='home-content--title'>热门商品</View>
              <View className='home-content--list'>
                {list.map((item, key) => {
                  return <Product sourceData={item} key={key} />
                })}
              </View>
              <LoadingMore loading={loading} finished={finished} />
            </View>
          </ScrollView>
        </View>
        <TabBar active={1} />
      </Page>
    )
  }
}

export default HomePage
