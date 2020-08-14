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

import Lock from './lock';
import { NetworkService, StatisticService, BlockService } from '../infrastructure';
import { Order } from 'symbol-sdk';

const LOCK = Lock.create();

export default {
	namespaced: true,
	state: {
		// If the state has been initialized.
		initialized: false,
		loading: false,
		loadingInfo: false,
		loadingBlockTimeDifference: false,
		loadingTransactionPerBlock: false,
		error: false,
		networkTransactionFees: [],
		networkRentalFees: [],
		blockTimeDifferenceData: [],
		transactionPerBlockData: []
	},
	getters: {
		getInitialized: state => state.initialized,
		getLoading: state => state.loading,
		getLoadingInfo: state => state.loadingInfo,
		getLoadingBlockTimeDifference: state => state.loadingBlockTimeDifference,
		getLoadingTransactionPerBlock: state => state.loadingTransactionPerBlock,
		getError: state => state.error,
		getNetworkTransactionFees: state => state.networkTransactionFees,
		getNetworkRentalFees: state => state.networkRentalFees,
		getBlockTimeDifferenceData: state => state.blockTimeDifferenceData,
		getTransactionPerBlockData: state => state.transactionPerBlockData
	},
	mutations: {
		setInitialized: (state, initialized) => {
			state.initialized = initialized;
		},
		setLoading: (state, loading) => {
			state.loading = loading;
		},
		setLoadingInfo: (state, loadingInfo) => {
			state.loadingInfo = loadingInfo;
		},
		setLoadingBlockTimeDifference: (state, loadingBlockTimeDifference) => {
			state.loadingBlockTimeDifference = loadingBlockTimeDifference;
		},
		setLoadingTransactionPerBlock: (state, loadingTransactionPerBlock) => {
			state.loadingTransactionPerBlock = loadingTransactionPerBlock;
		},
		setError: (state, error) => {
			state.error = error;
		},
		setNetworkTransactionFees: (state, networkTransactionFees) => {
			state.networkTransactionFees = networkTransactionFees;
		},
		setNetworkRentalFees: (state, networkRentalFees) => {
			state.networkRentalFees = networkRentalFees;
		},
		setBlockTimeDifferenceData: (state, blockTimeDifferenceData) => {
			state.blockTimeDifferenceData = blockTimeDifferenceData;
		},
		setTransactionPerBlockData: (state, transactionPerBlockData) => {
			state.transactionPerBlockData = transactionPerBlockData;
		}
	},
	actions: {
		// Initialize the statistics model.
		async initialize({ commit, dispatch, getters }) {
			const callback = async () => {
				await dispatch('initializePage');
			};

			await LOCK.initialize(callback, commit, dispatch, getters);
		},

		// Uninitialize the statistics model.
		async uninitialize({ commit, dispatch, getters }) {
			const callback = async () => {};

			await LOCK.uninitialize(callback, commit, dispatch, getters);
		},

		// Fetch data from the SDK / API and initialize the page.
		async initializePage({ commit }) {
			commit('setLoading', true);
			commit('setLoadingInfo', true);
			commit('setLoadingBlockTimeDifference', true);
			commit('setLoadingTransactionPerBlock', true);

			commit('setError', false);
			try {
				let transactionFeesInfo = await NetworkService.getTransactionFeesInfo();

				let rentalFeesInfo = await NetworkService.getRentalFeesInfo();

				commit('setNetworkTransactionFees', transactionFeesInfo);
				commit('setNetworkRentalFees', rentalFeesInfo);
				commit('setLoadingInfo', false);

				const searchCriteria = {
					pageSize: 100,
					order: Order.Desc
				};

				const blocks = await BlockService.streamerBlocks(searchCriteria, 240);

				let blockTimeDifferenceDataset = StatisticService.getBlockTimeDifferenceData(blocks, 240, 60);

				commit('setBlockTimeDifferenceData', blockTimeDifferenceDataset);
				commit('setLoadingBlockTimeDifference', false);

				let transactionPerBlockDataset = StatisticService.getTransactionPerBlockData(blocks, 240, 60);

				commit('setTransactionPerBlockData', transactionPerBlockDataset);
				commit('setLoadingTransactionPerBlock', false);
			}
			catch (e) {
				console.error(e);
				commit('setError', true);
			}
			commit('setLoading', false);
		}
	}
};
