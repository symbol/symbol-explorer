<script>
import Age from '../fields/Age.vue';
import Constants from '../../config/constants';
import Decimal from '@/components/fields/Decimal.vue';
import Truncate from '@/components/fields/Truncate.vue';

export default {
	components: {
		Age,
		Decimal,
		Truncate
	},
	props: {
		height: {
			type: Number
		},

		emptyDataMessage: {
			type: String,
			default: 'nothingToShow'
		}
	},

	data() {
		return {
			componentType: 'list',
			clickableKeys: [
				'account',
				'block',
				'address',
				'height',
				'mosaic',
				'namespace',
				'namespaceName',
				'linkedNamespace',
				'mosaicAliasName',
				'accountAliasName',
				'aliasAddress',
				'aliasMosaic',
				'transaction',
				'harvester',
				'beneficiaryAddress',
				'mosaicId',
				'namespaceId',
				'parentId',
				'transactionHash',

				'addressHeight',
				'publicKeyHeight',
				'importanceHeight',
				'multisigAddresses_',
				'cosignatoryAddresses_',

				'signer',
				'recipient',
				'owneraddress',
				'blockHeight',
				'endHeight',
				'startHeight',

				'lastActivity',
				'recalculationBlock',
				'sourceAddress',
				'targetAddress',
				'targetMosaicId',
				'targetNamespaceId',
				'unresolved',
				'addressResolutionEntries_',
				'mosaicResolutionEntries_',
				'restrictionMosaicValues',
				'restrictionAddressValues',
				'referenceMosaicId',
				'restrictionAddressAdditions',
				'restrictionAddressDeletions',
				'restrictionMosaicAdditions',
				'restrictionMosaicDeletions',
				'addressAdditions_',
				'addressDeletions_',
				'linkedAccountAddress'
			],
			disableClickValues: [...Object.values(Constants.Message)],
			changeDecimalColor: [
				'amount',
				'fee',
				'relativeAmount',
				'feeMultiplier',
				'difficulty',
				'balance'
			],
			allowArrayToView: [
				'linkedNamespace',
				'cosignatoryAddresses',
				'multisigAddresses',
				'restrictionAddressValues',
				'restrictionMosaicValues',
				'restrictionTransactionValues',
				'restrictionAddressAdditions',
				'restrictionAddressDeletions',
				'restrictionMosaicAdditions',
				'restrictionMosaicDeletions',
				'restrictionOperationAdditions',
				'restrictionOperationDeletions',
				'addressAdditions',
				'addressDeletions',
				'voting',
				'addressResolutionEntries',
				'mosaicResolutionEntries',
				'stateHashSubCacheMerkleRoots'
			]
		};
	},

	computed: {
		emptyDataMessageFormatted() {
			return this.$store.getters['ui/getNameByKey'](
				this.emptyDataMessage
			);
		}
	},

	methods: {
		isKeyClickable(itemKey) {
			return this.clickableKeys.indexOf(itemKey) !== -1;
		},

		isValueClickable(item) {
			return this.disableClickValues.indexOf(item) === -1;
		},

		isDecimal(itemKey) {
			return this.changeDecimalColor.indexOf(itemKey) !== -1;
		},

		isMosaics(itemKey) {
			return itemKey === 'mosaics';
		},

		isAge(itemKey) {
			return itemKey === 'age';
		},

		isTransactionType(itemKey) {
			return itemKey === 'transactionType';
		},

		isArrayField(itemKey) {
			return this.allowArrayToView.indexOf(itemKey) !== -1;
		},

		isTruncate(key) {
			return (
				key === 'harvester' ||
                key === 'address' ||
                key === 'signer' ||
                key === 'recipient' ||
                key === 'transactionHash' ||
                key === 'owneraddress' ||
                key === 'host' ||
                key === 'friendlyName' ||
                key === 'multisigAddresses_' ||
				key === 'cosignatoryAddresses_' ||
				key === 'addressAdditions_' ||
				key === 'addressDeletions_'
			);
		},

		isAggregateInnerTransaction(itemKey) {
			return itemKey === 'transactionBody';
		},

		isItemShown(itemKey, item) {
			if (this.isArrayField(itemKey)) return item?.length !== 0;

			return item != null;
		},

		onItemClick(itemKey, item) {
			if (this.isKeyClickable(itemKey) && this.isValueClickable(item)) {
				this.$store.dispatch(`ui/openPage`, {
					pageName: itemKey,
					param: item
				});
			}
		},

		getItemHref(itemKey, item) {
			if (this.isValueClickable(item)) {
				return this.$store.getters[`ui/getPageHref`]({
					pageName: itemKey,
					param: item
				});
			}
		},

		getKeyName(key) {
			return this.$store.getters['ui/getNameByKey'](key);
		}
	}
};
</script>

<style lang="scss">
.table-view {
    .table {
        width: 100%;
        max-width: 100%;
        margin-bottom: 1rem;
        background-color: transparent;
        font-size: 12px;
        color: $table-text-color;
    }

    thead {
        border-radius: 4px;
    }

    thead th {
        vertical-align: middle;
        border: 0 none;
        padding: 12px 6px 12px 6px;
        outline: none;
    }

    .empty-data {
        font-size: 14px;
        color: $card-error-text-color;
        display: flex;
        justify-content: center;
    }

    .table-title-item {
        vertical-align: middle;
        padding: 12px 6px 12px 6px;
        color: $table-title-text-color;
        font-weight: bolder;
        outline: none;
        font-size: 12px;
        letter-spacing: 1px;
    }

    .table-titles-ver {
        width: 30%;
        max-width: 200px;
    }

    .ex-table-striped tbody tr:hover {
        background-color: $table-hover-color;
    }

    .ex-table-striped tbody tr:nth-child(odd) td {
        background-color: $table-striped-color-first;
    }

    .ex-table-striped tbody tr:nth-child(even) td {
        background-color: $table-striped-color-second;
    }

    .table-head-cell {
        position: relative;
    }

    .table-head-cell::before {
        content: "&nbsp;";
        visibility: hidden;
    }

    .table-head-cell span {
        position: absolute;
        left: 5px;
        right: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .table-cell {
        border-bottom: 1px solid #dadee6;
        font-weight: none;
        padding: 10px 5px;
        min-height: 50px;
        word-break: break-all;
        min-width: 50px;
        max-width: 300px;
    }

    .date, .deadline, .age, .height {
        word-break: normal;
    }

    @media screen and (max-width: 40em) {
        .date, .deadline {
            width: 85px;
        }
    }

    .table-item-clickable {
        color: var(--primary);
        font-weight: 600;
        text-decoration: none;
        cursor: pointer;

        a {
            font-weight: 600;
        }
    }

    .table-titles {
        background-color: rgba(52, 40, 104, 0.05);
    }
}
</style>
