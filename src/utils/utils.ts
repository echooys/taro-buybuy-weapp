import Taro from '@tarojs/taro'

export function json2Form (json: any) {
  const arr = []
  for (let p in json) {
    // @ts-ignore
    arr.push(`${p}=${json[p]}`)
  }

  return arr.join('&')
}

export function isObject (obj) {
  return obj !== null && typeof obj == 'object'
}

export function isUndefined (value) {
  return value === void 0
}

export function isBoolean (value) {
  return typeof value == 'boolean'
}

export function isString (value) {
  return typeof value == 'string'
}

export function isFunction (obj) {
  return typeof obj == 'function'
}

export function compare (property) {
  return function (a, b) {
    return (a[property] - b[property])
  }
}

export function pxTransform (size: number): string {
  if (!size) return ''
  const designWidth = 750
  const deviceRatio = {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  }
  return `${size / deviceRatio[designWidth]}rpx`
}

export const objectToString = (style: object | string): string => {
  if (style && typeof style === 'object') {
    let styleStr = ''
    Object.keys(style).forEach(key => {
      const lowerCaseKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      styleStr += `${lowerCaseKey}:${style[key]};`
    })
    return styleStr
  } else if (style) {
    return style
  }
  return ''
}

/**
 * 合并 style
 * @param {Object|String} style1
 * @param {Object|String} style2
 * @returns {String}
 */
export function mergeStyle (
  style1: object | string,
  style2: object | string
): object | string {
  if (
    style1 &&
    typeof style1 === 'object' &&
    style2 &&
    typeof style2 === 'object'
  ) {
    return Object.assign({}, style1, style2)
  }
  return objectToString(style1) + objectToString(style2)
}

/**
 * 时间转换
 * @param date 格式化时间
 * @return {string} 返回值
 */
export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' +
    [hour, minute, second].map(formatNumber).join(':')
}

/**
 * 转换string类型
 * @param n 转换数字
 * @return {string} 返回字符串
 */
export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 错误日志打印
 * @param name
 * @param action
 * @param info
 */
export const logError = (name, action, info: any) => {
  let device: any
  if (!info) {
    info = 'empty'
  }
  try {
    let deviceInfo = Taro.getSystemInfoSync()
    device = JSON.stringify(deviceInfo)
  } catch (err) {
    console.error('not support getSystemInfoSync api', err.message)
  }
  let time = formatTime(new Date())
  if (typeof info === 'object') {
    info = JSON.stringify(info)
  }
  console.error(time, name, action, info, device)
}

export function requestAnimationFrame (cb: Function) {
  return Taro.createSelectorQuery().
    selectViewport().
    boundingClientRect().
    exec(() => {
      cb()
    })
}
