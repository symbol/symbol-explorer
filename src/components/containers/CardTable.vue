<template>
	<Card class="card-f card-full-width" :loading="loading" :error="error">
		<template #title>{{getNameByKey(title)}}</template>
		<template #control>
			<div class="ex-infotext" v-if="hasInfoText">{{infoText}}</div>
			<component
				v-if="hasFilter"
				:is="filterDropdownComponentName"
				:options="filterOptions"
				:value="filterValue"
				:index="filterIndex"
				right
				@change="changeFilterValue"
			/>
			<Pagination v-else-if="pagination === 'custom'" v-bind="paginationOptions" />
		</template>
		<template #body>
			<TableListView
				v-if="Array.isArray(data)"
				:data="data"
				:timeline="manager"
				:timelinePagination="pagination === 'server'"
				:pagination="pagination === 'client'"
				:pageSize="pageSize"
				:emptyDataMessage="emptyDataMessage"
			/>
			<TableInfoView
				v-else-if="typeof data === 'object'"
				:data="data"
				:emptyDataMessage="emptyDataMessage"
			/>
			<div v-else>{{ getNameByKey(emptyDataMessage) }}</div>
		</template>

		<template #error>{{getNameByKey(errorMessage)}}</template>
	</Card>
</template>

<script>
import Card from '@/components/containers/Card.vue';
import TableListView from '@/components/tables/TableListView.vue';
import TableInfoView from '@/components/tables/TableInfoView.vue';
import DropdownFilter from '@/components/controls/DropdownFilter.vue';
import Dropdown from '@/components/controls/Dropdown.vue';
import Pagination from '@/components/controls/Pagination.vue';

export default {
	components: {
		Card,
		TableListView,
		TableInfoView,
		DropdownFilter,
		Dropdown,
		Pagination
	},

	props: {
		// Displays title in the card header
		title: {
			type: String
		},
		// Displays text in the card header
		hasInfoText: {
			type: Boolean,
			default: false
		},
		infoTextGetter: {
			type: String
		},
		// Adds dropdown for Filter Data Manager
		hasFilter: {
			type: Boolean,
			default: false
		},
		// Data Manager getter (DataSet, Timeline, Filter)
		managerGetter: {
			type: String
		},
		// Object or Array. If not provided, will use data from Data Manager
		dataGetter: {
			type: String
		},
		// pagination: 'disabled' | 'client' | 'server'(works only with Timeline data manager) | 'custom'(displayed in the header)
		pagination: {
			type: String,
			default: 'disabled'
		},
		// options for custom pagination (props of the Parination component) (displayed in the header)
		paginationOptions: {
			type: Object,
			default: () => ({})
		},
		// client-side pagination pageSize
		pageSize: {
			type: Number,
			default: 10
		},
		// fields to show in the table
		fields: {
			type: Array
		},
		// fields to show in the table (mobile view)
		mobileFields: {
			type: Array
		},

		errorMessage: {
			type: String,
			default: 'Unable to fetch data'
		},

		emptyDataMessage: {
			type: String,
			default: 'nothingToShow'
		}
	},

	computed: {
		manager() {
			return this.getter(this.managerGetter) || {};
		},

		data() {
			const data = this.getter(this.dataGetter) || this.manager.data;

			if (typeof data === 'undefined') {
				throw Error(
					'ListPage error. Manager or Data getter is not provided'
				);
			}

			if (
				!Array.isArray(data) &&
                data !== null &&
                typeof data === 'object'
			) {
				let fields = null;

				if (this.$store.getters['ui/isMobile'] && this.mobileFields?.length)
					fields = this.mobileFields;
				else fields = this.fields;
				if (Array.isArray(fields) && fields.length) {
					return Object.fromEntries(
						fields.map(field => [field, data[field]])
					);
				}
			}

			if (
				Array.isArray(data) &&
                this.$store.getters['ui/isMobile'] &&
                Array.isArray(this.mobileFields)
			) {
				return data.map(row => {
					let mobileRow = {};

					for (let item of this.mobileFields) {
						if (Object.keys(row).includes(item))
							mobileRow[item] = row[item];
					}

					return mobileRow;
				});
			}
			else if (Array.isArray(data) && Array.isArray(this.fields)) {
				return data.map(row => {
					let columnRow = {};

					for (let item of this.fields) {
						if (Object.keys(row).includes(item))
							columnRow[item] = row[item];
					}

					return columnRow;
				});
			}
			else return data;
		},

		loading() {
			return this.manager.loading;
		},

		error() {
			return this.manager.error;
		},

		infoText() {
			if (typeof this.infoTextGetter === 'string')
				return this.getter(this.infoTextGetter);
			return undefined;
		},

		filterValue() {
			return this.manager.filterValue;
		},

		filterIndex() {
			return this.manager.filterIndex;
		},

		filterOptions() {
			return this.manager.filterOptions;
		},

		filterDropdownComponentName() {
			return Array.isArray(this.filterOptions)
				? 'DropdownFilter'
				: 'Dropdown';
		}
	},

	methods: {
		getNameByKey(e) {
			return this.$store.getters['ui/getNameByKey'](e);
		},

		changeFilterValue(e) {
			if (typeof this.manager.changeFilterValue === 'function')
				this.manager.changeFilterValue(e);
			else {
				console.error(
					'Failed to change filter value. "changeFilterValue" is not a function'
				);
			}
		},

		getter(name) {
			return this.$store.getters[name];
		}
	}
};
</script>
