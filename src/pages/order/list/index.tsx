import * as React from 'react'

import { AtTabs, AtTabsPane } from 'taro-ui'
import { View } from '@tarojs/components'
import Page from '_/components/Page'

import './index.less'

class OrderList extends React.Component<any, any> {
  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      tabList: [
        { title: '全部' },
        { title: '待付款' },
        { title: '待发货' },
        { title: '已完成' },
        { title: '已取消' }
      ]
    }
  }

  handleTabsChange = (index: number) => {
    this.setState({ current: index })
  }

  render () {
    const { current, tabList } = this.state
    return (
      <Page>
        <View>
          <AtTabs
            current={current}
            tabList={tabList}
            onClick={this.handleTabsChange.bind(this)}
          >
            <AtTabsPane current={current} index={0}>
              <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页一的内容</View>
            </AtTabsPane>
            <AtTabsPane current={current} index={0}>
              <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页一的内容</View>
            </AtTabsPane>
            <AtTabsPane current={current} index={0}>
              <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页一的内容</View>
            </AtTabsPane>
            <AtTabsPane current={current} index={0}>
              <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页一的内容</View>
            </AtTabsPane>
          </AtTabs>
        </View>
      </Page>
    )
  }
}

export default OrderList
