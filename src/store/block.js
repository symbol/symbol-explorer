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

import Vue from 'vue';
import Lock from './lock';
import { filters, Constants } from '../config';
import helper from '../helper';
import {
	ListenerService,
	BlockService
} from '../infrastructure';
import {
	DataSet,
	Pagination,
	getStateFromManagers,
	getGettersFromManagers,
	getMutationsFromManagers,
	getActionsFromManagers
} from './manager';

const managers = [
	new Pagination({
		name: 'timeline',
		fetchFunction: (pageInfo) => BlockService.getBlockList(pageInfo),
		pageInfo: {
			pageSize: Constants.PageSize
		}
	}),
	new Pagination({
		name: 'blockTransactions',
		fetchFunction: (pageInfo, filterValue, store) => BlockService.getBlockTransactionList(pageInfo, filterValue, store.getters.currentBlockHeight),
		pageInfo: {
			pageSize: 10
		},
		filter: filters.transaction
	}),
	new DataSet(
		'blockReceipts',
		(height) => BlockService.getBlockReceiptsInfo(height)
	),
	new DataSet(
		'info',
		(height) => BlockService.getBlockInfo(height)
	)
];

const LOCK = Lock.create();

export default {
	namespaced: true,
	state: {
		...getStateFromManagers(managers),
		// If the state has been initialized.
		initialized: false,
		// Subscription to new blocks.
		subscription: null,
		currentBlockHeight: null
	},
	getters: {
		...getGettersFromManagers(managers),
		getInitialized: state => state.initialized,
		getRecentList: state => state.timeline?.data?.filter((item, index) => index < 4) || [],
		getSubscription: state => state.subscription,
		blockInfo: state => state.info?.data?.blockInfo || {},
		merkleInfo: state => state.info?.data?.merkleInfo || {},
		inflationReceipt: state => state.blockReceipts?.data?.transactionReceipt?.inflationReceipt || [],
		balanceTransferReceipt: state => state.blockReceipts?.data?.transactionReceipt?.balanceTransferReceipt || [],
		balanceChangeReceipt: state => state.blockReceipts?.data?.transactionReceipt?.balanceChangeReceipt || [],
		artifactExpiryReceipt: state => state.blockReceipts?.data?.transactionReceipt?.artifactExpiryReceipt || [],
		resolutionStatement: state => state.blockReceipts?.data?.resolutionStatements || [],
		currentBlockHeight: state => state.currentBlockHeight,

		infoText: (s, g, rs, rootGetters) => 'Chain height: ' + rootGetters['chain/getBlockHeight']
	},
	mutations: {
		...getMutationsFromManagers(managers),
		setInitialized: (state, initialized) => {
			state.initialized = initialized;
		},
		setSubscription: (state, subscription) => {
			state.subscription = subscription;
		},
		currentBlockHeight: (state, currentBlockHeight) => Vue.set(state, 'currentBlockHeight', currentBlockHeight)
	},
	actions: {
		...getActionsFromManagers(managers),
		// Initialize the block model.
		// First fetch the page, then subscribe.
		async initialize({ commit, dispatch, getters }) {
			const callback = async () => {
				await dispatch('initializePage');
				await dispatch('subscribe');
			};

			await LOCK.initialize(callback, commit, dispatch, getters);
		},

		// Uninitialize the block model.
		async uninitialize({ commit, dispatch, getters }) {
			const callback = async () => {
				dispatch('unsubscribe');
        getters.timeline?.uninitialize();
			};

			await LOCK.uninitialize(callback, commit, dispatch, getters);
		},

		// Subscribe to the latest blocks.
		async subscribe({ commit, getters, rootGetters }) {
			if (getters.getSubscription === null) {
				const subscription = await ListenerService.subscribeNewBlock(
					async (item) => {
						const latestBlock = await BlockService.getBlockByHeight(item.height.compact());

						getters.timeline.addLatestItem({
							...latestBlock,
							date: helper.convertToUTCDate(latestBlock.timestamp),
							age: helper.convertToUTCDate(latestBlock.timestamp),
							harvester: latestBlock.signer
						}, 'height');
						commit('chain/setBlockHeight', item.height, { root: true });
					},
					rootGetters['api/wsEndpoint']
				);

				commit('setSubscription', subscription);
			}
		},

		// Unsubscribe from the latest blocks.
		unsubscribe({ commit, getters }) {
			let subscription = getters.getSubscription;

			if (subscription?.length === 2) {
				subscription[1].unsubscribe();
				subscription[0].close();
				commit('setSubscription', null);
			}
		},

		// Fetch data from the SDK and initialize the page.
		initializePage(context) {
			context.dispatch('chain/getBlockHeight', null, { root: true });
			context.getters.timeline.setStore(context).initialFetch();
		},

		fetchBlockInfo: (context, payload) => {
			context.dispatch('uninitializeDetail');
			context.commit('currentBlockHeight', payload.height);
			context.getters.info.setStore(context).initialFetch(payload.height);
			context.getters.blockReceipts.setStore(context).initialFetch(payload.height);
			context.getters.blockTransactions.setStore(context).initialFetch(payload.height);
		},

		uninitializeDetail(context) {
			context.getters.info.setStore(context).uninitialize();
			context.getters.blockReceipts.setStore(context).uninitialize();
			context.getters.blockTransactions.setStore(context).uninitialize();
		},

		nextBlock: ({ commit, getters, dispatch, rootGetters }) => {
			if (getters.currentBlockHeight < rootGetters['chain/getBlockHeight']) {
				dispatch('ui/openPage', {
					pageName: 'block',
					param: +getters.currentBlockHeight + 1
				}, { root: true });
			}
		},

		previousBlock: ({ commit, getters, dispatch }) => {
			if (+getters.currentBlockHeight > 1) {
				dispatch('ui/openPage', {
					pageName: 'block',
					param: +getters.currentBlockHeight - 1
				}, { root: true });
			}
		}
	}
};
