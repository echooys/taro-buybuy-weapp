import { combineReducers } from 'redux'
import user from './user'
import address from './address'
import order from './order'

export default combineReducers({
  user,
  order,
  address
})
