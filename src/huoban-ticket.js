import huobanConfig from './huoban-config'
import axios from 'axios'
import Cookies from 'js-cookie'

var huobanTicket = {
  ticket: '',
  getTicket: function (args) {
    return new Promise(function (resolve, reject) {
      let appType = args.appType ? args.appType : 'enterprise'

      if (appType === 'enterprise') {
        huobanTicket.setEnterpriseTicket(args).then(() => {
          resolve(huobanTicket.ticket)
        })
      } else {
        huobanTicket.setTableTicket(args).then(() => {
          resolve(huobanTicket.ticket)
        })
      }
    })
  },
  setEnterpriseTicket: function (args) {
    return new Promise(function (resolve, reject) {
      if (args.nocache || !huobanTicket.ticket) {
        axios.get(huobanConfig.basicUrl + '/huoban/ticket').then((response) => {
          huobanTicket.ticket = response.data.ticket
          Cookies.set('eTicket', response.data.ticket, huobanConfig.ticketTime)
          resolve()
        })
      } else {
        huobanTicket.ticket = Cookies.get('eTicket')
        resolve()
      }
    })
  },
  setTableTicket (args) {
    return new Promise(function (resolve, reject) {
      if (args.nocache || !huobanTicket.ticket) {
        huobanTicket.ticket = huobanTicket.getQueryVariable('ticket')
      } else {
        huobanTicket.ticket = Cookies.get('tTicket')
      }
      Cookies.set('tTicket', huobanTicket.ticket)
      resolve()
    })
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
  }
}
export default huobanTicket
