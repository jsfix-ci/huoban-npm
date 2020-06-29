"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HuoBan = _interopRequireDefault(require("./HuoBan"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  create: function create(callback) {
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _HuoBan["default"].post(callback, '/pay_order/', attributes);
  },
  order: function order(callback, orderNo) {
    _HuoBan["default"].get(callback, '/pay_order/' + orderNo);
  }
};
exports["default"] = _default;