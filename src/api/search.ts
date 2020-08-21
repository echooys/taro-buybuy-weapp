import http from '_/utils/request'

/**
 * 热门搜索关键词
 */
export function hotSearchKeyWords () {
  return http({
    url: '/goods/search/hot-keyword',
    method: 'GET'
  })
}

/**
 * 搜索商品
 * @param params
 */
export function search (params) {
  return http({
    url: '/goods/search',
    method: 'GET',
    data: params
  })
}
