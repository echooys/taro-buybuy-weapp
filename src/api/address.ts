import http from '_/utils/request'

/**
 * 获取四级级省市区街道
 * @param code 查询 的父级 criCode
 * @return Promise
 */
export function getAreaCode (code: string | number) {
  return http({
    url: `/address/area/${code}`,
    method: 'GET'
  })
}

/**
 * 获取用户收货地址
 */
export function getAddress () {
  return http({
    url: '/user/delivery-address',
    method: 'GET'
  })
}

/**
 * 添加收货地址
 * @param data
 */
export function addAddress (data) {
  return http({
    url: '/user/delivery-address',
    method: 'POST',
    data
  })
}

/**
 * 删除收货地址
 * @param id
 */
export function deleteAddress (id) {
  return http({
    url: `/user/delivery-address/${id}`,
    method: 'DELETE'
  })
}

/**
 * 编辑收货地址
 * @param id
 * @param data
 */
export function putAddress (id, data) {
  return http({
    url: `/user/delivery-address/${id}`,
    method: 'PUT',
    data
  })
}
