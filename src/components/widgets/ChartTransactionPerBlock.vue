<template>
	<Card :loading="loading">
		<template #title>
			{{getNameByKey(transactionPerBlockData.name)}}
		</template>

		<template #body>
			<b-row style="margin: -20px">
				<b-col>
					<Chart
						type="line"
						:data="chartData"
						:height="265"
						xaxisType="numeric"
					/>
				</b-col>
			</b-row>
		</template>
	</Card>
</template>

<script>
import Card from '@/components/containers/Card.vue';
import Chart from '@/components/Chart.vue';
import { mapGetters } from 'vuex';

export default {
	components: {
		Card,
		Chart
	},

	computed: {
		...mapGetters({
			transactionPerBlockData: 'statistic/getTransactionPerBlockData',
			loading: 'statistic/getLoadingTransactionPerBlock'
		}),

		chartData() {
			return this.transactionPerBlockData.data;
		}
	},

	methods: {
		getNameByKey(e) {
			return this.$store.getters['ui/getNameByKey'](e);
		}
	}
};
</script>
