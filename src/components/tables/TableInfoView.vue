<template>
	<div v-if="data" class="table-view">
		<table v-if="dataIsNotEmpty" class="table ex-table-striped">
			<tbody>
				<tr v-for="(item, itemKey) in formattedData" :key="'tiv_r'+itemKey">
					<td class="table-titles table-titles-ver table-title-item table-cell">
						{{getKeyName(itemKey)}}
					</td>
					<td
						class="max-item-width table-cell"
						:title="getKeyName(itemKey) + ': ' + item"
						@click="onItemClick(itemKey, item)"
					>
						<ArrayField v-if="isArrayField(itemKey)" :itemKey="itemKey" :value="item" />
						<MosaicsField v-else-if="itemKey === 'mosaics'" :value="item" />
						<Decimal v-else-if="isDecimal(itemKey)" :value="item" />
						<TransactionType v-else-if="isTransactionType(itemKey)" :value="item" />
						<router-link
							v-else-if="isKeyClickable(itemKey) && getItemHref(itemKey, item)"
							:to="getItemHref(itemKey, item)"
						>{{ item }}</router-link>
						<div v-else>{{ item }}</div>
					</td>
				</tr>
			</tbody>
		</table>
		<div v-else class="empty-data">{{emptyDataMessageFormatted}}</div>
	</div>
</template>

<script>
import TableView from './TableView.vue';
import MosaicsField from '@/components/fields/MosaicsField.vue';
import ArrayField from '@/components/fields/ArrayField.vue';
import TransactionType from '@/components/fields/TransactionType.vue';

export default {
	extends: TableView,

	components: {
		MosaicsField,
		ArrayField,
		TransactionType
	},

	props: {
		data: {
			type: Object,
			required: true
		}
	},

	created() {
		this.componentType = 'info';
	},

	mounted() {
		// this.$store.dispatch(this.view + "/fetchInfo", this.infoId);
	},

	computed: {
		formattedData() {
			let formattedData = {};

			for (let key in this.data) {
				if (this.isItemShown(key, this.data[key]))
					formattedData[key] = this.data[key];
			}

			return formattedData;
		},

		header() {
			let header = ['', ''];

			return header;
		},

		dataIsNotEmpty() {
			return Object.keys(this.data).length;
		}
	}
};
</script>

<style lang="scss" scoped>
.table-view {
    overflow: auto;

    .table-left-header {
        font-weight: bold;
    }
}
</style>
