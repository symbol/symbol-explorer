<template>
	<Card :loading="loading" v-if="isWidgetShown">
		<template #title>{{getNameByKey('transactionGraphic')}}</template>

		<template #body>
			<div class="body">
				<TransferGraphic v-if="data.type === TransactionType.TRANSFER" v-bind="data" />
				<AddressAliasGraphic v-if="data.type === TransactionType.ADDRESS_ALIAS" v-bind="data" />
				<MosaicAliasGraphic v-if="data.type === TransactionType.MOSAIC_ALIAS" v-bind="data" />
				<NamespaceRegistrationGraphic v-if="data.type === TransactionType.NAMESPACE_REGISTRATION" v-bind="data" />
			</div>
		</template>
	</Card>
</template>

<script>
import Card from '@/components/containers/Card.vue';
import TransferGraphic from '@/components/transaction-graphic/TransferGraphic.vue';
import AddressAliasGraphic from '@/components/transaction-graphic/AddressAliasGraphic.vue';
import MosaicAliasGraphic from '@/components/transaction-graphic/MosaicAliasGraphic.vue';
import NamespaceRegistrationGraphic from '@/components/transaction-graphic/NamespaceRegistrationGraphic.vue';
import { TransactionType } from 'symbol-sdk';

export default {
	props: {
		managerGetter: String
	},

	components: {
		Card,
		TransferGraphic,
		AddressAliasGraphic,
		MosaicAliasGraphic,
		NamespaceRegistrationGraphic
	},

	data() {
		return {
			TransactionType
		};
	},

	computed: {
		isWidgetShown() {
			return this.data.type === TransactionType.TRANSFER ||
        this.data.type === TransactionType.ADDRESS_ALIAS ||
        this.data.type === TransactionType.MOSAIC_ALIAS ||
        this.data.type === TransactionType.NAMESPACE_REGISTRATION;
		},

		data() {
			return this.$store.getters[this.managerGetter].data;
		},

		loading() {
			return this.$store.getters[this.managerGetter].loading;
		},

		error() {
			return this.$store.getters[this.managerGetter].error;
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
.body {
    display: flex;
    justify-content: center;
}
</style>
