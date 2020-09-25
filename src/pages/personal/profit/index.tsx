import * as React from 'react'
import Page from '_/components/Page'
import { Image, ScrollView, Text, View } from '@tarojs/components'
import Icon from '_/components/Icon'

import './index.less'
import balanceIcon from '../../../assets/common/wallet-icon.png'

class Profit extends React.Component<any, any> {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {

  }

  render () {
    return (
      <Page>
        <View className='profit-header'>
          <View className='profit-header--timeSlot'>
            <View className='profit-header--timeSlot_item active'>
              <Icon name='yuejie' size={16} color={'#FA6400 '} />
              <Text className='text'>本月收入</Text>
            </View>
            <View className='profit-header--timeSlot_item'>
              <Icon name='rili' size={16} color={'#FA6400 '} />
              <Text className='text'>半年收入</Text>
            </View>
          </View>
          <View className='profit-header--balance'>
            <Image
              src={balanceIcon}
              className='profit-header--balance_icon'
            />
            <Text className='profit-header--balance_text'>4319.02</Text>
          </View>
          <View className='profit-header--timeFrame'>
            <View className='profit-header--timeFrame_item'>
              <Text className='text'>起 2019年05月</Text>
              <Icon name='xia' size={12} color='#fff' />
            </View>
            <View className='profit-header--timeFrame_item'>
              <Text className='text'>止 2019年05月</Text>
              <Icon name='xia' size={12} color='#fff' />
            </View>
            <View className='profit-header--timeFrame_button'>筛选</View>
          </View>
        </View>
        <View className='radius-header' />
        <View className='page-view page-content'>
          <ScrollView className='page-scroll' style={{ backgroundColor: '#fff' }}>
            <View className='profit-list-title'>佣金明细</View>
            <View className='profit-detail-item'>
              <Icon name='RectangleCopy' size={40} color='#FA6400' />
              <View className='profit-detail-item__content'>
                <View className='profit-detail-item__type'>
                  <Text className='profit-detail-item__title'>佣金收入</Text>
                  <Text className='profit-detail-item__time'>2020-07-02
                    14:32</Text>
                </View>
                <Text className='profit-detail-item__price'>-￥400.00</Text>
              </View>
            </View>
            <View className='profit-detail-item'>
              <Icon name='RectangleCopy' size={40} color='#FA6400' />
              <View className='profit-detail-item__content'>
                <View className='profit-detail-item__type'>
                  <Text className='profit-detail-item__title'>佣金收入</Text>
                  <Text className='profit-detail-item__time'>2020-07-02
                    14:32</Text>
                </View>
                <Text className='profit-detail-item__price'>-￥400.00</Text>
              </View>
            </View>
            <View className='profit-detail-item'>
              <Icon name='RectangleCopy' size={40} color='#FA6400' />
              <View className='profit-detail-item__content'>
                <View className='profit-detail-item__type'>
                  <Text className='profit-detail-item__title'>佣金收入</Text>
                  <Text className='profit-detail-item__time'>2020-07-02
                    14:32</Text>
                </View>
                <Text className='profit-detail-item__price'>-￥400.00</Text>
              </View>
            </View>
            <View className='profit-detail-item'>
              <Icon name='RectangleCopy' size={40} color='#FA6400' />
              <View className='profit-detail-item__content'>
                <View className='profit-detail-item__type'>
                  <Text className='profit-detail-item__title'>佣金收入</Text>
                  <Text className='profit-detail-item__time'>2020-07-02
                    14:32</Text>
                </View>
                <Text className='profit-detail-item__price'>-￥400.00</Text>
              </View>
            </View>
            <View className='profit-detail-item'>
              <Icon name='RectangleCopy' size={40} color='#FA6400' />
              <View className='profit-detail-item__content'>
                <View className='profit-detail-item__type'>
                  <Text className='profit-detail-item__title'>佣金收入</Text>
                  <Text className='profit-detail-item__time'>2020-07-02
                    14:32</Text>
                </View>
                <Text className='profit-detail-item__price'>-￥400.00</Text>
              </View>
            </View>
            <View className='profit-detail-item'>
              <Icon name='RectangleCopy' size={40} color='#FA6400' />
              <View className='profit-detail-item__content'>
                <View className='profit-detail-item__type'>
                  <Text className='profit-detail-item__title'>佣金收入</Text>
                  <Text className='profit-detail-item__time'>2020-07-02
                    14:32</Text>
                </View>
                <Text className='profit-detail-item__price'>-￥400.00</Text>
              </View>
            </View>
            <View className='profit-detail-item'>
              <Icon name='RectangleCopy' size={40} color='#FA6400' />
              <View className='profit-detail-item__content'>
                <View className='profit-detail-item__type'>
                  <Text className='profit-detail-item__title'>佣金收入</Text>
                  <Text className='profit-detail-item__time'>2020-07-02
                    14:32</Text>
                </View>
                <Text className='profit-detail-item__price'>-￥400.00</Text>
              </View>
            </View>
            <View className='profit-detail-item'>
              <Icon name='RectangleCopy' size={40} color='#FA6400' />
              <View className='profit-detail-item__content'>
                <View className='profit-detail-item__type'>
                  <Text className='profit-detail-item__title'>佣金收入</Text>
                  <Text className='profit-detail-item__time'>2020-07-02
                    14:32</Text>
                </View>
                <Text className='profit-detail-item__price'>-￥400.00</Text>
              </View>
            </View>
            <View className='profit-detail-item'>
              <Icon name='RectangleCopy' size={40} color='#FA6400' />
              <View className='profit-detail-item__content'>
                <View className='profit-detail-item__type'>
                  <Text className='profit-detail-item__title'>佣金收入</Text>
                  <Text className='profit-detail-item__time'>2020-07-02
                    14:32</Text>
                </View>
                <Text className='profit-detail-item__price'>-￥400.00</Text>
              </View>
            </View>
            <View className='profit-detail-item'>
              <Icon name='RectangleCopy' size={40} color='#FA6400' />
              <View className='profit-detail-item__content'>
                <View className='profit-detail-item__type'>
                  <Text className='profit-detail-item__title'>佣金收入</Text>
                  <Text className='profit-detail-item__time'>2020-07-02
                    14:32</Text>
                </View>
                <Text className='profit-detail-item__price'>-￥400.00</Text>
              </View>
            </View>
            <View className='profit-detail-item'>
              <Icon name='RectangleCopy' size={40} color='#FA6400' />
              <View className='profit-detail-item__content'>
                <View className='profit-detail-item__type'>
                  <Text className='profit-detail-item__title'>佣金收入</Text>
                  <Text className='profit-detail-item__time'>2020-07-02
                    14:32</Text>
                </View>
                <Text className='profit-detail-item__price'>-￥400.00</Text>
              </View>
            </View>
            <View className='profit-detail-item'>
              <Icon name='RectangleCopy' size={40} color='#FA6400' />
              <View className='profit-detail-item__content'>
                <View className='profit-detail-item__type'>
                  <Text className='profit-detail-item__title'>佣金收入</Text>
                  <Text className='profit-detail-item__time'>2020-07-02
                    14:32</Text>
                </View>
                <Text className='profit-detail-item__price'>-￥400.00</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </Page>
    )
  }
}

export default Profit
