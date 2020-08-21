import Taro from '@tarojs/taro'
import { logError } from '_/utils/common'

export function setStorage (key: string, value: any) {
  if (!key || !value) {
    logError('error', 'set', '请传入key value')
    return
  }

  Taro.setStorageSync(key, value)
}

export function getStorage (key: string): any {
  return Taro.getStorageSync(key)
}
