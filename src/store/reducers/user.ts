import { SET_USER_INFO, SET_USER_CENTER } from '_/store/constants/index'

const INITIAL_STATE = {
  userInfo: {
    avatarUrl: '',
    nickName: ''
  },
  userCenter: {
    userLevel: {
      levelCode: '',
      expTime: '',
      description: '',
      progressBar: ''
    },
    taskInfo: {
      name: '',
      description: '',
      progressBar: ''
    },
    walletInfo: {
      money: 0
    },
    couponInfo: {
      description: ''
    }
  }
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
