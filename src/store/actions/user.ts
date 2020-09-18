import { SET_USER_INFO, SET_USER_CENTER } from '_/store/constants/index'
import { getUserInfo } from '_/api/user'

/**
 * 设置用户个人信息
 * @param data
 */
export function setUserInfo (data) {
  return {
    type: SET_USER_INFO,
    data: data
  }
}

/**
 * 设置用户个人中心信息
 */
export function setUserCenter () {
  return dispatch => {
    getUserInfo().then(res => {
      dispatch({
        type: SET_USER_CENTER,
        data: res.data
      })
    })
  }
}
