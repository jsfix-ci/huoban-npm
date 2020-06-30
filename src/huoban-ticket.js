import huobanConfig from './huoban-config';
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
	ticket: '',
	getTicket: function (args) {
		let that = this;
		return new Promise(function (resolve, reject) {
			let appType = args.appType ? args.appType : 'enterprise';

			if (appType === 'enterprise') {
				that.setEnterpriseTicket(args).then(() => {
					resolve(that.ticket);
				});
			} else {
				that.setTableTicket(args).then(() => {
					resolve(that.ticket);
				});
			}
		});
	},
	setEnterpriseTicket: function (args) {
		let that = this;
		return new Promise(function (resolve, reject) {
			if (args.nocache || !that.ticket) {
				axios.get(huobanConfig.basicUrl + '/huoban/ticket').then((response) => {
					that.ticket = response.data.ticket;
					Cookies.set('eTicket', response.data.ticket, huobanConfig.ticketTime);
					resolve();
				});
			} else {
				that.ticket = Cookies.get('eTicket');
				resolve();
			}
		});
	},
	setTableTicket: function (args) {
		let that = this;
		return new Promise(function (resolve, reject) {
			if (args.nocache || !that.ticket) {
				that.ticket = that.getQueryVariable('ticket');
			} else {
				that.ticket = Cookies.get('tTicket');
			}
			Cookies.set('tTicket', that.ticket);
			resolve();
		});
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
};
