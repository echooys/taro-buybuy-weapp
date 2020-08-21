import Taro from '@tarojs/taro'

export interface SystemInfoFace extends Taro.getSystemInfoSync.Result {
  navBarExtendHeight: number,
  navBarHeight: number
  capsulePosition: any,
  ios: boolean
}

/**
 * 获取navBar 位置信息
 * @return Taro.getSystemInfoSync.Result
 */
export default function () {
  // 设配信息
  const systemInfo = <SystemInfoFace>Taro.getSystemInfoSync()
  // ios
  const ios = !!(systemInfo.system.toLowerCase().search('ios') + 1)
  // 微信小程序胶囊位置
  const rect = Taro.getMenuButtonBoundingClientRect()
  // navBar 位置信息
  let navBarHeight = 0
  if (!systemInfo.statusBarHeight) {
    //开启wifi和打电话下
    systemInfo.statusBarHeight = systemInfo.screenHeight -
      systemInfo.windowHeight - 20
    navBarHeight = (function () {
      let gap = rect.top - systemInfo.statusBarHeight
      return 2 * gap + rect.height
    })()
    systemInfo.statusBarHeight = 0
    //下方扩展4像素高度 防止下方边距太小
    systemInfo.navBarExtendHeight = 0
  } else {
    navBarHeight = (function () {
      let gap = rect.top - systemInfo.statusBarHeight
      return systemInfo.statusBarHeight + 2 * gap + rect.height
    })()
    if (ios) {
      //下方扩展4像素高度 防止下方边距太小
      systemInfo.navBarExtendHeight = 4
    } else {
      systemInfo.navBarExtendHeight = 0
    }
  }
  //导航栏高度不包括statusBarHeight
  systemInfo.navBarHeight = navBarHeight
  // 右上角胶囊按钮信息bottom: 58 height: 32 left: 317 right: 404 top: 26 width: 87 目前发现在大多机型都是固定值
  // 为防止不一样所以会使用动态值来计算nav元素大小
  systemInfo.capsulePosition = rect
  systemInfo.ios = ios //是否ios
  return systemInfo
}
