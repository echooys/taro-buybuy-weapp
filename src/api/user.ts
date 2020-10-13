import http from '_/utils/request'
import { appId } from '_/config/config'

/**
 * 授权登录
 * @param code 授权code
 * @param appId
 */
export function userAuth (code: string, appId: string) {
  return http({
    url: `/auth/session/${code}/${appId}`,
    method: 'GET'
  })
}

/**
 * 获取用户信息
 */
export function getUserInfo () {
  return http({
    url: '/user/center',
    method: 'GET'
  })
}

/**
 * 获取用户二维码
 */
export function getQrCode () {
  return http({
    url: '/user/center/qrcode/' + appId,
    method: 'GET'
  })
}

/**
 * 更新用户信息
 * @param data
 */
export function updateUserInfo (data) {
  return http({
    url: '/user/info',
    method: 'PUT',
    data
  })
}

/**
 * 获取用户钱包流水
 * @param startTime 开始时间
 * @param endTime 结束时间
 * @param page 页码
 * @param size 条数
 */
export function getUserWalletList (startTime, endTime, page, size) {
  return http(({
    url: `/user/center/wallet/${startTime}/${endTime}/${page}/${size}`,
    method: 'GET'
  }))
}

/**
 * 我的优惠劵
 * @param page 页码
 * @param size 条数
 */
export function getCouponList (page, size) {
  return http({
    url: `/user/center/coupon/${page}/${size}/0`,
    method: 'GET'
  })
}
