import HuoBan from './HuoBan'

export default {
  create: (callback, attributes = {}) => {
    HuoBan.post(callback, '/pay_order/', attributes)
  },
  order: (callback, orderNo) => {
    HuoBan.get(callback, '/pay_order/' + orderNo)
  }
}
