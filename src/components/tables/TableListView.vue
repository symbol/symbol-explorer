<template>
	<div v-if="data" class="table-view">
		<div v-if="dataIsNotEmpty" class="table-wrapper">
			<table class="table ex-table-striped">
				<thead>
					<tr>
						<th
							v-for="(columnName, index) in header"
							class="table-head-cell table-title-item"
							:key="'tlv_h'+index"
						>
							<span>{{getKeyName(columnName)}}</span>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(row, rowIndex) in preparedData"
						class="t-row"
						:key="'tlv_r'+rowIndex"
					>
						<td
							v-for="(item, itemKey) in row"
							class="table-cell"
							:key="'tlv_r'+rowIndex+'i'+itemKey"
							:class="{[itemKey]: true}"
							:title="getKeyName(itemKey) + (typeof item !== 'string' ? '' : ': ' +  item)"
						>
							<ArrayField v-if="isArrayField(itemKey)" :itemKey="itemKey" :value="item" />
							<Age v-else-if="isAge(itemKey)" :date="item" />
							<Decimal v-else-if="isDecimal(itemKey)" :value="item" />
							<MosaicsField v-else-if="isMosaics(itemKey)" :value="item" />
							<TransactionType v-else-if="isTransactionType(itemKey)" :value="item" />

							<div v-else-if="isAggregateInnerTransaction(itemKey)">
								<b-link v-b-modal="'tlv_r'+rowIndex">Show Detail</b-link>
								<Modal :id="'tlv_r'+rowIndex" :title="item.type">
									<div slot="body">
										<AggregateTransaction slot="body" :transactionBody="item" />
									</div>
								</Modal>
							</div>

							<div v-else class="max-item-width">
								<router-link
									v-if="isKeyClickable(itemKey) && getItemHref(itemKey, item)"
									:to="getItemHref(itemKey, item)"
								>
									<Truncate v-if="isTruncate(itemKey)">{{item}}</Truncate>
									<div v-else>{{ item }}</div>
								</router-link>
								<div v-else>
									<Truncate v-if="isTruncate(itemKey)">{{item}}</Truncate>
									<div v-else>{{ item }}</div>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<div v-if="pagination || timelinePagination" class="bottom">
				<div v-if="pagination">{{ pageIndex + 1 }}/{{ getPageNumber(lastPage) }}</div>
				<div v-else>{{ getPageNumber(timeline.index, timeline.pageNumber) }}/ {{ getPageNumber(timeline.lastPage) }}</div>
				<div class="pagination-wrapper">
					<Pagination
						:canFetchPrevious="prevPageExist"
						:canFetchNext="nextPageExist"
						:goUp="false"
						class="pagination"
						@next="nextPage"
						@previous="prevPage"
					/>
					<Loading small v-if="paginationLoading" />
				</div>
			</div>
		</div>
		<div v-else class="empty-data">{{emptyDataMessageFormatted}}</div>
	</div>
</template>

<script>
import TableView from './TableView.vue';
import Modal from '@/components/containers/Modal.vue';
import AggregateTransaction from '@/components/AggregateTransaction.vue';
import Pagination from '@/components/controls/Pagination.vue';
import MosaicsField from '@/components/fields/MosaicsField.vue';
import TransactionType from '@/components/fields/TransactionType.vue';
import ArrayField from '../fields/ArrayField.vue';
import Loading from '@/components/Loading.vue';

export default {
	extends: TableView,

	components: {
		Modal,
		AggregateTransaction,
		Pagination,
		MosaicsField,
		TransactionType,
		ArrayField,
		Loading
	},

	props: {
		data: {
			type: Array,
			required: true
		},

		pagination: {
			type: Boolean,
			default: false
		},

		timelinePagination: {
			type: Boolean,
			default: false
		},

		timeline: {
			type: Object
		},

		pageSize: {
			type: Number,
			default: 10
		}
	},

	created() {
		this.componentType = 'list';
	},

	data() {
		return {
			pageIndex: 0,
			openedModal: null
		};
	},

	computed: {
		preparedData() {
			if (
				Array.isArray(this.data) &&
                this.pagination === true &&
                !this.timelinePagination
			) {
				return this.data.slice(
					this.pageIndex * this.pageSize,
					this.pageIndex * this.pageSize + this.pageSize
				);
			}
			else return this.data;
		},

		nextPageExist() {
			if (this.timelinePagination && this.timeline instanceof Object)
				return this.timeline.canFetchNext;
			else return this.pageSize * (this.pageIndex + 1) < this.data.length;
		},

		prevPageExist() {
			if (this.timelinePagination && this.timeline instanceof Object)
				return this.timeline.canFetchPrevious;
			else return this.pageIndex > 0;
		},

		lastPage() {
			return Math.ceil(this.data.length / this.pageSize);
		},

		header() {
			let header = [];

			if (this.data) for (let key in this.data[0]) header.push(key);
			return header;
		},

		dataIsNotEmpty() {
			return this.data.length;
		},

		paginationLoading() {
			return this.timeline?.isLoading === true;
		}
	},

	methods: {
		onMoreClick() {
			this.$store.dispatch(this.nextPageAction);
		},

		nextPage() {
			if (this.nextPageExist) {
				if (this.timelinePagination)
				// this.$store.dispatch(this.timelineNextAction)
					this.timeline.fetchNext();
				else this.pageIndex++;
			}
		},

		prevPage() {
			if (this.prevPageExist) {
				if (this.timelinePagination)
				// this.$store.dispatch(this.timelinePreviousAction)
					this.timeline.fetchPrevious();
				else this.pageIndex--;
			}
		},

		getPageNumber() {
			const args = [...arguments];
			const number = args.find(arg => typeof arg === 'number');

			return typeof number === 'number'
				? number
				: '..';
		}
	},

	watch: {
		preparedData() {
			if (this.pageIndex >= this.lastPage)
				this.pageIndex = this.lastPage - 1;
		}
	}
};
</script>

<style lang="scss" scoped>
.table-view {
    overflow: auto;

    .bottom {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #393939;

        .pagination-wrapper {
            position: relative;
            display: flex;

            .pagination {
                margin: 0;
                margin-left: 10px;
            }
        }
    }
}
</style>
