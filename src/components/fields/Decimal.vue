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

<template>
	<div :value="value">
		<span>{{decimalSplit(value)[0]}}</span>
		<span v-if="decimalSplit(value).length > 1" class="decimalLight">.{{decimalSplit(value)[1]}}</span>
	</div>
</template>
<script>
export default {
	name: 'Decimal',
	props: {
		value: String
	},
	methods: {
		decimalSplit(value) {
			return value.split('.', 2);
		}
	}
};
</script>

<style lang="scss" scoped>
.decimalLight {
    color: $table-text-color-light;//#98a8b48c;
}
</style>
