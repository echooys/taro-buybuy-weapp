import * as React from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { ScrollView, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import Page from '_/components/Page'
import { Touch } from '_/utils/touch'
import { toRouter } from '_/utils/common'
import { getAddressList } from '_/store/actions/address'
import { deleteAddress, putAddress } from '_/api/address'
import { AddressFace } from '_/store/reducers/address'

import './index.less'

class Address extends React.Component<any, any> {
  constructor (props) {
    super(props)
    this.state = {
      touch: new Touch(),
      items: []
    }
  }

  componentDidMount () {
    const { getAddressListHandle } = this.props
    getAddressListHandle()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.address !== this.props.address) {
      this.changeItems(this.props.address)
    }
  }

  changeItems (address) {
    this.setState({ items: address })
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

  /**
   * 删除收货地址
   * @param item
   */
  handleDelete (item: AddressFace) {
    Taro.showModal({
      title: '确认',
      content: '您确认要删除该收货地址吗？'
    }).then(() => {
      Taro.showLoading({ title: '删除中...' })
      deleteAddress(item.addressBookId).then(({ result }) => {
        if (result) {
          this.props.getAddressListHandle()
          Taro.showToast({ icon: 'success', title: '删除成功！' })
        }
      }).finally(() => {
        Taro.hideLoading()
      })
    })
  }

  /**
   * 设置为默认收货地址
   * @param item
   */
  handleSetDefault (item: AddressFace) {
    Taro.showModal({
      title: '确认',
      content: '您确定要将该地址设定为默认地址吗？'
    }).then(() => {
      Taro.showLoading({ title: '删除中...' })
      const data = Object.assign({}, item, { isDefault: true })
      putAddress(item.addressBookId, data).then(({ result }) => {
        if (result) {
          this.props.getAddressListHandle()
          Taro.showToast({ icon: 'success', title: '设置成功！' })
        }
      }).finally(() => {
        Taro.hideLoading()
      })
    })
  }

  render (): JSX.Element {
    const { items } = this.state
    return (
      <Page>
        <View className='page-view'>
          <ScrollView className='page-scroll' scrollY>
            <View className='address-list'>
              {items.map((item, key) => {
                return (
                  <View
                    className={classNames(
                      'address-item', { 'touch-move-active': item.isTouchMove }
                    )}
                    key={key}
                    onTouchStart={this.handleTouchStart.bind(this)}
                    onTouchMove={e => this.handleTouchMove(e, key)}
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
                          <Text
                            className='address-item__right_text'
                            onClick={() => toRouter(
                              `/pages/personal/addressManager/index?id=${item.addressBookId}`)}
                          >
                            编辑
                          </Text>
                        </View>
                      </View>
                      <View className='address-item__action'>
                        <View
                          className='address-item__action_btn default'
                          onClick={this.handleSetDefault.bind(this, item)}
                        >
                          设为默认
                        </View>
                        <View
                          className='address-item__action_btn delete'
                          onClick={this.handleDelete.bind(this, item)}
                        >
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
          <View
            className='address-manager--submit'
            onClick={() => toRouter('/pages/personal/addressManager/index')}
          >
            添加收货地址
          </View>
        </View>
      </Page>
    )
  }
}

const mapStateToProps = state => {
  return {
    address: state.address.list
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getAddressListHandle: () => {
      dispatch(getAddressList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Address)
