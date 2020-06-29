"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HuoBan = _interopRequireDefault(require("./HuoBan"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  upload: function upload(callback, $filePath, $fileName) {
    var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'attachment';

    _HuoBan["default"].post(callback, '/file', {
      'source': filePath,
      'name': fileName,
      'type': type
    }, {
      'upload': TRUE
    });
  }
};
exports["default"] = _default;