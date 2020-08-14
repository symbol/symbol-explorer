<template>
	<div>
		<div v-if="transactionBody.transactionType === TransactionType.AGGREGATE_BONDED">
			<span>{{getKeyName('innerTransactionTitle')}}</span>
			<div v-for="(row, rowIndex) in transactionBody.innerTransactions" :key="rowIndex" >
				<TableInfoView :data="row.transactionBody"  />
			</div>

			<div v-if="transactionBody.cosignatures.length < 1">
				<span>{{getKeyName('transactionAwaitingCosignatureTitle')}}</span>
				<p> {{getKeyName('transactionAwaitingRemarkTitle')}} </p>
			</div>

			<div v-else>
				<span>{{getKeyName('cosignaturesReceivedTitle')}}</span>
				<TableListView :data="transactionBody.cosignatures" />
			</div>
		</div>
		<div v-else>
			<TableInfoView :data="transactionBody" />
		</div>
	</div>
</template>

<script>
import TableInfoView from '@/components/tables/TableInfoView.vue';
import TableView from '@/components/tables/TableView.vue';
import { TransactionType } from 'symbol-sdk';

export default {
	extends: TableView,
	components: {
		// https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
		// eslint-disable-next-line
    TableListView: () => import('../components/tables/TableListView'),
		TableInfoView
	},
	data() {
		return {
			TransactionType: TransactionType
		};
	},
	props: {
		transactionBody: {
			type: Object,
			required: true
		}
	}
};
</script>
