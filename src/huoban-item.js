import huoban from './huoban'
import _ from 'lodash'

export default {
  find: (args) => {
    return new Promise(function (resolve, reject) {
      args.url = '/item/table/' + args.tableId + '/find'
      huoban.post(args).then((response) => {
        resolve(response)
      })
    })
  },
  update: (args) => {
    return new Promise(function (resolve, reject) {
      args.url = '/item/' + args.itemId
      huoban.put(args).then((response) => {
        resolve(response)
      })
    })
  },
  create: (args) => {
    return new Promise(function (resolve, reject) {
      args.url = '/item/table/' + args.tableId
      huoban.post(args).then((response) => {
        resolve(response)
      })
    })
  },
  handleItem: (item, mode = 1) => {
    let formatItem = {}
    for (let k in item['fields']) {
      let field = item['fields'][k]
      let fieldKey = mode === 1 ? (field['alias'] ? field['alias'] : field['field_id']) : field['field_id']
      let ids, titles, names, sources, fileids
      switch (field['type']) {
        case 'number':
        case 'text':
        case 'calculation':
        case 'date':
          formatItem[fieldKey] = field['values'][0]['value']
          break
        case 'user':
          formatItem[fieldKey] = field['values'][0]['name']
          formatItem[fieldKey + '_uid'] = field['values'][0]['user_id']
          break
        case 'relation':
          ids = []
          titles = []
          _.forIn(field['values'], function (value, key) {
            ids.push(value['item_id']) && titles.push(value['title'])
          })
          formatItem[fieldKey] = _.join(titles, [','])
          formatItem[fieldKey + '_ids'] = ids
          formatItem[fieldKey + '_titles'] = titles
          break
        case 'category':
          ids = []
          names = []
          _.forIn(field['values'], function (value, key) {
            ids.push(value['id']) && names.push(value['name'])
          })
          formatItem[fieldKey] = _.join(names, [','])
          formatItem[fieldKey + '_ids'] = ids
          formatItem[fieldKey + '_names'] = names
          break
        case 'image':
          names = []
          sources = []
          fileids = []
          _.forIn(field['values']['link'], function (value, key) {
            sources.push(value['source'])
          })
          _.forIn(field['values'], function (value, key) {
            fileids.push(value['file_id']) && names.push(value['name'])
          })
          formatItem[fieldKey] = _.join(sources, [';'])
          formatItem[fieldKey + '_file_ids'] = fileids
          formatItem[fieldKey + '_names'] = names
          formatItem[fieldKey + '_linksource'] = sources
          break

        case 'signature':
          let user = field['values'][0]['user']
          let file = field['values'][0]['file']
          formatItem[fieldKey] = file['link']['source']
          formatItem[fieldKey + '_user'] = user
          break
        default:
          break
      }
    }
    formatItem['item_id'] = item['item_id']
    return formatItem
  },
  handleItems: (items, mode = 1) => {
    let formatItems = []
    for (let i in items) {
      let formatItem = {}
      for (let k in items[i]['fields']) {
        let field = items[i]['fields'][k]
        let fieldKey = mode === 1 ? (field['alias'] ? field['alias'] : field['field_id']) : field['field_id']
        let ids, titles, names, sources, fileids
        switch (field['type']) {
          case 'number':
          case 'text':
          case 'calculation':
          case 'date':
          case 'location':
            formatItem[fieldKey] = field['values'][0]['value']
            break
          case 'user':
            formatItem[fieldKey] = field['values'][0]['name']
            formatItem[fieldKey + '_uid'] = field['values'][0]['id']
            break
          case 'relation':
            ids = []
            titles = []
            _.forIn(field['values'], function (value, key) {
              ids.push(value['item_id']) && titles.push(value['title'])
            })
            formatItem[fieldKey] = _.join(titles, [','])
            formatItem[fieldKey + '_ids'] = ids
            formatItem[fieldKey + '_titles'] = titles
            break
          case 'category':
            ids = []
            names = []
            _.forIn(field['values'], function (value, key) {
              ids.push(value['id']) && names.push(value['name'])
            })
            formatItem[fieldKey] = _.join(names, [','])
            formatItem[fieldKey + '_ids'] = ids
            formatItem[fieldKey + '_names'] = names
            break
          case 'image':
            names = []
            sources = []
            fileids = []
            _.forIn(field['values']['link'], function (value, key) {
              sources.push(value['source'])
            })
            _.forIn(field['values'], function (value, key) {
              fileids.push(value['file_id']) && names.push(value['name'])
            })
            formatItem[fieldKey] = _.join(sources, [';'])
            formatItem[fieldKey + '_file_ids'] = fileids
            formatItem[fieldKey + '_names'] = names
            formatItem[fieldKey + '_linksource'] = sources
            break

          case 'signature':
            let user = field['values'][0]['user']
            let file = field['values'][0]['file']
            formatItem[fieldKey] = file['link']['source']
            formatItem[fieldKey + '_user'] = user
            break
          default:
            break
        }
      }
      formatItem['item_id'] = items[i]['item_id']
      formatItems.push(formatItem)
    }
    return formatItems
  }
}
