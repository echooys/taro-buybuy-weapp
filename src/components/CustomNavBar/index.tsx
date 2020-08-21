import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { Text, View } from '@tarojs/components'
import getSysInfo, { SystemInfoFace } from '_/utils/getSysInfo'

import './index.less'

interface CustomNavBarProps {
  backgroundColor: string
  title: string,
  navContent: JSX.Element | undefined
}

interface CustomNavBarState {
  info: SystemInfoFace
}

class CustomNavBar extends React.Component<CustomNavBarProps, CustomNavBarState> {
  static defaultProps: CustomNavBarProps
  static propTypes: InferProps<CustomNavBarProps>

  constructor (props) {
    super(props)
    this.state = {
      info: getSysInfo()
    }
  }

  render () {
    const { title, navContent, children, backgroundColor } = this.props
    const { info } = this.state
    const rootStyle = {
      minHeight: info.navBarHeight + info.navBarExtendHeight + 'px',
      backgroundColor: backgroundColor || '#fff'
    }
    const contentStyle = {
      height: info.navBarHeight - info.statusBarHeight +
        info.navBarExtendHeight + 'px',
      marginTop: info.statusBarHeight + 'px'
    }
    return (
      <View className='custom-nav-bar' style={rootStyle}>
        <View className='custom-nav-bar--content' style={contentStyle}>
          {navContent ? navContent : (
            <Text className='custom-nav-bar--content_title'>
              {title}
            </Text>
          )}
        </View>
        <View className='custom-nav-bar-other'>
          {children}
        </View>
      </View>
    )
  }
}

CustomNavBar.defaultProps = {
  backgroundColor: '#ffffff',
  title: 'title',
  navContent: undefined
}

CustomNavBar.propTypes = {
  backgroundColor: PropTypes.string,
  title: PropTypes.string,
  navContent: PropTypes.element
}

export default CustomNavBar
