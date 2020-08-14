<template>
	<Card :loading="loading">
		<template #title>
			{{getNameByKey('networkRentalFees')}}
		</template>

		<template #body>
			<b-container fluid>
				<b-row>
					<b-col class="ex-item" sm="4" lg="12">
						<div class="ex-item-title">
							{{getNameByKey('effectiveRootNamespaceRentalFeePerBlock')}}
						</div>
						<div class="ex-item-value">
							{{rentalFees.effectiveRootNamespaceRentalFeePerBlock}}
						</div>
					</b-col>
					<b-col class="ex-item" sm="4" lg="12">
						<div class="ex-item-title">
							{{getNameByKey('effectiveChildNamespaceRentalFee')}}
						</div>
						<div class="ex-item-value">
							{{rentalFees.effectiveChildNamespaceRentalFee}}
						</div>
					</b-col>
					<b-col class="ex-item" sm="4" lg="12">
						<div class="ex-item-title">
							{{getNameByKey('effectiveMosaicRentalFee')}}
						</div>
						<div class="ex-item-value">
							{{rentalFees.effectiveMosaicRentalFee}}
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
			rentalFees: 'statistic/getNetworkRentalFees',
			loading: 'statistic/getLoadingInfo',
			error: 'statistic/getError'
		})
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
