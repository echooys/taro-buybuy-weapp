import Taro from '@tarojs/taro'

export const GoodTypes = {
  'TAOBAO': '淘宝',
  'JD': '京东',
  'PDD': '拼多多'
}

export function toRouter (url: string, params?: object) {
  let _url = url
  if (params) _url += '?' + urlEncode(params)
  Taro.navigateTo({
    url: _url
  }).finally(() => {})
}

function urlEncode (param, key?: string, encode?: string) {
  if (param == null) return ''
  let paramStr = ''
  const t = typeof (param)
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramStr += '&' + key + '=' +
      ((encode == null || encode) ? encodeURIComponent(param) : param)
  } else {
    for (let i in param) {
      let k = key == null ? i : key +
        (param instanceof Array ? '[' + i + ']' : '.' + i)
      paramStr += urlEncode(param[i], k, encode)
    }
  }
  return paramStr
}
