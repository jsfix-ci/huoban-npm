"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _huoban = _interopRequireDefault(require("./huoban"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  get: function get(args) {
    var that = this;
    return new Promise(function (resolve, reject) {
      args.url = '/table/' + args.tableId;

      _huoban["default"].get(args).then(function (response) {
        resolve(response);
      });
    });
  },
  getFormatFields: function getFormatFields(args) {
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get(args).then(function (response) {
        args.url = '/table/' + args.tableId;

        _huoban["default"].get(args).then(function (response) {
          var table = response.data;
          var formatFields = {};

          _lodash["default"].forIn(table['fields'], function (field, index) {
            if (mode) {
              field['alias'] = field['alias'].replace(/\./g, '_');
            }

            formatFields[field['alias']] = field;
          });

          resolve(formatFields);
        });
      });
    });
  }
};
exports["default"] = _default;