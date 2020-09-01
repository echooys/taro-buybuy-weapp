import Taro from '@tarojs/taro'

const redis = 'buybuy-redis'

/**
 * 设置
 * k 键key
 * v 值value
 * t 秒
 */
function put (k, v, t) {
  Taro.setStorageSync(k, v)
  let seconds = parseInt(t)
  if (seconds > 0) {
    let newTime = Date.parse(String(new Date()))
    newTime = newTime / 1000 + seconds
    Taro.setStorageSync(k + redis, newTime + '')
  } else {
    Taro.removeStorageSync(k + redis)
  }
}

/**
 * 获取
 * k 键key
 */
function get (k) {
  let deadTime = parseInt(Taro.getStorageSync(k + redis))
  if (deadTime) {
    if (parseInt(String(deadTime)) < Date.parse(String(new Date())) / 1000) {
      Taro.removeStorageSync(k)
      return null
    }
  }
  const res = Taro.getStorageSync(k)
  if (res) {
    return res
  } else {
    return null
  }
}

/**
 * 删除
 */
function remove (k) {
  Taro.removeStorageSync(k)
  Taro.removeStorageSync(k + redis)
}

/**
 * 清除所有key
 */
function clear () {
  Taro.clearStorageSync()
}

export {
  put,
  get,
  remove,
  clear
}
