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

export default class Filter {
	constructor(name, options) {
		if (typeof name !== 'string')
			throw Error('Failed to construct Filter. Name is not provided');
		if (typeof options !== 'object')
			throw Error('Failed to construct Filter. Options map is not provided');

		this.name = name;
		this.options = options;
		this.current = Object.keys(options)[0];
		this.store = {};
	}

	setStore(store) {
		this.store = store;
		this.store.dispatch(this.name, this);
		return this;
	}

	get currentManager() {
		return this.store?.getters ? this.store.getters[this.current] || {} : {};
	}

	get filterOptions() {
		return this.options;
	}

	get filterValue() {
		return this.current;
	}

	get data() {
		return this.currentManager.data || [];
	}

	get error() {
		return typeof this.currentManager.error === 'boolean' ? this.currentManager.error : false;
	}

	get loading() {
		return typeof this.currentManager.loading === 'boolean' ? this.currentManager.loading : true;
	}

	get canFetchPrevious() {
		return typeof this.currentManager.canFetchPrevious === 'boolean' ? this.currentManager.canFetchPrevious : false;
	}

	get canFetchNext() {
		return typeof this.currentManager.canFetchNext === 'boolean' ? this.currentManager.canFetchNext : false;
	}

	get index() {
		return typeof this.currentManager.index === 'number' ? this.currentManager.index : 0;
	}

	initialFetch() {
		if (typeof this.currentManager.initialFetch === 'function')
			return this.currentManager.initialFetch();
		else
			console.error('Cannot call "initialFetch" method of', this.current);
	}

	uninitialize() {
		if (typeof this.currentManager.uninitialize === 'function')
			return this.currentManager.uninitialize();
	}

	fetchNext() {
		if (typeof this.currentManager.fetchNext === 'function')
			return this.currentManager.fetchNext();
		else
			console.error('Cannot call "fetchNext" method of', this.current);
	}

	fetchPrevious() {
		if (typeof this.currentManager.fetchPrevious === 'function')
			return this.currentManager.fetchPrevious();
		else
			console.error('Cannot call "fetchPrevious" method of', this.current);
	}

	changeFilterValue(option) {
		this.uninitialize();
		this.current = option;

		if (typeof this.currentManager.initialFetch === 'function')
			this.currentManager.initialFetch();
		else
			console.error('Failed to fetch selected filter option. "initialFetch" is not a function');

		this.store.dispatch(this.name, this);
	}

	reset() {
		if (typeof this.currentManager.reset === 'function')
			return this.currentManager.reset();
		this.current = Object.keys(this.options)[0];
		this.store.dispatch(this.name, this);
	}
}
