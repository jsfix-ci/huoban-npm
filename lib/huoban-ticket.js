"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _huobanConfig = _interopRequireDefault(require("./huoban-config"));

var _axios = _interopRequireDefault(require("axios"));

var _jsCookie = _interopRequireDefault(require("js-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  ticket: '',
  getTicket: function getTicket(args) {
    var that = this;
    return new Promise(function (resolve, reject) {
      var appType = args.appType ? args.appType : 'enterprise';

      if (appType === 'enterprise') {
        that.setEnterpriseTicket(args).then(function () {
          resolve(that.ticket);
        });
      } else {
        that.setTableTicket(args).then(function () {
          resolve(that.ticket);
        });
      }
    });
  },
  setEnterpriseTicket: function setEnterpriseTicket(args) {
    var that = this;
    return new Promise(function (resolve, reject) {
      if (args.nocache || !that.ticket) {
        _axios["default"].get(_huobanConfig["default"].basicUrl + '/huoban/ticket').then(function (response) {
          that.ticket = response.data.ticket;

          _jsCookie["default"].set('eTicket', response.data.ticket, _huobanConfig["default"].ticketTime);

          resolve();
        });
      } else {
        that.ticket = _jsCookie["default"].get('eTicket');
        resolve();
      }
    });
  },
  setTableTicket: function setTableTicket(args) {
    var that = this;
    return new Promise(function (resolve, reject) {
      if (args.nocache || !that.ticket) {
        that.ticket = that.getQueryVariable('ticket');
      } else {
        that.ticket = _jsCookie["default"].get('tTicket');
      }

      _jsCookie["default"].set('tTicket', that.ticket);

      resolve();
    });
  },
  getQueryVariable: function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return pair[1];
      }
    }

    return false;
  }
};
exports["default"] = _default;