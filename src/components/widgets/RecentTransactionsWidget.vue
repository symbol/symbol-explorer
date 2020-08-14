<template>
	<Card :loading="loading">
		<template #title>
			{{getNameByKey('recentTransactions')}}
		</template>

		<template #control>
			<router-link to="/transactions">
				<ButtonMore> {{getNameByKey('viewAllTransactions')}} </ButtonMore>
			</router-link>
		</template>

		<template #body>
			<b-container fluid>
				<b-row>
					<b-col
						sm="6"
						md="3"
						lg="6"
						xl="12"
						v-for="(item, index) in transactionList"
						:key="'recent_blocks_'+index+'_'+item.height"
					>
						<Card
							class="card-item"
							:item="item"
						>
							<template #header>
								<router-link
									:to="'/transaction/'+item.transactionHash"
									class="ex-title-text ex-long-text"
									:title="'Transaction hash: ' + item.transactionHash"
								>
									{{item.transactionHash}}
								</router-link>
							</template>
							<template #body>
								<div class="ex-row no-wrap">
									<div class="ex-text">
										{{getNameByKey('block')}}: {{ item.height }}
									</div>
									<div class="ex-long-text ex-text" :title="'Type: ' + item.type" style="margin-left: 20px">
										{{ item.type }}
									</div>
								</div>
								<div class="ex-row no-wrap">
									<div class="ex-text">
										{{getNameByKey('sender')}}
									</div>
									<router-link
										:to="'/account/'+item.signer"
										class="ex-long-text ex-account-text"
										:title="item.signer"
									>
										{{item.signer}}
									</router-link>
								</div>
							</template>
						</Card>
					</b-col>
				</b-row>
			</b-container>
		</template>
	</Card>
</template>

<script>
import Card from '@/components/containers/Card.vue';
import ButtonMore from '@/components/controls/ButtonMore.vue';
import { mapGetters } from 'vuex';

export default {
	components: {
		Card,
		ButtonMore
	},

	computed: {
		...mapGetters({
			transactionList: 'transaction/getRecentList'
		}),

		loading() {
			return !this.transactionList.length;
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
.card-item::before {
    width: 4px;
    content: '';
    height: 100%;
    position: absolute;
    padding: 0;
    left: 0;
    top: 0;
    background: #ab5cb9;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
}

.card-item {
    .card-body {
        padding: 0;

        .ex-title-text {
            color: black;
        }

        .ex-long-text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .ex-row {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            .ex-text {
                font-size: 10px;
                color: #acacac;
            }

            .ex-account-text {
                color: #84accb;
                font-weight: 600;
                font-size: 12px;
                margin-left: 20px;
            }
        }

        .no-wrap {
            flex-wrap: nowrap;
            white-space: nowrap;
        }
    }
}
</style>
