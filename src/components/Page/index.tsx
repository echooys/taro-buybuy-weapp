import React, { Component } from 'react'
import { View } from '@tarojs/components'

import './index.less'

class Page extends Component<any, any> {
  render () {
    return (
      <View id='skin-red' className='app-page'>
        {this.props.children}
      </View>
    )
  }
}

export default Page
