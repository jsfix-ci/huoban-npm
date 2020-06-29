import huobanConfig from './huoban-config'
import huobanTicket from './huoban-ticket'

import axios from 'axios'
var huoban = {
  version: '',
  params: {},
  args: {},

  ready: function (args) {
    return new Promise(function (resolve, reject) {
      huoban.setDefault(args)
      huobanTicket.getTicket(args).then((ticket) => {
        huoban.setParams(args, ticket)
        resolve()
      })
    })
  },
  setDefault (args) {
    args.attributes = args.hasOwnProperty('attributes') ? args['attributes'] : []
    args.options = args.hasOwnProperty('options') ? args['options'] : []
  },
  setParams (args, ticket) {
    let options = args.options
    let version = typeof options['version'] !== 'undefined' ? '/'.options['version'] : typeof options['pass_version'] !== 'undefined' ? '' : '/v2'

    huoban.params = {
      baseURL: huobanConfig.apiUrl + version,
      withCredentials: true,
      headers: (() => {
        let headers = {}
        if (options.hasOwnProperty('headers')) {
          for (let name in options['headers']) {
            headers[name] = options['headers'][name]
          }
        }
        headers['X-Huoban-Ticket'] = ticket
        return headers
      })()
    }
  },
  getQueryVariable (variable) {
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=')
      if (pair[0] === variable) {
        return pair[1]
      }
    }
    return false
  },
  get: function (args) {
    return new Promise(function (resolve, reject) {
      huoban.ready(args).then(() => {
        axios.get(args.url, huoban.params).then((response) => {
          resolve(response)
        })
      })
    })
  },
  post: function (args) {
    return new Promise(function (resolve, reject) {
      huoban.ready(args).then(() => {
        axios.post(args.url, args.attributes, huoban.params).then((response) => {
          resolve(response)
        })
      })
    })
  },
  put: function (args) {
    return new Promise(function (resolve, reject) {
      huoban.ready(args).then(() => {
        axios.put(args.url, args.attributes, huoban.params).then((response) => {
          resolve(response)
        })
      })
    })
  }
}

export default huoban
