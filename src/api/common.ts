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
export function searchProduct (params) {
  return http({
    url: '/goods/search',
    method: 'GET',
    data: params
  })
}

/**
 * 商品详情
 * @param spuId
 * @param type
 */
export function getGoodsDetails (spuId, type) {
  return http({
    url: `/goods/detail/${spuId}/${type}`,
    method: 'GET'
  })
}
