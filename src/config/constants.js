import {
  TransactionType,
  MosaicSupplyChangeAction,
  NamespaceRegistrationType,
  AliasAction,
  LinkAction,
  AccountType,
  AccountKeyType,
  LockHashAlgorithm,
  NetworkType,
  MetadataType,
  ReceiptType,
  ResolutionType,
  RoleType,
  AddressRestrictionFlag,
  MosaicRestrictionFlag,
  OperationRestrictionFlag,
  MosaicRestrictionEntryType,
  MosaicRestrictionType
} from 'symbol-sdk'

class Constants {
  static PageSize = 25

  static Message = {
    UNLIMITED: 'UNLIMITED',
    UNAVAILABLE: 'N/A',
    INFINITY: 'INFINITY',
    MOSAIC: 'MOSAIC',
    ADDRESS: 'ADDRESS',
    NO_ALIAS: 'NO ALIAS',
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE'
  }

  static TransactionType = {
    [TransactionType.TRANSFER]: 'Transfer',
    [TransactionType.NAMESPACE_REGISTRATION]: 'Namespace Registration',
    [TransactionType.ADDRESS_ALIAS]: 'Address Alias',
    [TransactionType.MOSAIC_ALIAS]: 'Mosaic Alias',
    [TransactionType.MOSAIC_DEFINITION]: 'Mosaic Definition',
    [TransactionType.MOSAIC_SUPPLY_CHANGE]: 'Mosaic Supply Change',
    [TransactionType.MULTISIG_ACCOUNT_MODIFICATION]: 'Multisig Account Modification',
    [TransactionType.AGGREGATE_COMPLETE]: 'Aggregate Complete',
    [TransactionType.AGGREGATE_BONDED]: 'Aggregate Bonded',
    [TransactionType.HASH_LOCK]: 'Hash Lock',
    [TransactionType.SECRET_LOCK]: 'Secret Lock',
    [TransactionType.SECRET_PROOF]: 'Secret Proof',
    [TransactionType.ACCOUNT_ADDRESS_RESTRICTION]: 'Account Address Restriction',
    [TransactionType.ACCOUNT_MOSAIC_RESTRICTION]: 'Account Mosaic Restriction',
    [TransactionType.ACCOUNT_OPERATION_RESTRICTION]: 'Account Operation Restriction',
    [TransactionType.ACCOUNT_KEY_LINK]: 'Account Key Link',
    [TransactionType.MOSAIC_ADDRESS_RESTRICTION]: 'Mosaic Address Restriction',
    [TransactionType.MOSAIC_GLOBAL_RESTRICTION]: 'Mosaic Global Restriction',
    [TransactionType.ACCOUNT_METADATA]: 'Account Metadata',
    [TransactionType.MOSAIC_METADATA]: 'Mosaic Metadata',
    [TransactionType.NAMESPACE_METADATA]: 'Namespace Metadata',
    [TransactionType.VRF_KEY_LINK]: 'VRF Key Link',
    [TransactionType.VOTING_KEY_LINK]: 'Voting Key Link',
    [TransactionType.NODE_KEY_LINK]: 'Node Key Link'
  }

  static MosaicSupplyChangeAction = {
    [MosaicSupplyChangeAction.Increase]: 'Increase',
    [MosaicSupplyChangeAction.Decrease]: 'Decrease'
  }

  static NamespaceRegistrationType = {
    [NamespaceRegistrationType.RootNamespace]: 'rootNamespace',
    [NamespaceRegistrationType.SubNamespace]: 'Sub Namespace'
  }

  static AliasAction = {
    [AliasAction.Link]: 'Link',
    [AliasAction.Unlink]: 'Unlink'
  }

  static LinkAction = {
    [LinkAction.Link]: 'Link',
    [LinkAction.Unlink]: 'Unlink'
  }

  static AccountType = {
    [AccountType.Unlinked]: 'Unlinked',
    [AccountType.Main]: 'Main',
    [AccountType.Remote]: 'Remote',
    [AccountType.Remote_Unlinked]: 'Remote Unlinked'
  }

  static AccountKeyType = {
    [AccountKeyType.Unset]: 'Unset',
    [AccountKeyType.Linked]: 'Linked',
    [AccountKeyType.VRF]: 'VRF',
    [AccountKeyType.Voting]: 'Voting',
    [AccountKeyType.Node]: 'Node',
    [AccountKeyType.All]: 'All'
  }

  static LockHashAlgorithm = {
    [LockHashAlgorithm.Op_Sha3_256]: 'Op_Sha3_256',
    [LockHashAlgorithm.Op_Hash_160]: 'Op_Hash_160',
    [LockHashAlgorithm.Op_Hash_256]: 'Op_Hash_256'
  }

  static MetadataType = {
    [MetadataType.Account]: 'Account',
    [MetadataType.Mosaic]: 'Mosaic',
    [MetadataType.Namespace]: 'Namespace'
  }

  static ReceiptType = {
    [ReceiptType.Harvest_Fee]: 'Harvest Fee',
    [ReceiptType.LockHash_Created]: 'LockHash Created',
    [ReceiptType.LockHash_Completed]: 'LockHash Completed',
    [ReceiptType.LockHash_Expired]: 'LockHash Expired',
    [ReceiptType.LockSecret_Created]: 'LockSecret Created',
    [ReceiptType.LockSecret_Completed]: 'LockSecret Completed',
    [ReceiptType.LockSecret_Expired]: 'LockSecret Expired',
    [ReceiptType.Mosaic_Levy]: 'Mosaic Levy',
    [ReceiptType.Mosaic_Rental_Fee]: 'Mosaic Rental Fee',
    [ReceiptType.Namespace_Rental_Fee]: 'Namespace Rental Fee',
    [ReceiptType.Mosaic_Expired]: 'Mosaic Expired',
    [ReceiptType.Namespace_Expired]: 'Namespace Expired',
    [ReceiptType.Namespace_Deleted]: 'Namespace Deleted',
    [ReceiptType.Inflation]: 'Inflation'
  }

  static ResolutionType = {
    [ResolutionType.Address]: 'Address',
    [ResolutionType.Mosaic]: 'Mosaic'
  }

  static NetworkType = {
    [NetworkType.MAIN_NET]: 'MAINNET',
    [NetworkType.MIJIN]: 'MIJIN',
    [NetworkType.MIJIN_TEST]: 'MIJIN TESTNET',
    [NetworkType.TEST_NET]: 'TESTNET'
  }

  static RoleType = {
    [RoleType.ApiNode]: 'API NODE',
    [RoleType.PeerNode]: 'PEER NODE',
    [RoleType.DualNode]: 'DUAL NODE'
  }

  static AddressRestrictionFlag = {
    [AddressRestrictionFlag.AllowIncomingAddress]: 'Allow Incoming Address',
    [AddressRestrictionFlag.AllowOutgoingAddress]: 'Allow Outgoing Address',
    [AddressRestrictionFlag.BlockIncomingAddress]: 'Block Incoming Address',
    [AddressRestrictionFlag.BlockOutgoingAddress]: 'Block Outgoing Address'
  }

  static MosaicRestrictionFlag = {
    [MosaicRestrictionFlag.AllowMosaic]: 'Allow Mosaic',
    [MosaicRestrictionFlag.BlockMosaic]: 'Block Mosaic'
  }

  static OperationRestrictionFlag = {
    [OperationRestrictionFlag.AllowOutgoingTransactionType]: 'Allow Outgoing Transaction',
    [OperationRestrictionFlag.BlockOutgoingTransactionType]: 'Block Outgoing Transaction'
  }

  static MosaicRestrictionEntryType = {
    [MosaicRestrictionEntryType.ADDRESS]: 'Mosaic address restriction',
    [MosaicRestrictionEntryType.GLOBAL]: 'Mosaic global restriction'
  }

  static MosaicRestrictionType = {
    [MosaicRestrictionType.EQ]: 'Allow Equal',
    [MosaicRestrictionType.GE]: 'Allow Greater Than Or Equal',
    [MosaicRestrictionType.GT]: 'Allow Greater Than',
    [MosaicRestrictionType.LE]: 'Allow Less Than Or Equal',
    [MosaicRestrictionType.LT]: 'Allow Less Than',
    [MosaicRestrictionType.NE]: 'Allow Not Equal',
    [MosaicRestrictionType.NONE]: 'No Restriction'
  }
}

export default Constants
