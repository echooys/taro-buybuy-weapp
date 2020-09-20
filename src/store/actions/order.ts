import { CREATE_ORDER_INFO } from '_/store/constants'

/**
 * 创建订单信息
 * @param data
 */
export function createOrderInfo (data) {
  return {
    type: CREATE_ORDER_INFO,
    data: data
  }
}
