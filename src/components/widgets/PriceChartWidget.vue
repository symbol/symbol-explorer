<template>
	<Card :loading="loading">
		<template #title>
			{{getNameByKey('xemPrice')}}
		</template>

		<template #control>
			<!--<ButtonMore> {{getNameByKey('View all statistics')}} </ButtonMore>-->
		</template>

		<template #body>
			<b-row style="margin: -20px">
				<b-col>
					<Chart
						type="area"
						:height="265"
						:data="chartData"
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
			marketData: 'chain/getMarketData'
		}),

		chartData() {
			return [
				{
					name: 'Price (USD)',
					data: this.marketData.historicalHourlyGraph
				}
			];
		},

		loading() {
			return !this.marketData.historicalHourlyGraph.length;
		}
	},

	methods: {
		getNameByKey(e) {
			return this.$store.getters['ui/getNameByKey'](e);
		}
	}
};
</script>
