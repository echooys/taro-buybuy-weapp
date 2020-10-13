import * as React from 'react'
import {
  Image,
  PickerView,
  PickerViewColumn,
  ScrollView,
  Text,
  View
} from '@tarojs/components'
import classNames from 'classnames'
import { connect } from 'react-redux'
import moment from 'moment'
import Page from '_/components/Page'
import Icon from '_/components/Icon'
import Popup from '_/components/Popup'
import { getUserWalletList } from '_/api/user'
import LoadingMore from '_/components/LoadingMore'
import balanceIcon from '../../../assets/common/wallet-icon.png'

import './index.less'

const ProfitType = {
  1: '佣金收入',
  2: '佣金支出',
  3: '佣金转账',
  4: '佣金提现'
}

function getYearList (start: number, end: number) {
  let _length: number = end - start
  let list: Array<number> = []
  for (let index = 0; index < _length; index++) {
    list.push(start + index + 1)
  }
  return list
}

function getMonthList () {
  const num: number = 12
  let list: Array<number> = []
  for (let i = 0; i < num; i++) {
    list.push(i + 1)
  }
  return list
}

class Profit extends React.Component<any, any> {
  constructor (props) {
    super(props)
    this.state = {
      year: getYearList(1970, 2035),
      month: getMonthList(),
      pickerValue: [],
      startTime: undefined,
      endTime: undefined,
      type: undefined,
      isOpened: false,
      timeSlot: 0,
      list: [],
      loading: false,
      finished: true,
      page: 1,
      size: 12
    }
  }

  componentDidMount () {
    const { year, month } = this.state
    const _time = moment(new Date())
    let _year = year.findIndex(v => v === Number(_time.format('YYYY')))
    let _month = month.findIndex(v => v === Number(_time.format('MM')))
    this.setState({
      pickerValue: [_year, _month],
      startTime: `${_time.format('YYYY-MM')}`,
      endTime: `${_time.format('YYYY-MM')}`
    }, () => {
      this.load()
    })
  }

  load () {
    const { list, startTime, endTime, page, size } = this.state
    this.setState({ loading: true })
    getUserWalletList(startTime, endTime, page, size).then(res => {
      console.log(res)
      const { result, data: { items, pageInfo } } = res
      if (result === 'ok') {
        this.setState({
          list: list.concat(items),
          loading: false,
          page: page + 1,
          finished: items.length === Number(pageInfo.pageSize)
        })
      }
    })
  }

  onEmptyDataLoad () {
    this.setState({
      list: [],
      loading: false,
      page: 1,
      finished: true
    }, () => {
      this.load()
    })
  }

  changeTimeSlotHandle (index: number) {
    let state = { startTime: '', endTime: '' }
    if (index === 0) {
      // 本月
      const _time = moment(new Date())
      state.startTime = `${_time.format('YYYY-MM')}`
      state.endTime = `${_time.format('YYYY-MM')}`
    } else {
      state.startTime = `${moment(new Date()).
        subtract(6, 'month').
        format('YYYY-MM')}`
      state.endTime = `${moment(new Date()).format('YYYY-MM')}`
    }

    this.setState({ timeSlot: index, ...state }, () => {
      this.onEmptyDataLoad()
    })
  }

  closePopupHandle () {
    this.setState({ isOpened: false })
  }

  openTimeSelect (type) {
    const { startTime, endTime, year, month } = this.state
    let pickerValue: Array<number>
    if (type === 'start') {
      let _year = Number(moment(startTime).format('YYYY'))
      let _month = Number(moment(startTime).format('MM'))
      pickerValue = [
        year.findIndex(v => v === _year),
        month.findIndex(v => v === _month)
      ]
    } else {
      let _year = Number(moment(endTime).format('YYYY'))
      let _month = Number(moment(endTime).format('MM'))
      pickerValue = [
        year.findIndex(v => v === _year),
        month.findIndex(v => v === _month)
      ]
    }
    this.setState({ isOpened: true, pickerValue, type })
  }

  onPickerChange (e) {
    this.setState({ pickerValue: e.detail.value })
  }

  onConfirmPicker () {
    const { type, pickerValue, year, month } = this.state
    const _time = `${year[pickerValue[0]]}-${month[pickerValue[1]]}`
    const state: { [key in string]: string } = {}
    if (type === 'start') {
      state.startTime = _time
    } else {
      state.endTime = _time
    }
    this.setState({ isOpened: false, ...state })
  }

  render () {
    const {
      timeSlot,
      list,
      loading,
      finished,
      isOpened,
      year,
      month,
      pickerValue,
      startTime,
      endTime
    } = this.state
    const { user: { userCenter: { walletInfo } } } = this.props
    return (
      <Page>
        <View className='profit-header'>
          <View className='profit-header--timeSlot'>
            <View
              className={classNames('profit-header--timeSlot_item',
                { 'active': timeSlot === 0 })}
              onClick={this.changeTimeSlotHandle.bind(this, 0)}
            >
              <Icon name='yuejie' size={16} color='#FA6400' />
              <Text className='text'>本月收入</Text>
            </View>
            <View
              className={classNames('profit-header--timeSlot_item',
                { 'active': timeSlot === 1 })}
              onClick={this.changeTimeSlotHandle.bind(this, 1)}
            >
              <Icon name='rili' size={16} color='#FA6400' />
              <Text className='text'>半年收入</Text>
            </View>
          </View>
          <View className='profit-header--balance'>
            <Image
              src={balanceIcon}
              className='profit-header--balance_icon'
            />
            <Text className='profit-header--balance_text'>
              {walletInfo?.money.toFixed(2) || 0.00}
            </Text>
          </View>
          <View className='profit-header--timeFrame'>
            <View
              className='profit-header--timeFrame_item'
              onClick={this.openTimeSelect.bind(this, 'start')}
            >
              <Text className='text'>
                起 {moment(startTime).format('YYYY年MM月')}
              </Text>
              <Icon name='xia' size={12} color='#fff' />
            </View>
            <View
              className='profit-header--timeFrame_item'
              onClick={this.openTimeSelect.bind(this, 'end')}
            >
              <Text className='text'>
                止 {moment(endTime).format('YYYY年MM月')}
              </Text>
              <Icon name='xia' size={12} color='#fff' />
            </View>
            <View
              className='profit-header--timeFrame_button'
              onClick={this.onEmptyDataLoad.bind(this)}
            >
              筛选
            </View>
          </View>
        </View>
        <View className='radius-header' />
        <View className='page-view page-content'>
          <ScrollView
            className='page-scroll'
            style={{ backgroundColor: '#fff' }}
            onScrollToLower={this.load.bind(this)}
            scrollY
          >
            <View className='profit-list-title'>佣金明细</View>
            {list.map((item, key) => {
              return (
                <View className='profit-detail-item' key={key}>
                  <Icon name='RectangleCopy' size={40} color='#FA6400' />
                  <View className='profit-detail-item__content'>
                    <View className='profit-detail-item__type'>
                      <Text className='profit-detail-item__title'>{ProfitType[item.type]}</Text>
                      <Text className='profit-detail-item__time'>{moment(
                        item.updatedAt, 'YYYY-MM-DD')}</Text>
                    </View>
                    <Text className='profit-detail-item__price'>{item.amount}</Text>
                  </View>
                </View>
              )
            })}
            <LoadingMore loading={loading} finished={finished} />
          </ScrollView>
        </View>
        <Popup
          isOpened={isOpened}
          closeIcon={false}
          position='bottom'
          onClose={this.closePopupHandle.bind(this)}
        >
          <View className='time-select-wrapper'>
            <View className='time-select-header'>
              <Text
                style={{ color: '#777' }}
                onClick={this.closePopupHandle.bind(this)}
              >
                取消
              </Text>
              <Text
                style={{ color: 'green' }}
                onClick={this.onConfirmPicker.bind(this)}
              >
                确认
              </Text>
            </View>
            <PickerView
              className='time-select-picker-view'
              value={pickerValue}
              onChange={this.onPickerChange.bind(this)}
            >
              <PickerViewColumn>
                {year.map((value, key) => {
                  return <View className='item' key={key}>{value}年</View>
                })}
              </PickerViewColumn>
              <PickerViewColumn>
                {month.map((value, key) => {
                  return <View className='item' key={key}>{value}月</View>
                })}
              </PickerViewColumn>
            </PickerView>
          </View>
        </Popup>
      </Page>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user: user
  }
}

export default connect(mapStateToProps)(Profit)
