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
import { Constants, filters } from '../config';
import { NamespaceService } from '../infrastructure';
import {
	DataSet,
	Pagination,
	getStateFromManagers,
	getGettersFromManagers,
	getMutationsFromManagers,
	getActionsFromManagers
} from './manager';

const LOCK = Lock.create();

const managers = [
	new Pagination({
		name: 'timeline',
		fetchFunction: (pageInfo, filterVaule) => NamespaceService.getNamespaceList(pageInfo, filterVaule),
		pageInfo: {
			pageSize: Constants.PageSize
		},
		filter: filters.namespace
	}),
	new DataSet(
		'info',
		(namespaceOrHex) => NamespaceService.getNamespaceInfo(namespaceOrHex)
	),
	new DataSet(
		'namespaceLevel',
		(namespaceOrHex) => NamespaceService.getNamespaceLevelList(namespaceOrHex)
	),
	new Pagination({
		name: 'metadatas',
		fetchFunction: (pageInfo, filterValue, store) => NamespaceService.getNamespaceMetadataList(pageInfo, filterValue, store.getters.getCurrentNamespaceId),
		pageInfo: {
			pageSize: 10
		},
		filter: filters.metadata
	})
];

export default {
	namespaced: true,
	state: {
		// If the state has been initialized.
		initialized: false,
		...getStateFromManagers(managers),
		currentNamespaceId: null
	},
	getters: {
		getInitialized: state => state.initialized,
		getCurrentNamespaceId: state => state.currentNamespaceId,
		...getGettersFromManagers(managers)
	},
	mutations: {
		setInitialized: (state, initialized) => {
			state.initialized = initialized;
		},
		setCurrentNamespaceId: (state, currentNamespaceId) => {
			state.currentNamespaceId = currentNamespaceId;
		},
		...getMutationsFromManagers(managers)
	},
	actions: {
		...getActionsFromManagers(managers),
		// Initialize the namespace model.
		async initialize({ commit, dispatch, getters }) {
			const callback = async () => {
				await dispatch('initializePage');
			};

			await LOCK.initialize(callback, commit, dispatch, getters);
		},

		// Uninitialize the namespace model.
		async uninitialize({ commit, dispatch, getters }) {
			const callback = async () => {
        getters.timeline?.uninitialize();
			};

			await LOCK.uninitialize(callback, commit, dispatch, getters);
		},

		// Fetch data from the SDK and initialize the page.
		initializePage(context) {
			context.getters.timeline.setStore(context).initialFetch();
		},

		// Fetch data from the SDK.
		fetchNamespaceInfo(context, payload) {
			context.dispatch('uninitializeDetail');
			context.commit('setCurrentNamespaceId', payload.namespaceId);
			context.getters.info.setStore(context).initialFetch(payload.namespaceId);
			context.getters.namespaceLevel.setStore(context).initialFetch(payload.namespaceId);
			context.getters.metadatas.setStore(context).initialFetch(payload.namespaceId);
		},

		uninitializeDetail(context) {
			context.getters.info.setStore(context).uninitialize();
			context.getters.namespaceLevel.setStore(context).uninitialize();
			context.getters.metadatas.setStore(context).uninitialize();
		}
	}
};
