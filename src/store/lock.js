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

import AwaitLock from 'await-lock';

export default class Lock {
	constructor(lock) {
		this.lock = lock;
	}

	static create() {
		return new Lock(new AwaitLock());
	}

	// Helper method for initialize callback.
	async initialize(callback, commit, dispatch, getters) {
		await this.lock.acquireAsync();
		try {
			if (!getters.getInitialized) {
				await callback();
				commit('setInitialized', true);
			}
		}
		finally {
			this.lock.release();
		}
	}

	// Helper method for uninitialize callback.
	async uninitialize(callback, commit, dispatch, getters) {
		await this.lock.acquireAsync();
		try {
			if (getters.getInitialized) {
				await callback();
				commit('setInitialized', false);
			}
		}
		finally {
			this.lock.release();
		}
	}
}
