import Taro from '@tarojs/taro'

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
