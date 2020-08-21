import React, { Component } from 'react'
import { View } from '@tarojs/components'

import TabBar from '_/components/TabBar'
import Page from '_/components/Page'

import './index.less'

interface HomeProps {
}

interface HomeState {
  list: any[]
}

class MinePage extends Component<HomeProps, HomeState> {
  constructor (props) {
    super(props)
    this.state = {
      list: []
    }
  }

  render (): JSX.Element {
    const { list } = this.state
    return (
      <Page>
        {list}
        <View>
          sssdsdss
        </View>
        <TabBar active={2} />
      </Page>
    )
  }
}

export default MinePage
