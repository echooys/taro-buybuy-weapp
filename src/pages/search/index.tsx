import React from 'react'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import _ from 'lodash'
import { ScrollView, View, Text } from '@tarojs/components'
import Page from '_/components/Page'
import SearchBar from '_/components/SearchBar'
import { hotSearchKeyWords } from '_/api/common'
import { get } from '_/utils/storage'

import './index.less'

class Search extends React.Component<boolean, any> {
  constructor (props) {
    super(props)
    let list = []
    const searchList = get('searchList')
    if (searchList) {
      list = searchList.split('---').filter(item => !!item).reverse()
    }
    this.state = {
      historyList: list,
      hotKeyWords: []
    }
  }

  componentDidMount (): void {
    this.init()
  }

  init () {
    hotSearchKeyWords().then(res => {
      const { result, data: { items } } = res
      if (result === 'ok') {
        const hotKeyWords = _.sortBy(items, item => -item.sort)
        this.setState({ hotKeyWords })
      }
    })
  }

  handleSearch (key) {
    Taro.navigateTo({
      url: '/pages/product/list/index?key=' + key
    }).finally()
  }

  handleCloseSearchList () {
    Taro.setStorageSync('searchList', undefined)
  }

  render () {
    const { hotKeyWords, historyList } = this.state
    return (
      <Page>
        <View className='page-view search-page'>
          <SearchBar onSubmit={this.handleSearch.bind(this)} />
          <ScrollView className='page-scroll' scrollY>
            <View className='search-content-title'>
              搜索历史
              <Text
                className='search-content-close'
                onClick={this.handleCloseSearchList.bind(this)}
              >
                清空搜索记录
              </Text>
            </View>
            <View className='search-content-list'>
              {historyList.map((item, key) => {
                return (
                  <Text
                    className='search-content-item' key={key}
                    onClick={this.handleSearch.bind(this, item)}
                  >
                    {item}
                  </Text>
                )
              })}
              {!historyList.length && (
                <Text className='search-content-not-data'>暂无搜索记录！</Text>
              )}
            </View>
            <View className='search-content-title'>热门搜索</View>
            <View className='search-content-list'>
              {hotKeyWords.map((item, key) => {
                return (
                  <Text
                    className={classNames(
                      'search-content-item',
                      { active: item.highlight }
                    )}
                    onClick={this.handleSearch.bind(this, item.keyword)}
                    key={key}
                  >
                    {item.keyword}
                  </Text>
                )
              })}
              {!hotKeyWords.length && (
                <Text className='search-content-not-data'>暂无热门搜索！</Text>
              )}
            </View>
          </ScrollView>
        </View>
      </Page>
    )
  }
}

export default Search
