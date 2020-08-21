import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import PropTypes, { InferProps } from 'prop-types'
import classNames from 'classnames'
import { Text, View } from '@tarojs/components'

import './index.less'

interface TabBarProps {
  active: number
  theme: string
}

interface TabBarState {

}

class TabBar extends Component<TabBarProps, TabBarState> {
  public static defaultProps: TabBarProps
  public static propTypes: InferProps<TabBarProps>

  constructor (props) {
    super(props)
  }

  jumpTabBarHandle (name: string) {
    const url = `/pages/tabBar/${name}/index`
    Taro.switchTab({ url: url })
  }

  render (): JSX.Element {
    const { theme, active } = this.props
    return (
      <View className='mm-tab-bar'>
        <View className='mm-tab-bar__content'>
          <View
            className={classNames(
              'mm-tab-bar__item',
              { 'active': active === 1 }
            )}
            onClick={this.jumpTabBarHandle.bind(this, 'home')}
          >
            <View
              className={classNames(
                'mm-tab-bar__item-img',
                'img-home',
                theme
              )}
            />
            <Text className='mm-tab-bar__item-text'>首页</Text>
          </View>
          <View
            className={classNames(
              'mm-tab-bar__item',
              { 'active': active === 2 }
            )}
            onClick={this.jumpTabBarHandle.bind(this, 'mine')}
          >
            <View
              className={classNames(
                'mm-tab-bar__item-img',
                'img-mine',
                theme
              )}
            />
            <Text className='mm-tab-bar__item-text'>我的</Text>
          </View>
        </View>
      </View>
    )
  }

}

TabBar.defaultProps = {
  active: 1,
  theme: 'red'
}
TabBar.propTypes = {
  active: PropTypes.number,
  theme: PropTypes.string
}

export default TabBar
