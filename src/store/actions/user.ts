import { SET_USER_INFO, SET_USER_CENTER } from '_/store/constants/user'
import { getUserInfo } from '_/api/user'

/**
 * 设置用户个人信息
 */
export function setUserInfo () {
  return dispatch => {
    getUserInfo().then(res => {
      dispatch({
        type: SET_USER_INFO,
        data: res.data
      })
    })
  }
}

/**
 * 设置用户个人中心信息
 * @param data
 */
export function setUserCenter (data) {
  return {
    type: SET_USER_CENTER,
    data: data
  }
}
