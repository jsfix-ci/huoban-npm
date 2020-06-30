"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _huobanConfig = _interopRequireDefault(require("./huoban-config"));

var _huobanTicket = _interopRequireDefault(require("./huoban-ticket"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  version: '',
  params: {},
  args: {},
  ready: function ready(args) {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.setDefault(args);

      _huobanTicket["default"].getTicket(args).then(function (ticket) {
        that.setParams(args, ticket);
        resolve();
      });
    });
  },
  setDefault: function setDefault(args) {
    args.attributes = args.hasOwnProperty('attributes') ? args['attributes'] : [];
    args.options = args.hasOwnProperty('options') ? args['options'] : [];
  },
  setParams: function setParams(args, ticket) {
    var options = args.options;
    var version = typeof options['version'] !== 'undefined' ? '/'.options['version'] : typeof options['pass_version'] !== 'undefined' ? '' : '/v2';
    this.params = {
      baseURL: _huobanConfig["default"].apiUrl + version,
      withCredentials: true,
      headers: function () {
        var headers = {};

        if (options.hasOwnProperty('headers')) {
          for (var name in options['headers']) {
            headers[name] = options['headers'][name];
          }
        }

        headers['X-Huoban-Ticket'] = ticket;
        return headers;
      }()
    };
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
  },
  get: function get(args) {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.ready(args).then(function () {
        _axios["default"].get(args.url, that.params).then(function (response) {
          resolve(response);
        });
      });
    });
  },
  post: function post(args) {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.ready(args).then(function () {
        _axios["default"].post(args.url, args.attributes, that.params).then(function (response) {
          resolve(response);
        });
      });
    });
  },
  put: function put(args) {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.ready(args).then(function () {
        _axios["default"].put(args.url, args.attributes, that.params).then(function (response) {
          resolve(response);
        });
      });
    });
  }
};
exports["default"] = _default;