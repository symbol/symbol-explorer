<template>
	<Card :loading="loading">
		<template #title>
			{{getNameByKey('baseInfo')}}
		</template>

		<template #body>
			<b-container fluid style="height: 100%">
				<b-row>
					<b-col class="ex-item" sm="3" lg="12">
						<div class="ex-item-title">
							{{getNameByKey('price')}}
						</div>
						<div class="ex-item-value">
							{{marketData.price}}
						</div>
					</b-col>
					<b-col class="ex-item" sm="3" lg="12">
						<div class="ex-item-title">
							{{getNameByKey('marketCap')}}
						</div>
						<div class="ex-item-value">
							{{marketData.marketCap}}
						</div>
					</b-col>
					<b-col class="ex-item" sm="3" lg="12">
						<div class="ex-item-title">
							{{getNameByKey('totalTransactions')}}
						</div>
						<div class="ex-item-value">
							{{storageInfo.numTransactions}}
						</div>
					</b-col>
					<b-col class="ex-item" sm="3" lg="12">
						<div class="ex-item-title">
							{{getNameByKey('blockHeight')}}
						</div>
						<div class="ex-item-value">
							{{blockHeight}}
						</div>
					</b-col>
				</b-row>
			</b-container>
		</template>
	</Card>
</template>

<script>
import Card from '@/components/containers/Card.vue';
import { mapGetters } from 'vuex';

export default {
	components: {
		Card
	},

	computed: {
		...mapGetters({
			blockHeight: 'chain/getBlockHeight',
			storageInfo: 'chain/getStorageInfo',
			marketData: 'chain/getMarketData'
		}),

		loading() {
			return !this.blockHeight;
		}
	},

	methods: {
		getNameByKey(e) {
			return this.$store.getters['ui/getNameByKey'](e);
		}
	}
};
</script>

<style lang="scss" scoped>
.ex-item {
    border-left: 4px solid #904d9c;
    padding: 1px 10px;
    margin-bottom: 15px;

    .ex-item-title {
        color: rgb(187, 187, 187);
        font-size: 12px;
    }

    .ex-item-value {
        color: rgb(85, 85, 85);
        text-align: left;
        font-size: 14px;
        margin: 4px 0 0;
    }
}
</style>
