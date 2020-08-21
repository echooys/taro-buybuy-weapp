import Taro from '@tarojs/taro'
import { noConsole, mainHost, commonHeader } from '_/config'
import { HTTP_STATUS } from '_/utils/httpStatus'
import { logError } from '_/utils/common'

export default function http (options: Taro.request.Option) {
  if (!noConsole) {
    console.log(`【 M=${options.url}】P=${JSON.stringify(options.data)}`)
  }
  // 请求携带token
  const _token = Taro.getStorageSync('token')
  return Taro.request({
    url: mainHost + options.url,
    data: options.data,
    header: {
      ...commonHeader,
      'Content-Type': 'application/json',
      'Authorization': _token
    },
    method: options.method
  }).then((res) => {
    const { statusCode, data } = res
    if (statusCode === HTTP_STATUS.NOT_FOUND) {
      return logError('api', statusCode, '请求资源不存在')
    } else if (statusCode === HTTP_STATUS.BAD_GATEWAY) {
      return logError('api', statusCode, '服务端出现了问题')
    } else if (statusCode === HTTP_STATUS.FORBIDDEN) {
      return logError('api', statusCode, '没有权限访问')
    } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
      if (!noConsole) {
        console.log(`【 M=${options.url} 】【接口响应：】`, res.data)
      }
      return data
    } else {
      return logError('api', '请求接口出现问题', res)
    }
  })
}

/**
 * get请求
 * @param options
 */
export function get (options: Taro.request.Option) {
  return http(Object.assign({}, options, { method: 'get' }))
}

/**
 * post 请求
 * @param options
 */
export function post (options: Taro.request.Option) {
  return http(Object.assign({}, options, { method: 'post' }))
}
