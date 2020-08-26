import http from '_/utils/request'

/**
 * 获取首页商品
 * @param page  分页
 * @param size  分页条数
 */
export function getHomeHotProduct (page, size) {
  return http({
    url: `/index/hot-goods/1/${page}/${size}`,
    method: 'GET'
  })
}
