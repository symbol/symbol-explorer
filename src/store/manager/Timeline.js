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
import Constants from '../../config/constants';

export default class Timeline {
	constructor(name, initialFuntion, fetchFunction, keyName, pageSize = Constants.PageSize) {
		if (typeof name !== 'string')
			throw Error('Failed to construct Timeline. Name is not provided');
		// if(!(store && store.state && store.getters && store.commit && store.dispatch))
		//    throw Error('Failed to construct Timeline. Store context is not provided');
		if (typeof initialFuntion !== 'function')
			throw Error('Cannot create timeline. Initial function is not provided');
		if (typeof fetchFunction !== 'function')
			throw Error('Cannot create timeline. Fetch function is not provided');
		if (keyName === void 0)
			throw Error('Cannot create timeline. Key is not provided');

		this.name = name;
		this.initialFuntion = initialFuntion;
		this.fetchFunction = fetchFunction;
		this.keyName = keyName;
		this.pageSize = pageSize;
		this.data = [];
		this.next = [];
		this.index = 0;
		this.keys = [];
		this.loading = false;
		this.error = false;
		this.store = {};
		this.addLatestItem = this.addLatestItem.bind(this);
		this.initialized = false;
	}

	static empty() {
		return {
			data: [],
			canFetchNext: false,
			canFetchPrevious: false,
			fetchNext: () => { },
			fetchPrevious: () => { },
			reset: () => { }
		};
	}

	setStore(store) {
		this.store = store;
		this.store.dispatch(this.name, this);
		return this;
	}

	initialFetch() {
		if (!this.initialized) {
			this.initialized = true;
			return this.fetch();
		}
	}

	uninitialize() {
		this.initialized = false;
		this.data = [];
		this.next = [];
		this.index = 0;
		this.keys = [];
		this.loading = true;
		this.error = false;
	}

	async fetch() {
		this.loading = true;
		this.store.dispatch(this.name, this);

		this.index = 0;
		this.keys = [];
		try {
			this.data = await this.initialFuntion(this.pageSize, this.store);
			if (this.data?.length) {
				const lastElement = this.data[this.data.length - 1];
				const key = lastElement[this.keyName];

				this.next = await this.fetchFunction(key, this.pageSize, this.store);
				this.keys.push(key);
				this.createNewKey();
			}
		}
		catch (e) {
			console.error(e);
			this.error = true;
		}
		this.loading = false;

		this.store.dispatch(this.name, this);
		return this;
	}

	get canFetchPrevious() {
		return this.index > 0 && this.loading === false;
	}

	get canFetchNext() {
		return this.next?.length > 0 && this.loading === false;
	}

	get nextKeyValue() {
		if (this.next?.length)
			return this.next[this.next.length - 1][this.keyName];
	}

	get previousKeyValue() {
		return this.keys[this.keys.length - 4];
	}

	get isLive() {
		return this.index === 0;
	}

	createNewKey() {
		if (this.next?.length) {
			const newKeyValue = this.next[this.next.length - 1][this.keyName];

			this.keys.push(newKeyValue);
			return newKeyValue;
		}
		else
			this.keys.push(null);
	}

	async fetchNext() {
		if (this.canFetchNext) {
			this.loading = true;
			this.store.dispatch(this.name, this);

			this.data = [].concat.apply([], this.next);
			try {
				this.next = await this.fetchFunction(this.nextKeyValue, this.pageSize, this.store);
				this.createNewKey();
				this.index++;
			}
			catch (e) {
				this.error = true;
				console.error(e);
			}
		}
		else
			console.error('Timeline cannot fetch next');
		this.loading = false;

		this.store.dispatch(this.name, this);
		return this;
	}

	async fetchPrevious() {
		if (this.canFetchPrevious) {
			this.loading = true;
			this.store.dispatch(this.name, this);

			this.next = [].concat.apply([], this.data);
			try {
				this.data = await this.fetchFunction(this.previousKeyValue, this.pageSize, this.store);
				this.keys.pop();
				this.index--;
			}
			catch (e) {
				this.error = true;
				console.error(e);
			}
		}
		else
			return this.fetch();
		this.loading = false;

		this.store.dispatch(this.name, this);
		return this;
	}

	async reset() {
		return this.fetch();
	}

	// Add latest item to current.
	addLatestItem(item, keyName = this.keyName) {
		if (this.isLive) {
			if (this.data?.length && this.data[0][keyName] === item[keyName])
				console.error('internal error: attempted to add duplicate item to timeline.');
			else {
				const data = [item, ...this.data];
				const next = [data.pop(), ...this.next];

				this.data = [].concat.apply([], data);
				this.next.pop();
				this.next = [].concat.apply([], next);

				this.store.dispatch(this.name, this);
				return this;
			}
		}
	}
}
