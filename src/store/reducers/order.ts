import { CREATE_ORDER_INFO } from '_/store/constants'

interface StateFace {
  spuId: string | undefined,
  skuId: string | undefined,
  source: string | undefined, // 商品来源
  addressBookId: number | undefined, // 收货地址
  couponId: number | undefined, // 优惠劵id
  goodsNum: number | undefined // 商品数量
}

const INITIAL_STATE: StateFace = {
  spuId: undefined,
  skuId: undefined,
  source: undefined,
  addressBookId: undefined,
  couponId: undefined,
  goodsNum: undefined
}

export default function order (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_ORDER_INFO: {
      return Object.assign({}, state, action.data)
    }
    default:
      return state
  }
}
