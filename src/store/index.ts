import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

const middleware = [
  thunkMiddleware
]

if (process.env.NODE_ENV === 'development' && process.env.TARO_ENV !==
  'quickapp') {
  middleware.push(require('redux-logger').createLogger())
}

const enhancer = compose(
  applyMiddleware(...middleware)
  // other store enhancers if any
)

export default function configStore () {
  return createStore(rootReducer, enhancer)
}
