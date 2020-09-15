import http from '_/utils/request'

/**
 * 获取四级级省市区街道
 * @param code 查询 的父级 criCode
 */
export function getAreaCode (code: string | number) {
  return http({
    url: `/address/area/${code}`,
    method: 'GET'
  })
}
