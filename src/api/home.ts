import http from '_/utils/request'

/**
 * 获取首页商品
 * @param page  分页
 */
export function getHomeHotProduct (page) {
  return http({
    url: '/index/hot-goods/1/' + page,
    method: 'GET'
  })
}
