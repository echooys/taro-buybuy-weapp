import * as React from 'react'
import { ScrollView, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import Page from '_/components/Page'
import { Touch } from '_/utils/touch'

import './index.less'

class Address extends React.Component<any, any> {
  constructor (props) {
    super(props)
    this.state = {
      touch: new Touch(),
      items: [
        {
          addressBookId: 1,
          provinceId: 1,
          cityId: 2,
          areaId: 3,
          streetId: 1,
          address: '4栋8号9-5',
          isDefault: true,
          mobile: '15823978441',
          realname: '张三',
          userId: '472357fa2b074cad9257166be1534abd',
          fullAddress: '北京天津河北省4栋8号9-5'
        },
        {
          addressBookId: 1,
          provinceId: 1,
          cityId: 2,
          areaId: 3,
          streetId: 1,
          address: '4栋8号9-5',
          isDefault: false,
          mobile: '15823978441',
          realname: '张三',
          userId: '472357fa2b074cad9257166be1534abd',
          fullAddress: '北京天津河北省4栋8号9-5'
        }
      ]
    }
  }

  handleTouchStart (e) {
    const { touch, items } = this.state
    const data = touch._touchstart(e, items)
    this.setState({
      items: data
    })
  }

  handleTouchMove (e, key: number) {
    const { touch, items } = this.state
    const data = touch._touchmove(e, items, key)
    this.setState({
      items: data
    })
  }

  render (): JSX.Element {
    const { items } = this.state
    return (
      <Page>
        <View className='page-view'>
          <ScrollView className='page-scroll'>
            <View className='address-list'>
              {items.map((item, key) => {
                return (
                  <View
                    className={classNames(
                      'address-item',
                      {
                        'touch-move-active': item.isTouchMove
                      }
                    )}
                    key={key}
                    onTouchStart={this.handleTouchStart.bind(this)}
                    onTouchMove={e => this.handleTouchMove.bind(this, e, key)}
                  >
                    <View className='address-item__wrapper'>
                      <View className='address-item__container'>
                        <View className='address-item__content'>
                          <View className='address-item__content_header'>
                            <Text className='address-item__content_header-name'>{item.realname}</Text>
                            <Text className='address-item__content_header-mobile'>{item.mobile}</Text>
                          </View>
                          <View className='address-item__content_desc'>
                            {item.isDefault && (
                              <Text className='address-item__content_default'>默认</Text>
                            )}
                            <Text className='address-item__content_more'>{item.fullAddress}</Text>
                          </View>
                        </View>
                        <View className='address-item__right'>
                          <Text className='address-item__right_text'>编辑</Text>
                        </View>
                      </View>
                      <View className='address-item__action'>
                        <View className='address-item__action_btn default'>
                          设为默认
                        </View>
                        <View className='address-item__action_btn delete'>
                          删除地址
                        </View>
                      </View>
                    </View>
                  </View>
                )
              })}
            </View>
          </ScrollView>
        </View>
        <View className='address-manager'>
          <View className='address-manager--submit'>
            添加收货地址
          </View>
        </View>
      </Page>
    )
  }
}

export default Address
