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

export default class DataSet {
	constructor(name, initialFuntion, DataType = Object) {
		if (typeof name !== 'string')
			throw Error('Failed to construct DataSet. Name is not provided');
		if (typeof initialFuntion !== 'function')
			throw Error('Cannot create timeline. Initial function is not provided');

		this.name = name;
		this.initialFuntion = initialFuntion;
		this.DataType = DataType;
		this.data = new DataType();
		this.loading = true;
		this.error = false;
	}

	static empty() {
		return {
			data: {}
		};
	}

	setStore(store) {
		this.store = store;
		this.store.dispatch(this.name, this);
		return this;
	}

	async initialFetch(props) {
		this.loading = true;
		this.store.dispatch(this.name, this);

		try {
			this.data = await this.initialFuntion(props, this.store);
		}
		catch (e) {
			console.log(e);
			this.error = true;
		}
		this.loading = false;

		this.store.dispatch(this.name, this);
		return this;
	}

	uninitialize() {
		this.initialized = false;
		this.data = new this.DataType();
		this.loading = false;
		this.error = false;
	}

	async reset() {
		return this.initialFetch();
	}
}
