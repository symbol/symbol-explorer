<template>
	<Card :loading="loading">
		<template #title>
			{{getNameByKey('checkTransactionStatus')}}
		</template>

		<template #body>
			<b-container fluid>
				<b-row>
					<b-col auto>
						<b-input
							v-model="hash"
							:placeholder="getNameByKey('transactionHash')"
							size="sm"
							@focus="clear"
							@change="getStatus"
						/>
					</b-col>
					<b-col style="flex-grow: 0">
						<b-button @click="getStatus" variant="primary" size="sm">
							{{getNameByKey('check')}}
						</b-button>
					</b-col>
				</b-row>
				<b-row>
					<div :style="statusStyle" class="btn-sm m-1 status ">
						{{getNameByKey(statusText)}}
					</div>
					<b-button
						v-if="statusDetail"
						v-b-toggle.collapse-3
						class="m-1 detail-button"
						size="sm"
						variant="plain"
					>
						{{getNameByKey('Show detail')}}
					</b-button>
					<b-collapse id="collapse-3" class="detail-table">
						<TableInfoView :data="statusDetail" />
					</b-collapse>
				</b-row>

			</b-container>
		</template>
	</Card>
</template>

<script>
import Card from '@/components/containers/Card.vue';
import TableInfoView from '@/components/tables/TableInfoView.vue';
import { mapGetters } from 'vuex';

export default {
	components: {
		Card,
		TableInfoView
	},

	mounted() {
		this.clear();
	},

	data() {
		return {
			hash: '',
			statusStyle: {},
			statusText: '',
			statusDetail: null
		};
	},

	computed: {
		...mapGetters({
			blockHeight: 'transaction/getBlockHeight',
			transactionStatus: 'transaction/getTransactionStatus'
		}),

		loading() {
			return !this.blockHeight;
		}
	},

	methods: {
		clear() {
			this.clearStatus();
			this.hash = '';
		},

		clearStatus() {
			this.statusStyle = {};
			this.statusText = '';
			this.statusDetail = null;
			this.$store.dispatch('transaction/clearTransactionStatus');
		},

		getNameByKey(e) {
			return this.$store.getters['ui/getNameByKey'](e);
		},

		getStatus() {
			const hash = this.hash;

			this.clearStatus();
			this.$store.dispatch('transaction/getTransactionStatus', hash);
		}
	},

	watch: {
		transactionStatus(status) {
			let color = '';

			switch (status.message) {
			case 'confirmed':
				color = '--green';
				break;
			case 'unconfirmed':
				color = '--orange';
				break;
			default:
				color = '--red';
				break;
			}

			this.statusText = status.message
				? status.message.charAt(0).toUpperCase() + status.message.slice(1)
				: status.message;
			this.statusDetail = status.detail;
			this.statusStyle = { color: `var(${color})` };
		}
	}
};
</script>

<style lang="scss" scoped>
.status {
    font-size: 12px;
    padding-left: 15px;
    margin-left: 0;
    width: 100%;
}

.detail-button {
    margin-bottom: 10px;
    display: inline;
}

.detail-table {
    width: 100%;
}
</style>
