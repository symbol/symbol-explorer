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

export default class Pagination {
	constructor({ name, fetchFunction, pageInfo = {}, filter }) {
		if (typeof name !== 'string')
			throw Error('Failed to construct Pagination. Name is not provided');
		if (typeof fetchFunction !== 'function')
			throw Error('Cannot create Pagination. Fetch function is not provided');
		if (pageInfo === null || typeof pageInfo !== 'object')
			throw Error('Cannot create Pagination. "pageInfo" is not an "object"');

		this.name = name;
		this.fetchFunction = fetchFunction;
		this.pageInfo = {
			pageNumber: pageInfo.pageNumber || 1,
			pageSize: pageInfo.pageSize || Constants.pageSize
		};
		this.options = filter;
		this.store = {};

		this.addLatestItem = this.addLatestItem.bind(this);
		this.initialized = false;
		this.loading = false;
		this.error = false;
		this.filterIndex = 0;
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

	get data() {
		return this?.pageInfo?.data || [];
	}

	get canFetchPrevious() {
		return this.pageInfo.pageNumber > 1 && this.loading === false;
	}

	get canFetchNext() {
		return !this.pageInfo.isLastPage && this.loading === false;
	}

	get isLive() {
		return this.pageInfo.pageNumber === 1 || false;
	}

	get pageNumber() {
		return this.pageInfo.pageNumber || 1;
	}

	get lastPage() {
		return this.pageInfo?.totalPages;
	}

	get pageSize() {
		return this.pageInfo.pageSize;
	}

	get filterOptions() {
		return Array.isArray(this.options) ? this.options : [];
	}

	get filterValue() {
		return this.filterOptions[this.filterIndex]
			? this.filterOptions[this.filterIndex].value
			: undefined;
	}

	/** Set Vuex.Store context
   *
   */
	setStore(store) {
		this.store = store;
		this.store.dispatch(this.name, this);
		return this;
	}

	/**
	 * Set timeline data
	 * @param data
	 */
	setData(data) {
		this.pageInfo.data = data;
		return this;
	}

	/** Uninitialize Pagination
   *
   */
	uninitialize() {
		this.initialized = false;
		this.pageInfo.pageNumber = 1;
		this.filterIndex = 0;
		this.loading = false;
		this.error = false;
	}

	/** Initialize and fetch data
   *
   */
	initialFetch() {
		if (!this.initialized) {
			this.reset();
			this.initialized = true;
			return this.fetch();
		}
	}

	/** Fetch data
   *
   */
	async fetch() {
		this.loading = true;
		this.store.dispatch(this.name, this);

		try {
			this.pageInfo = await this.fetchFunction(this.pageInfo, this.filterValue, this.store);
		}
		catch (e) {
			console.error(e);
			this.error = true;
		}
		this.loading = false;

		this.store.dispatch(this.name, this);
		return this;
	}

	/** Fetch next page of data
   *
   */
	async fetchNext() {
		if (this.canFetchNext) {
			this.store.dispatch(this.name, this);
			this.pageInfo.pageNumber++;
			await this.fetch();
		}
		else
			console.error('[Pagination]: cannot fetch next');
		this.loading = false;

		this.store.dispatch(this.name, this);
		return this;
	}

	/** Fetch previous page of data
   *
   */
	async fetchPrevious() {
		if (this.canFetchPrevious) {
			this.store.dispatch(this.name, this);
			this.pageInfo.pageNumber--;
			await this.fetch();
		}
		else
			return this.reset();

		this.store.dispatch(this.name, this);
		return this;
	}

	/** Fetch data with specific page configuration
   *
   */
	async fetchPage(pageInfo) {
		if (
			pageInfo !== null &&
            typeof pageInfo !== 'undefined'
		) {
			this.store.dispatch(this.name, this);
			if (this.pageInfo === null || typeof this.pageInfo !== 'object') {
				for (const key in pageInfo)
					this.pageInfo[key] = pageInfo[key];
			}
			await this.fetch();
		}
		else
			console.error(`[Pagination]: failed to fetchWithCriteria 'pageInfo' is not an object`);

		this.store.dispatch(this.name, this);
		return this;
	}

	/** Change filter value by index and fetch data
   *
   */
	async changeFilterValue(index) {
		this.uninitialize();
		this.filterIndex = index;
		await this.fetch();
		this.store.dispatch(this.name, this);
		return this;
	}

	/** Reset Pagination and fetch data
   *
   */
	async reset(pageNumber = 1) {
		this.pageInfo.pageNumber = pageNumber;
		this.filterIndex = 0;
		return this.fetch();
	}

	// Add latest item to current.
	addLatestItem(item, keyName) {
		if (this.isLive) {
			if (this.data?.length && this.data[0][keyName] === item[keyName])
				console.error('[Pagination]: attempted to add duplicate item as a latest item');
			else {
				const data = [item, ...this.data];

				data.pop();

				const newTimeline = [].concat.apply([], data);

				this.setData(newTimeline);
				this.store.dispatch(this.name, this);
				return this;
			}
		}
	}
}
