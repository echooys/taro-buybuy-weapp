import { GET_ADDRESS_LIST } from '_/store/constants/address'

export interface AddressFace {
  addressBookId: number
  provinceId: number
  cityId: number
  areaId: number
  streetId: number
  address: string
  isDefault: boolean
  mobile: string
  realName: string
  userId: string
  fullAddress: string
}

interface addressStateFace {
  list: AddressFace[]
  default: AddressFace | undefined
}

const INITIAL_STATE: addressStateFace = {
  list: [],
  default: undefined
}

export default function address (
  state: addressStateFace = INITIAL_STATE, action): addressStateFace {
  switch (action.type) {
    case GET_ADDRESS_LIST:
      return {
        list: action.data,
        default: action.data.find(item => item.isDefault)
      }
    default:
      return state
  }
}
