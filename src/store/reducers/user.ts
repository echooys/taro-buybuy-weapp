import { SET_USER_INFO, SET_USER_CENTER } from '_/store/constants/user'

const INITIAL_STATE = {
  userInfo: {},
  userCenter: {}
}

export default function user (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER_INFO:
      return Object.assign({}, state, { userInfo: action.data })
    case SET_USER_CENTER:
      return Object.assign({}, state, { userCenter: action.data })
    default:
      return state
  }
}
