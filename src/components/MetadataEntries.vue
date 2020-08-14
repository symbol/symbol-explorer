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
	<div>
		<Card :loading="loading">
			<template #title>{{metadataEntries}}</template>

			<template #body>
				<TableListView :data="data" :pagination="true" :pageSize="5" />
			</template>
		</Card>
	</div>
</template>

<script>
import TableListView from '@/components/tables/TableListView.vue';
import Card from '@/components/containers/Card.vue';

export default {
	components: {
		TableListView,
		Card
	},

	data() {
		return {
			metadataEntries: 'metadataEntriesTitle'
		};
	},

	props: {
		data: {
			type: Array,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		}
	}
};
</script>
