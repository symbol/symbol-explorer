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
import { NodeService } from '../infrastructure';
import {
	Timeline,
	getStateFromManagers,
	getGettersFromManagers,
	getMutationsFromManagers,
	getActionsFromManagers
} from './manager';

const managers = [
	new Timeline(
		'timeline',
		() => NodeService.getNodePeerList(),
		() => [],
		''// node id
	)
];

const LOCK = Lock.create();

export default {
	namespaced: true,
	state: {
		// If the state has been initialized.
		initialized: false,
		...getStateFromManagers(managers)
	},
	getters: {
		getInitialized: state => state.initialized,
		...getGettersFromManagers(managers)
	},
	mutations: {
		setInitialized: (state, initialized) => {
			state.initialized = initialized;
		},
		...getMutationsFromManagers(managers)
	},
	actions: {
		...getActionsFromManagers(managers),
		// Initialize the node model.
		async initialize({ commit, dispatch, getters }) {
			const callback = async () => {
				await dispatch('initializePage');
			};

			await LOCK.initialize(callback, commit, dispatch, getters);
		},

		// Uninitialize the node model.
		async uninitialize({ commit, dispatch, getters }) {
			const callback = async () => {
        getters.timeline?.uninitialize();
			};

			await LOCK.uninitialize(callback, commit, dispatch, getters);
		},

		// Fetch data from the SDK and initialize the page.
		async initializePage(context) {
			await context.getters.timeline.setStore(context).initialFetch();
		}
	}
};
