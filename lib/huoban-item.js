"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _huoban = _interopRequireDefault(require("./huoban"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  find: function find(args) {
    return new Promise(function (resolve, reject) {
      args.url = '/item/table/' + args.tableId + '/find';

      _huoban["default"].post(args).then(function (response) {
        resolve(response);
      });
    });
  },
  update: function update(args) {
    return new Promise(function (resolve, reject) {
      args.url = '/item/' + args.itemId;

      _huoban["default"].put(args).then(function (response) {
        resolve(response);
      });
    });
  },
  create: function create(args) {
    return new Promise(function (resolve, reject) {
      args.url = '/item/table/' + args.tableId;

      _huoban["default"].post(args).then(function (response) {
        resolve(response);
      });
    });
  },
  handleItem: function handleItem(item) {
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var formatItem = {};

    var _loop = function _loop(k) {
      var field = item['fields'][k];
      var fieldKey = mode === 1 ? field['alias'] ? field['alias'] : field['field_id'] : field['field_id'];
      var ids = void 0,
          titles = void 0,
          names = void 0,
          sources = void 0,
          fileids = void 0;

      switch (field['type']) {
        case 'number':
        case 'text':
        case 'calculation':
        case 'date':
          formatItem[fieldKey] = field['values'][0]['value'];
          break;

        case 'user':
          formatItem[fieldKey] = field['values'][0]['name'];
          formatItem[fieldKey + '_uid'] = field['values'][0]['user_id'];
          break;

        case 'relation':
          ids = [];
          titles = [];

          _lodash["default"].forIn(field['values'], function (value, key) {
            ids.push(value['item_id']) && titles.push(value['title']);
          });

          formatItem[fieldKey] = _lodash["default"].join(titles, [',']);
          formatItem[fieldKey + '_ids'] = ids;
          formatItem[fieldKey + '_titles'] = titles;
          break;

        case 'category':
          ids = [];
          names = [];

          _lodash["default"].forIn(field['values'], function (value, key) {
            ids.push(value['id']) && names.push(value['name']);
          });

          formatItem[fieldKey] = _lodash["default"].join(names, [',']);
          formatItem[fieldKey + '_ids'] = ids;
          formatItem[fieldKey + '_names'] = names;
          break;

        case 'image':
          names = [];
          sources = [];
          fileids = [];

          _lodash["default"].forIn(field['values']['link'], function (value, key) {
            sources.push(value['source']);
          });

          _lodash["default"].forIn(field['values'], function (value, key) {
            fileids.push(value['file_id']) && names.push(value['name']);
          });

          formatItem[fieldKey] = _lodash["default"].join(sources, [';']);
          formatItem[fieldKey + '_file_ids'] = fileids;
          formatItem[fieldKey + '_names'] = names;
          formatItem[fieldKey + '_linksource'] = sources;
          break;

        case 'signature':
          var user = field['values'][0]['user'];
          var file = field['values'][0]['file'];
          formatItem[fieldKey] = file['link']['source'];
          formatItem[fieldKey + '_user'] = user;
          break;

        default:
          break;
      }
    };

    for (var k in item['fields']) {
      _loop(k);
    }

    formatItem['item_id'] = item['item_id'];
    return formatItem;
  },
  handleItems: function handleItems(items) {
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var formatItems = [];

    for (var i in items) {
      var formatItem = {};

      var _loop2 = function _loop2(k) {
        var field = items[i]['fields'][k];
        var fieldKey = mode === 1 ? field['alias'] ? field['alias'] : field['field_id'] : field['field_id'];
        var ids = void 0,
            titles = void 0,
            names = void 0,
            sources = void 0,
            fileids = void 0;

        switch (field['type']) {
          case 'number':
          case 'text':
          case 'calculation':
          case 'date':
          case 'location':
            formatItem[fieldKey] = field['values'][0]['value'];
            break;

          case 'user':
            formatItem[fieldKey] = field['values'][0]['name'];
            formatItem[fieldKey + '_uid'] = field['values'][0]['id'];
            break;

          case 'relation':
            ids = [];
            titles = [];

            _lodash["default"].forIn(field['values'], function (value, key) {
              ids.push(value['item_id']) && titles.push(value['title']);
            });

            formatItem[fieldKey] = _lodash["default"].join(titles, [',']);
            formatItem[fieldKey + '_ids'] = ids;
            formatItem[fieldKey + '_titles'] = titles;
            break;

          case 'category':
            ids = [];
            names = [];

            _lodash["default"].forIn(field['values'], function (value, key) {
              ids.push(value['id']) && names.push(value['name']);
            });

            formatItem[fieldKey] = _lodash["default"].join(names, [',']);
            formatItem[fieldKey + '_ids'] = ids;
            formatItem[fieldKey + '_names'] = names;
            break;

          case 'image':
            names = [];
            sources = [];
            fileids = [];

            _lodash["default"].forIn(field['values']['link'], function (value, key) {
              sources.push(value['source']);
            });

            _lodash["default"].forIn(field['values'], function (value, key) {
              fileids.push(value['file_id']) && names.push(value['name']);
            });

            formatItem[fieldKey] = _lodash["default"].join(sources, [';']);
            formatItem[fieldKey + '_file_ids'] = fileids;
            formatItem[fieldKey + '_names'] = names;
            formatItem[fieldKey + '_linksource'] = sources;
            break;

          case 'signature':
            var user = field['values'][0]['user'];
            var file = field['values'][0]['file'];
            formatItem[fieldKey] = file['link']['source'];
            formatItem[fieldKey + '_user'] = user;
            break;

          default:
            break;
        }
      };

      for (var k in items[i]['fields']) {
        _loop2(k);
      }

      formatItem['item_id'] = items[i]['item_id'];
      formatItems.push(formatItem);
    }

    return formatItems;
  }
};
exports["default"] = _default;