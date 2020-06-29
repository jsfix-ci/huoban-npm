"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var huobanConfig = {
  isTest: false,
  basicUrl: 'https://enterprise.huoban.zixuni.com',
  ticketTime: 60 * 60 * 23
};
huobanConfig.apiUrl = huobanConfig.isTest ? 'https://api-dev.huoban.com' : 'https://api.huoban.com';
var _default = huobanConfig;
exports["default"] = _default;