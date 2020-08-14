/*
 *
 * Copyright (c) 2019-present for NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License ");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

<template>
	<div class="mosaics-container">
		<span
			v-for="(item, index) in value"
			class="mosaic"
			:key="'mos_s' + index"
			:title="'Mosaic: ' + item.id + ' | Amount: ' + item.amount"
		>
			<span class="mosaic-name">
				<router-link :to="getItemHref('mosaicId', item.id)">
					<b class="link">{{item.id}}</b>
				</router-link>
			</span>
			<span class="mosaic-amount">
				<Decimal :value="item.amount" class="decimal"/>
			</span>
		</span>
	</div>
</template>

<script>
import Decimal from '@/components/fields/Decimal.vue';
import helper from '../../helper';

export default {
	name: 'MosaicsField',

	components: {
		Decimal
	},

	props: {
		value: {
			type: Array,
			required: true
		}
	},

	methods: {
		timeSince(interval) {
			return helper.timeSince(interval);
		},

		getItemHref(itemKey, item) {
			return this.$store.getters[`ui/getPageHref`]({ pageName: itemKey, param: item });
		}
	}
};
</script>

<style lang="scss" scoped>
.mosaics-container {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    .mosaic {
        display: inline-block;
        background: $primary-color;
        color: #fff;
        border-radius: 5px;
        border-width: 1px;
        border-style: solid;
        border-color: $primary-color;
        padding: 5px 10px;
        margin-right: 10px;
        white-space: nowrap;

        .mosaic-name {
            margin-right: 10px;

            .link {
                color: #fff;
            }
        }

        .mosaic-amount {
            .decimal {
                display: inline;
            }
        }
    }
}
</style>
