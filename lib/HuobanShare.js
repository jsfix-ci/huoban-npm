"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HuoBan = _interopRequireDefault(require("./HuoBan"));

var _HuobanStorage = _interopRequireDefault(require("./HuobanStorage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  get: function get(callback, $refType, $refId) {
    var attributes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _HuoBan["default"].post(callback, '/share/' + refType + '/' + refId, attributes);
  },
  getShare: function getShare(callback, tableId) {
    var isNew = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var share = _HuobanStorage["default"].get('share'); // if (isNew || empty(share['value'])) {
    //   isNew = this.get(callback, 'table', $tableId)
    //   HuobanStorage:: set('share', $share);
    // } else {
    //   share = share['value'];
    // }


    callback(share);
  }
}; // public static function getShare($table_id, $is_new = false) {
//   $share = HuobanStorage:: get('share');
//   if ($is_new || empty($share['value'])) {
//     $share = self:: get('table', $table_id);
//     HuobanStorage:: set('share', $share);
//   } else {
//     $share = $share['value'];
//   }
//   return $share;
// }

exports["default"] = _default;