import * as React from 'react'

import { AtTabs, AtTabsPane } from 'taro-ui'
import { View } from '@tarojs/components'
import Page from '_/components/Page'
import OrderPane from '_/components/OrderPane'

import './index.scss'

class OrderList extends React.Component<any, any> {
  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      tabList: [
        { title: '全部', key: -1 },
        { title: '待付款', key: 0 },
        { title: '待发货', key: 2 },
        { title: '已完成', key: 3 },
        { title: '已取消', key: 4 }
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
        <View className='page-view'>
          <AtTabs
            current={current}
            tabList={tabList}
            onClick={this.handleTabsChange.bind(this)}
          >
            {tabList.map((item, key) => {
              return (
                <AtTabsPane current={current} index={key} key={key}>
                  <OrderPane orderStatus={item.key} />
                </AtTabsPane>
              )
            })}
          </AtTabs>
        </View>
      </Page>
    )
  }
}

export default OrderList
