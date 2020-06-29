"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HuoBan = _interopRequireDefault(require("./HuoBan"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  create: function create(callback, itemId) {
    _HuoBan["default"].post(callback, '/follow/item/' + itemId);
  },
  "delete": function _delete(callback, refId) {
    _HuoBan["default"]["delete"](callback, '/follow/item/' + refId);
  },
  getAll: function getAll(callback, itemId) {
    var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _HuoBan["default"].post(callback, '/follow/item/' + itemId + '/find', attributes);
  }
};
exports["default"] = _default;