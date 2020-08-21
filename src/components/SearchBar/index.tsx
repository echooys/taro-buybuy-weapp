import React from 'react'
import Taro from '@tarojs/taro'
import { Input, Text, View } from '@tarojs/components'
import PropTypes from 'prop-types'
import Icon from '_/components/Icon'
import { getStorage, setStorage } from '_/utils/storage'

import './index.less'

interface SearchBarProps {
  value: string,
  onSubmit: Function
}

interface SearchBarState {
  value: string | undefined
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  static propsTypes = {
    value: PropTypes.string,
    onSubmit: PropTypes.func
  }
  static defaultProps = {
    value: undefined,
    onSubmit: () => {}
  }

  constructor (props) {
    super(props)
    this.state = {
      value: undefined
    }
  }

  componentDidMount (): void {
    const { value } = this.props
    if (value) {
      this.setState({ value })
    }
  }

  componentDidUpdate (prevProps): void {
    if (prevProps.value !== this.props.value) {
      this.changeValue(prevProps)
    }
  }

  changeValue (nextProps) {
    this.setState({ value: nextProps.value })
  }

  handleChangeValue (e) {
    this.setState({ value: e.detail.value })
  }

  handleCancelValue () {
    Taro.navigateBack().finally(() => {})
  }

  handleCloseValue () {
    this.setState({ value: undefined })
  }

  handleSubmit () {
    const { value } = this.state
    if (!value) {
      Taro.showToast({ title: '请输入搜索内容！', icon: 'none' }).
        finally(() => {})
      return
    }
    const list = getStorage('searchList')
    const filterList = list.split('---')
    if (!filterList.includes(value)) {
      filterList.push(value)
    }

    setStorage('searchList', filterList.join('---'))

    this.props.onSubmit && this.props.onSubmit(value)
  }

  render () {
    const { value } = this.state
    return (
      <View className='search-bar--wrapper'>
        <View className='search-bar--content'>
          <Input
            className='search-bar--input'
            placeholder='京东宝贝链接、淘口令'
            confirmType='search'
            focus
            onConfirm={this.handleSubmit.bind(this)}
            value={value}
            onInput={this.handleChangeValue.bind(this)}
          />
          {(value && value.length) && (
            <Icon
              name='close'
              size={8}
              onClick={this.handleCloseValue.bind(this)}
              color='#fff'
              className='search-bar--close'
            />
          )}
        </View>
        <Text
          className='search-bar--back'
          onClick={this.handleCancelValue.bind(this)}
        >
          取消
        </Text>
      </View>
    )
  }
}

export default SearchBar
