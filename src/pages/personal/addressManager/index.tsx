import * as React from 'react'
import classNames from 'classnames'
import { Input, ScrollView, Text, Textarea, View } from '@tarojs/components'
import Page from '_/components/Page'
import Icon from '_/components/Icon'
import Popup from '_/components/Popup'
import { getAreaCode } from '_/api/address'

import './index.less'

interface AddressFaceState {
  provinceId: number // 收货地址id
  streetId: number
  cityId: number
  areaId: number
  chineseAddress: string | undefined
  address: string
  isDefault: boolean
  mobile: string
  realName: string
  isOpened: boolean
  areaList: any[],
  selectMap: SelectMapFace[]
  currentIndex: number
}

interface SelectMapFace {
  name: string
  ariCode: undefined | string
  ariId: number
}

class AddressManager extends React.Component<any, AddressFaceState> {
  constructor (props) {
    super(props)
    this.state = {
      provinceId: 0, // 收货地址id
      streetId: 0,
      cityId: 0,
      areaId: 0,
      chineseAddress: undefined,

      address: '4栋8号9-5',
      isDefault: true,
      mobile: '15823978441',
      realName: '张三',

      isOpened: false,
      areaList: [],
      selectMap: [
        { name: '请选择', ariCode: undefined, ariId: 0 }
      ],
      currentIndex: 0
    }
  }

  changeName () {

  }

  changeMobile () {

  }

  changeAddress () {

  }

  /**
   * 根据code获取下级地区
   * @param code
   */
  getAppointAreaHandle (code: string | number) {
    return new Promise(resolve => {
      getAreaCode(code).then(res => {
        const { result, data } = res
        if (result === 'ok') {
          resolve(data)
        }
      })
    })
  }

  /**
   * 打开城市选择model
   */
  openSelectAddressModel () {
    this.setState({ isOpened: true })
    this.getAppointAreaHandle(0).then((list: any[]) => {
      this.setState({
        areaList: list,
        currentIndex: 0,
        selectMap: [
          {
            name: '请选择',
            ariCode: undefined,
            ariId: 0
          }
        ]
      })
    })
  }

  /**
   * 关闭城市选择model
   */
  closeSelectAddressModel () {
    this.setState({ isOpened: false })
  }

  /**
   * 变更城市
   * @param index
   */
  changeAreaHandle (index: number) {
    this.setState({
      currentIndex: index,
      selectMap: this.state.selectMap.slice(0, index + 1)
    }, () => {
      const { selectMap } = this.state
      const code = index === 0 ? 0 : selectMap[index - 1].ariCode || 0
      this.getAppointAreaHandle(code).then((list: any[]) => {
        this.setState({ areaList: list })
      })
    })
  }

  /**
   * 选择地区
   * @param item
   */
  selectArea (item: any) {
    let { selectMap } = this.state
    selectMap[selectMap.length - 1] = {
      name: item.criName,
      ariCode: item.criCode,
      ariId: item.criId
    }
    this.setState({ selectMap: selectMap, currentIndex: selectMap.length })
    this.getAppointAreaHandle(item.criCode).then((list: any[]) => {
      if (list && list.length) {
        let newSelectMap = this.state.selectMap.concat({
          name: '请选择',
          ariCode: undefined,
          ariId: 0
        })
        this.setState({ areaList: list, selectMap: newSelectMap })
      } else {
        this.setState({ areaList: [], isOpened: false })
      }
    })
  }

  handleCityData () {
    const { selectMap } = this.state
    if (selectMap.length === 4) {
      console.log(selectMap)
    }
  }

  render () {
    const {
      chineseAddress,
      realName,
      mobile,
      isDefault,
      address,
      isOpened,
      areaList,
      selectMap,
      currentIndex
    } = this.state
    return (
      <Page>
        <View className='page-view'>
          <ScrollView className='page-scroll' scrollY>
            <View className='address-manager--content'>
              <View className='address-manager--item'>
                <View className='address-manager--item_content'>
                  <View className='address-manager--item_label'>
                    收货人
                  </View>
                  <View className='address-manager--item_flex'>
                    <Input
                      placeholder='请输入收货人姓名'
                      value={realName}
                      className='address-manager--item_input'
                    />
                  </View>
                </View>
              </View>
              <View className='address-manager--item'>
                <View className='address-manager--item_content'>
                  <View className='address-manager--item_label'>
                    手机号码
                  </View>
                  <View className='address-manager--item_flex'>
                    <Input
                      placeholder='请输入手机号码'
                      value={mobile}
                      type='number'
                      className='address-manager--item_input'
                    />
                  </View>
                </View>
              </View>
              <View className='address-manager--item'>
                <View className='address-manager--item_content'>
                  <View className='address-manager--item_label'>
                    所在地区
                  </View>
                  <View
                    className='address-manager--item_flex'
                    onClick={this.openSelectAddressModel.bind(this)}
                  >
                    <View className='address-manager--item_text'>
                      {chineseAddress || '请选择地区'}
                    </View>
                    <Icon name='more' size={14} color='#777' />
                  </View>
                </View>
              </View>
              <View className='address-manager--item'>
                <View className='address-manager--item_content'>
                  <View className='address-manager--item_label'>
                    详细地址
                  </View>
                  <View className='address-manager--item_flex'>
                    <Input
                      placeholder='请输入收货人姓名'
                      value={address}
                      className='address-manager--item_input'
                    />
                  </View>
                </View>
              </View>
              <View className='address-manager--epItem'>
                <View className='address-manager--epItem_flex'>
                  <View className='address-manager--epItem_title'>设置为默认地址</View>
                  <View className='address-manager--epItem_desc'>每次下单会默认该地址</View>
                </View>
                <View className='address-manager--epItem_checkbox'>
                  <Icon
                    name='xuanzhong-01'
                    size={18}
                    color={isDefault ? '#f96620' : '#ccc'}
                  />
                </View>
              </View>
              <View className='address-manager--epItem'>
                <View className='address-manager--epItem_flex'>
                  <View className='address-manager--epItem_title'>备注</View>
                  <View className='address-manager--epItem_desc'>
                    <Textarea
                      className='address-manager--epItem_textarea'
                      maxlength={200}
                      placeholder='请输入备注'
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View className='address-manager'>
          <View className='address-manager--submit'>
            保存并使用
          </View>
        </View>
        <Popup
          isOpened={isOpened}
          onClose={this.closeSelectAddressModel.bind(this)}
          position='bottom'
        >
          <View className='select-address__wrapper'>
            <View className='select-address__title'>配送至</View>
            <View className='select-address__area'>
              {selectMap.map((item, key) => {
                return (
                  <Text
                    className={classNames('select-address__area_text', {
                      'active': key === currentIndex
                    })}
                    onClick={this.changeAreaHandle.bind(this, key)}
                    key={key}
                  >
                    {item.name}
                  </Text>
                )
              })}
            </View>
            <View className='select-address__list'>
              <ScrollView className='page-scroll' scrollY>
                {areaList.map((item, key) => {
                  return (
                    <View
                      onClick={this.selectArea.bind(this, item)}
                      key={key}
                      className='select-address__item'
                    >
                      {item.criName}
                    </View>
                  )
                })}
              </ScrollView>
            </View>
          </View>
        </Popup>
      </Page>
    )
  }
}

export default AddressManager
