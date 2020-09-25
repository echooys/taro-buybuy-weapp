import http from '_/utils/request'

/**
 * 获取订单列表
 * @param status
 * @param page
 * @param size
 */
export function getOrderList (status, page, size) {
  return http({
    url: `/user/center/order/${status}/${page}/${size}`,
    method: 'GET'
  })
}
