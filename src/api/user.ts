import http from '_/utils/request'

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
