import http from './http';
import {
	Address,
	AddressRestrictionFlag,
	MosaicRestrictionFlag,
	OperationRestrictionFlag
} from 'symbol-sdk';
import helper from '../helper';
import Constants from '../config/constants';

class RestrictionService {
  /**
   * Get Account Restriction from symbol SDK
   * @param address - Account address to be created from PublicKey or RawAddress
   * @returns AccountRestrictions[]
   */
  static getAccountRestrictions = async address => {
  	let accountRestrictions;

  	try {
  		accountRestrictions = await http.createRepositoryFactory.createRestrictionAccountRepository()
  			.getAccountRestrictions(Address.createFromRawAddress(address))
  			.toPromise();
  	}
  	catch (e) {
  		// To Catach statusCode 404 if Account restrictions are not available.
  		throw Error('Account restrictions are not available.');
  	}

  	const formattedAccountRestrictions = accountRestrictions.map(accountRestriction => this.formatAccountRestriction(accountRestriction));

  	return formattedAccountRestrictions;
  }

  /**
   * Get Mosaic Global Restriction from symbol SDK
   * @param mosaicId - - Mosaic identifier
   * @returns MosaicGlobalRestriction
   */
  static getMosaicGlobalRestriction = async mosaicId => {
  	let mosaicGlobalRestrictions;

  	try {
  		mosaicGlobalRestrictions = await http.createRepositoryFactory.createRestrictionMosaicRepository()
  			.getMosaicGlobalRestriction(mosaicId)
  			.toPromise();
  	}
  	catch (e) {
  		// To Catach statusCode 404 if Mosaic global restrictions are not available.
  		throw Error('Mosaic global restrictions are not available.');
  	}

  	return this.formatMosaicGlobalRestrictions(mosaicGlobalRestrictions);
  }

  /**
   * Format AccountRestriction to readable object
   * @param AccountRestrictionDTO
   * @returns Object readable AccountRestriction object
   */
  static formatAccountRestriction = accountRestriction => {
  	switch (accountRestriction.restrictionFlags) {
  	case AddressRestrictionFlag.AllowIncomingAddress:
  	case AddressRestrictionFlag.BlockIncomingAddress:
  	case AddressRestrictionFlag.AllowOutgoingAddress:
  	case AddressRestrictionFlag.BlockOutgoingAddress:
  		return {
  			restrictionType: Constants.AddressRestrictionFlag[accountRestriction.restrictionFlags],
  			restrictionAddressValues: accountRestriction.values.map(value => value.address)
  		};
  	case MosaicRestrictionFlag.AllowMosaic:
  	case MosaicRestrictionFlag.BlockMosaic:
  		return {
  			restrictionType: Constants.MosaicRestrictionFlag[accountRestriction.restrictionFlags],
  			restrictionMosaicValues: MosaicRestrictionFlag.values.map(value => value.id.toHex())
  		};
  	case OperationRestrictionFlag.AllowOutgoingTransactionType:
  	case OperationRestrictionFlag.BlockOutgoingTransactionType:
  		return {
  			restrictionType: Constants.OperationRestrictionFlag[accountRestriction.restrictionFlags],
  			restrictionTransactionValues: accountRestriction.values.map(value => Constants.TransactionType[value])
  		};
  	}
  }

  /**
   * Format MosaicGlobalRestrictions to readable object
   * @param MosaicGlobalRestrictionDTO
   * @returns Object readable MosaicGlobalRestrictions object
   */
  static formatMosaicGlobalRestrictions = mosaicRestriction => {
  	let mosaicGlobalRestrictionItem = [];

  	// Convert Map<k,v> to Array
  	mosaicRestriction.restrictions.forEach((value, key) => {
  		mosaicGlobalRestrictionItem.push({ key, ...value });
  		return mosaicGlobalRestrictionItem;
  	});

  	return {
  		...mosaicRestriction,
  		entryType: Constants.MosaicRestrictionEntryType[mosaicRestriction.entryType],
  		mosaicId: mosaicRestriction.mosaicId.toHex(),
  		restrictions: mosaicGlobalRestrictionItem.map(item => ({
  			restrictionKey: item.key,
  			restrictionType: Constants.MosaicRestrictionType[item.restrictionType],
  			restrictionValue: item.restrictionValue,
  			referenceMosaicId: item.referenceMosaicId.toHex() === '0000000000000000' ? mosaicRestriction.mosaicId.toHex() : item.referenceMosaicId.toHex()
  		}))
  	};
  }

  /**
   * Format Account Restriction list dataset into Vue component
   * @param address - Address in string format.
   * @returns Account Restriction list
   */
  static getAccountRestrictionList = async (address) => {
  	const accountRestrictions = await this.getAccountRestrictions(address);

  	return accountRestrictions;
  }

  /**
   * Format Mosaic Global Restriction info dataset into Vue component
   * @param hexOrNamespace - hex value or namespace name
   * @returns Mosaic Global Restriction info
   */
  static getMosaicGlobalRestrictionInfo = async (hexOrNamespace) => {
  	const mosaicId = await helper.hexOrNamespaceToId(hexOrNamespace, 'mosaic');
  	const mosaicGlobalRestrictionMetadata = await this.getMosaicGlobalRestriction(mosaicId);

  	return mosaicGlobalRestrictionMetadata;
  }
}

export default RestrictionService;
