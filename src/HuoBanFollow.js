import HuoBan from './HuoBan'

export default {
  create: (callback, itemId) => {
    HuoBan.post(callback, '/follow/item/' + itemId)
  },
  delete: (callback, refId) => {
    HuoBan.delete(callback, '/follow/item/' + refId)
  },
  getAll: (callback, itemId, attributes = {}) => {
    HuoBan.post(callback, '/follow/item/' + itemId + '/find', attributes)
  }
}
