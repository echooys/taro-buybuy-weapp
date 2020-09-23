import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configStore from './store'
import './app.less'
import './custom-variables.scss'
// eslint-disable-next-line import/first
import 'taro-ui/dist/style/index.scss'

const store = configStore()

class App extends Component {
  componentDidMount () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
