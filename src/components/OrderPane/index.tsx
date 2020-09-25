import * as React from 'react'
import { ScrollView, View } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import Page from '_/components/Page'
import Empty from '_/components/Empty'
import OrderPaneItem from '_/components/OrderPaneItem'
import { getOrderList } from '_/api/order'
import './index.less'

class OrderPane extends React.Component<any, any> {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      loading: false,
      error: false,
      page: 1,
      size: 20
    }
  }

  componentDidMount () {
    this.loadData()
  }

  loadData () {
    const { list, loading, page, size } = this.state
    const { orderStatus } = this.props
    if (loading) return false
    this.setState({ loading: true })
    getOrderList(orderStatus, page, size).then(res => {
      const { result, data } = res
      if (result === 'ok') {
        this.setState({
          list: list.concat(data.items),
          loading: false,
          page: page + 1
        })
      } else {
        this.setState({ loading: false, error: true })
      }
    }).catch(() => {
      this.setState({ loading: false, error: true })
    })
  }

  render () {
    const { list, loading, error } = this.state
    return (
      <Page>
        <View className='page-view'>
          <ScrollView
            className='page-scroll'
            scrollY
            onScrollToUpper={this.loadData.bind(this)}
          >
            {list.map((item, key) => {
              return (
                <OrderPaneItem key={key} sourceData={item} />
              )
            })}
            {(loading) && (
              <AtActivityIndicator content='您还没有相关订单' />
            )}
            {(!loading && error) && (
              <Empty type='netWorkError' describe='网络错误请检查您的网络!' />
            )}
            {(!list.length && !loading) && (
              <Empty type='notOrder' describe='您还没有相关订单!' />
            )}
          </ScrollView>
        </View>
      </Page>
    )
  }
}

export default OrderPane
