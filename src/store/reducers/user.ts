import { GET_USER_INFO } from '_/store/constants/user'

const INITIAL_STATE = {}

export default function user (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}
