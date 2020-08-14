import {
	TransactionType,
	TransactionGroup,
	AliasType,
	NamespaceRegistrationType,
	MosaicId,
	AccountOrderBy,
	MetadataType
} from 'symbol-sdk';

export const transaction = [
	{
		label: 'Recent',
		icon: 'mdi-clock-outline',
		value: {}
	},
	{
		label: 'Unconfirmed',
		icon: 'mdi-dots-horizontal',
		value: { group: TransactionGroup.Unconfirmed }
	},
	{
		label: 'Partial',
		icon: 'mdi-dots-horizontal',
		value: { group: TransactionGroup.Partial }
	},
	{
		label: 'Transfer',
		icon: 'mdi-swap-vertical',
		value: { type: [TransactionType.TRANSFER] }
	},
	{
		label: 'Account',
		icon: 'mdi-account',
		value: {
			type: [
				TransactionType.ADDRESS_ALIAS,
				TransactionType.MULTISIG_ACCOUNT_MODIFICATION,
				TransactionType.ACCOUNT_ADDRESS_RESTRICTION,
				TransactionType.ACCOUNT_MOSAIC_RESTRICTION,
				TransactionType.ACCOUNT_OPERATION_RESTRICTION,
				TransactionType.ACCOUNT_KEY_LINK,
				TransactionType.ACCOUNT_METADATA,
				TransactionType.VRF_KEY_LINK,
				TransactionType.VOTING_KEY_LINK,
				TransactionType.NODE_KEY_LINK
			]
		}
	},
	{
		label: 'Aggregate',
		icon: 'mdi-gamepad-circle',
		value: {
			type: [
				TransactionType.AGGREGATE_COMPLETE,
				TransactionType.AGGREGATE_BONDED,
				TransactionType.HASH_LOCK
			]
		}
	},
	{
		label: 'Alias',
		icon: 'mdi-comment-account',
		value: {
			type: [
				TransactionType.ADDRESS_ALIAS,
				TransactionType.MOSAIC_ALIAS
			]
		}
	},
	{
		label: 'Metadata',
		icon: 'mdi-xml',
		value: {
			type: [
				TransactionType.ACCOUNT_METADATA,
				TransactionType.MOSAIC_METADATA,
				TransactionType.NAMESPACE_METADATA
			]
		}
	},
	{
		label: 'Mosaic',
		icon: 'mdi-circle',
		value: {
			type: [
				TransactionType.MOSAIC_ALIAS,
				TransactionType.MOSAIC_DEFINITION,
				TransactionType.MOSAIC_SUPPLY_CHANGE,
				TransactionType.ACCOUNT_MOSAIC_RESTRICTION,
				TransactionType.MOSAIC_ADDRESS_RESTRICTION,
				TransactionType.MOSAIC_GLOBAL_RESTRICTION,
				TransactionType.MOSAIC_METADATA
			]
		}
	},
	{
		label: 'Namespace',
		icon: 'mdi-tag',
		value: {
			type: [
				TransactionType.NAMESPACE_REGISTRATION,
				TransactionType.NAMESPACE_METADATA
			]
		}
	},
	{
		label: 'Restriction',
		icon: 'mdi-alert',
		value: {
			type: [
				TransactionType.ACCOUNT_ADDRESS_RESTRICTION,
				TransactionType.ACCOUNT_MOSAIC_RESTRICTION,
				TransactionType.ACCOUNT_OPERATION_RESTRICTION,
				TransactionType.MOSAIC_ADDRESS_RESTRICTION,
				TransactionType.MOSAIC_GLOBAL_RESTRICTION
			]
		}
	},
	{
		label: 'Secret',
		icon: 'mdi-lock',
		value: {
			type: [
				TransactionType.SECRET_LOCK,
				TransactionType.SECRET_PROOF
			]
		}
	}
];

export const account = [
	{
		label: 'Recent',
		icon: 'mdi-clock-outline',
		value: {}
	},
	{
		label: 'Rich List',
		icon: 'mdi-circle',
		value: {
			orderBy: AccountOrderBy.Balance,
			mosaicId: new MosaicId('5E62990DCAC5BE8A')
		}
	}
];

export const namespace = [
	{
		label: 'Recent',
		icon: 'mdi-clock-outline',
		value: {}
	},
	{
		label: 'Address Alias',
		icon: 'mdi-account',
		value: {
			aliasType: AliasType.Address
		}
	},
	{
		label: 'Mosaic Alias',
		icon: 'mdi-circle',
		value: {
			aliasType: AliasType.Mosaic
		}
	},
	{
		label: 'Root',
		icon: 'mdi-tag',
		value: {
			registrationType: NamespaceRegistrationType.RootNamespace
		}
	},
	{
		label: 'Sub',
		icon: 'mdi-tag',
		value: {
			registrationType: NamespaceRegistrationType.SubNamespace
		}
	}
];

export const metadata = [
	{
		label: 'Recent',
		icon: 'mdi-clock-outline',
		value: {}
	},
	{
		label: 'Address Alias',
		icon: 'mdi-account',
		value: {
			metadataType: MetadataType.Account
		}
	},
	{
		label: 'Mosaic Alias',
		icon: 'mdi-circle',
		value: {
			metadataType: MetadataType.Mosaic
		}
	},
	{
		label: 'Namespace',
		icon: 'mdi-tag',
		value: {
			metadataType: MetadataType.Namespace
		}
	}
];
