import { CREATE_ORDER_INFO } from '_/store/constants'

export function createOrderInfo (data) {
  return {
    type: CREATE_ORDER_INFO,
    data: data
  }
}
