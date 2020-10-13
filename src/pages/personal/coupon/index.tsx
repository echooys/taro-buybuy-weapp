import React from 'react'
import moment from 'moment'
import { Image, ScrollView, Text, View } from '@tarojs/components'
import Page from '_/components/Page'
import { getCouponList } from '_/api/user'
import LoadingMore from '_/components/LoadingMore'
import Empty from '_/components/Empty'
import couponRed from '_/assets/common/coupon-red-bg.png'
import couponOver from '_/assets/common/coupon-over-bg.png'
import couponOverIcon from '_/assets/common/coupon-over-icon.png'

import './index.less'

class Coupon extends React.Component<any, any> {
  constructor (props) {
    super(props)
    this.state = {
      couponList: [],
      loading: false,
      finished: true,
      page: 1,
      size: 20
    }
  }

  componentDidMount () {
    this.load()
  }

  load () {
    const { couponList, page, size } = this.state
    this.setState({ loading: true })
    getCouponList(page, size).then(res => {
      const { result, data: { items, pageInfo } } = res
      if (result === 'ok') {
        this.setState({
          couponList: couponList.concat(items),
          loading: false,
          page: page + 1,
          finished: items.length === Number(pageInfo.pageSize)
        })
      }
    })
  }

  render () {
    const { couponList, loading, finished } = this.state
    return (
      <Page>
        <View className='page-view'>
          <ScrollView
            className='page-scroll'
            scrollY
            onScrollToLower={this.load.bind(this)}
          >
            <View className='coupon-list'>
              {couponList.map((item, key) => {
                let img: any
                if (item.status == 1) {
                  img = couponRed
                } else {
                  img = couponOver
                }
                return (
                  <View className='coupon-item' key={key}>
                    <Image
                      src={img}
                      className='coupon-item-image'
                    />
                    <View className='coupon-item--content'>
                      <View className='coupon-item-label'>
                        <Text className='coupon-item-label_text'>买卖网</Text>
                      </View>
                      <View className='coupon-item-right'>
                        <View className='coupon-item_title'>
                          {item.coupons[0].couponName}
                        </View>
                        <View className='coupon-item_time'>
                          限{moment(item.exptime).format('YYYY-MM-DD h:mm:ss')}前使用
                        </View>
                      </View>
                    </View>
                    {item.status == -1 && (
                      <Image src={couponOverIcon} className='coupon-image-icon' />
                    )}
                  </View>
                )
              })}
            </View>
            {(!loading && !finished && !couponList.length) ? (
              <Empty type='notOrder' describe='您还没有优惠劵哦' />
            ) : (
              <LoadingMore loading={loading} finished={finished} />
            )}
          </ScrollView>
        </View>
      </Page>
    )
  }
}

export default Coupon
