import { GET_USER_INFO } from '_/store/constants/user'
import { getUserInfo } from '_/api/user'

export const changeInfo = (info) => {
  return {
    type: GET_USER_INFO,
    data: info
  }
}

export function asyncGetUserInfo () {
  return dispatch => {
    getUserInfo().then(res => {
      dispatch(changeInfo(res.data))
    })
  }
}
