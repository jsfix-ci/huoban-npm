import huoban from './huoban';
import _ from 'lodash';

export default {
	get: function (args) {
		let that = this;
		return new Promise(function (resolve, reject) {
			args.url = '/table/' + args.tableId;
			huoban.get(args).then((response) => {
				resolve(response);
			});
		});
	},
	getFormatFields: function (args) {
		let that = this;
		return new Promise(function (resolve, reject) {
			that.get(args).then((response) => {
				args.url = '/table/' + args.tableId;
				huoban.get(args).then((response) => {
					let table = response.data;
					let formatFields = {};
					_.forIn(table['fields'], function (field, index) {
						field['alias'] = field['alias'].replace(/\./g, '_');
						formatFields[field['alias']] = field;
					});
					resolve(formatFields);
				});
			});
		});
	},
};
