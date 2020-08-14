<template>
	<div class="page-assembler">
		<div class="page" v-if="layout === 'flex'">
			<div class="page-content-card-f" :class="layoutOptions">
				<template v-for="(item, index) in schema">
					<component
						:is="item.type"
						v-if="isItemShown(item)"
						class="card-f"
						:class="{'card-full-width': item.layoutOptions === 'full-width', 'card-adaptive': item.layoutOptions === 'adaptive'}"
						:data-cy="item.title"
						v-bind="item"
						:key="'col' + item.title + index"
					/>
				</template>
			</div>
		</div>
		<b-container fluid class="px-0 py-0" v-else-if="layout === 'bootstrap'">
			<b-row class="my-4 mx-0 mx-xs-0 mx-md-4 mx-lg-8" :class="layoutOptions">
				<template v-for="(item, index) in schema">
					<b-col :class="item.layoutOptions" class="bootstrap-col" :key="'col' + item.title + index">
						<component
							:is="item.type"
							v-if="isItemShown(item)"
							v-bind="item"
							style="width: 100%"
							:key="item.title + index"
						/>
					</b-col>
				</template>
			</b-row>
		</b-container>
		<div class="grid" v-else-if="layout === 'grid'">
			<template v-for="(item, index) in schema">
				<component
					:is="item.type"
					v-if="isItemShown(item)"
					style="margin-bottom: 0"
					:style="item.layoutOptions"
					v-bind="item"
					:key="'col' + item.title + index"
				/>
			</template>
		</div>
	</div>
</template>

<script>
import CardTable from '@/components/containers/CardTable.vue';
import BaseInfoWidget from '@/components/widgets/BaseInfoWidget.vue';
import PriceChartWidget from '@/components/widgets/PriceChartWidget.vue';
import RecentBlocksWidget from '@/components/widgets/RecentBlocksWidget.vue';
import RecentTransactionsWidget from '@/components/widgets/RecentTransactionsWidget.vue';
import TransactionGraphicWidget from '@/components/widgets/TransactionGraphicWidget.vue';

export default {
	components: {
		CardTable,
		BaseInfoWidget,
		PriceChartWidget,
		RecentBlocksWidget,
		RecentTransactionsWidget,
		TransactionGraphicWidget
	},

	props: {
		storeNamespaces: {
			type: Array,
			default: () => []
		},
		initActions: {
			type: Array,
			default: () => []
		},
		layout: {
			type: String,
			required: true,
			default: 'flex'
		},
		layoutOptions: {
			type: String,
			default: ''
		},
		schema: {
			type: Array,
			required: true,
			default: () => []
		}
	},

	async mounted() {
		console.log('initialize', this.storeNamespaces);
		await this.$store.dispatch('initialize', this.$route);
		if (this.storeNamespaces?.length) {
			for (const namespace of this.storeNamespaces)
				await this.$store.dispatch(namespace + '/initialize');
		}
		if (this.initActions?.length) {
			for (const action of this.initActions)
				await this.$store.dispatch(action, this.$route.params);
		}
	},

	computed: {
		prop() {
			for (let key in this.$route.params)
				return this.$route.params[key];
			return null;
		}
	},

	methods: {
		getter(e) {
			if (typeof e === 'string')
				return this.$store.getters[e];
		},

		isItemShown(item) {
			if (this.getter(item.hideDependOnGetter)?.error)
				return false;

			if (item.hideEmptyData && this.getData(item)?.length === 0)
				return false;

			if (item.hideOnError && this.getter(item.managerGetter)?.error)
				return false;

			return true;
		},

		getKeyName(e) {
			return this.$store.getters['ui/getKeyName'](e);
		},

		getData(item) {
			if (typeof item.dataGetter === 'string')
				return this.getter(item.dataGetter);
			else
				return this.getter(item.managerGetter)?.data;
		}
	}
};
</script>

<style lang="scss">
.page-assembler {
    width: 100%;
    height: 100%;
}

.bootstrap-col {
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
}

.grid {
    margin: 20px;
    height: 100%;
    display: grid;
    grid-gap: 20px;
}

.page {
    .page-content-card-f {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .card-f {
        margin: 10px;
    }

    .card-adaptive {
        flex: 1 1 auto;
        max-width: 100%;
    }

    .card-full-width {
        width: 100%;
    }

    .max-height-medium {
        max-height: 100px;
    }

    @media screen and (max-width: 40em) {
        .page-content-card-f {
            padding-left: 0;
            padding-right: 0;
        }

        .card-f {
            padding: 5px;
            padding-top: 10px;
            margin-left: 0;
            margin-right: 0;
            width: 100%;
        }
    }

    @media screen and (min-width: 80em) {
        .page-content-card-f {
            padding-left: 80px;
            padding-right: 80px;
        }

        .card-f {
            margin-right: 10px;
        }
    }
}
</style>
