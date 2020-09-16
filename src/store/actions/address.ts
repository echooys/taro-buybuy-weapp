import { GET_ADDRESS_LIST } from '_/store/constants/address'
import { getAddress } from '_/api/address'

/**
 * 获取所有收货地址
 */
export function getAddressList () {
  return dispatch => {
    getAddress().then(res => {
      const { data, result } = res
      if (result === 'ok') {
        dispatch({
          type: GET_ADDRESS_LIST,
          data: data
        })
      }
    })
  }
}
