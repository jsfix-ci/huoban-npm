import huobanConfig from './huoban-config';
import huobanTicket from './huoban-ticket';

import axios from 'axios';
export default {
	version: '',
	params: {},
	args: {},

	ready: function (args) {
		let that = this;
		return new Promise(function (resolve, reject) {
			that.setDefault(args);
			huobanTicket.getTicket(args).then((ticket) => {
				that.setParams(args, ticket);
				resolve();
			});
		});
	},
	setDefault: function (args) {
		args.attributes = args.hasOwnProperty('attributes') ? args['attributes'] : [];
		args.options = args.hasOwnProperty('options') ? args['options'] : [];
	},
	setParams: function (args, ticket) {
		let options = args.options;
		let version = typeof options['version'] !== 'undefined' ? '/'.options['version'] : typeof options['pass_version'] !== 'undefined' ? '' : '/v2';

		this.params = {
			baseURL: huobanConfig.apiUrl + version,
			withCredentials: true,
			headers: (() => {
				let headers = {};
				if (options.hasOwnProperty('headers')) {
					for (let name in options['headers']) {
						headers[name] = options['headers'][name];
					}
				}
				headers['X-Huoban-Ticket'] = ticket;
				return headers;
			})(),
		};
	},

	getQueryVariable: function (variable) {
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
	get: function (args) {
		let that = this;
		return new Promise(function (resolve, reject) {
			that.ready(args).then(() => {
				axios.get(args.url, that.params).then((response) => {
					resolve(response);
				});
			});
		});
	},
	post: function (args) {
		let that = this;
		return new Promise(function (resolve, reject) {
			that.ready(args).then(() => {
				axios.post(args.url, args.attributes, that.params).then((response) => {
					resolve(response);
				});
			});
		});
	},
	put: function (args) {
		let that = this;
		return new Promise(function (resolve, reject) {
			that.ready(args).then(() => {
				axios.put(args.url, args.attributes, that.params).then((response) => {
					resolve(response);
				});
			});
		});
	},
};
