/*
 *
 * Copyright (c) 2019-present for NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License ");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import account from './account';
import api from './api';
import block from './block';
import chain from './chain';
import mosaic from './mosaic';
import namespace from './namespace';
import node from './node';
import transaction from './transaction';
import statistic from './statistic';
import ui from './ui';
import helper from '../helper';
import router from '../router';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	// Disable use-strict mode because it fails with the SDK listener.
	strict: false,
	modules: {
		api,
		block,
		chain,
		transaction,
		ui,
		account,
		mosaic,
		namespace,
		node,
		statistic
	},
	state: {
		destructionList: []
	},
	getters: {
		destructionList: state => state.destructionList
	},
	mutations: {
		destructionList: (state, payload) => {
			state.destructionList = payload;
		}
	},
	actions: {
		// Initialize the store (call on mount or re-initialization).
		// This handles initialization of a dependent item based on the
		// key provided.
		async initialize({ dispatch }, route) {
			router.beforeEach((to, from, next) => dispatch('onRouteChange', { to, from, next }));
			// Initialize the API.
			await helper.logError(dispatch, 'api/initialize');
			switch (route.name) {
			// Home
			case 'home':
				// Home: Requires blocks, chain, and transactions.
				return Promise.all([
					helper.logError(dispatch, 'block/initialize'),
					helper.logError(dispatch, 'chain/initialize'),
					helper.logError(dispatch, 'transaction/initialize')
				]);

				// Timeline Views
			case 'accounts':
				return helper.logError(dispatch, 'account/initialize');
			case 'blocks':
				return helper.logError(dispatch, 'block/initialize');
			case 'mosaics':
				return helper.logError(dispatch, 'mosaic/initialize');
			case 'namespaces':
				return helper.logError(dispatch, 'namespace/initialize');
			case 'nodes':
				return helper.logError(dispatch, 'node/initialize');
			case 'transactions':
				return helper.logError(dispatch, 'transaction/initialize');
			case 'statistics':
				return helper.logError(dispatch, 'statistic/initialize');
			}
		},

		// Uninitialize the stores (call on app destroyed).
		async uninitialize({ dispatch }) {
			await Promise.all([
				dispatch('account/uninitialize'),
				dispatch('block/uninitialize'),
				dispatch('chain/uninitialize'),
				dispatch('mosaic/uninitialize'),
				dispatch('namespace/uninitialize'),
				dispatch('transaction/uninitialize'),
				dispatch('statistic/uninitialize'),
				dispatch('node/uninitialize')
			]);
		},

		onRouteChange({ commit, getters, dispatch }, { to, from, next }) {
			let destructionList = getters.destructionList;

			if (to.fullPath !== from.fullPath) {
				destructionList.push({
					name: from.name,
					group: from.meta.group,
					keepAliveGoTo: from.meta.keepAliveGoTo,
					storeNamespaces: from.meta.storeNamespaces
				});

				destructionList = destructionList.filter(el => {
					if (el.keepAliveGoTo?.includes(to.meta.group) || el.name === to.name)
						return true;
					else {
            el.storeNamespaces?.forEach(namespace => dispatch(`${namespace}/uninitialize`, null, { root: true }));
            return false;
					}
				});

				commit('destructionList', destructionList);
				next();
			}
		}
	}
});
