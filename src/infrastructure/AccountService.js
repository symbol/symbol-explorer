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

import { Address, TransactionType, TransactionGroup, Order, BlockOrderBy } from 'symbol-sdk';
import http from './http';
import { Constants } from '../config';
import { NamespaceService, TransactionService, BlockService, ChainService, MetadataService } from '../infrastructure';
import helper from '../helper';

class AccountService {
  /**
   * Gets an AccountInfo for an account.
   * @param address
   * @returns Formatted AccountInfo
   */
  static getAccount = async address => {
  	const account = await http.createRepositoryFactory.createAccountRepository()
  		.getAccountInfo(Address.createFromRawAddress(address))
  		.toPromise();

  	const formattedAccount = this.formatAccountInfo(account);

  	return formattedAccount;
  }

  /**
   * Gets an AccountInfo for an account.
   * @param address
   * @returns Formatted AccountInfo
   */
  static getAccounts = async addresses => {
  	const accounts = await http.createRepositoryFactory.createAccountRepository()
  		.getAccountsInfo(addresses.map(a => Address.createFromRawAddress(a)))
  		.toPromise();

  	return accounts.map(a => this.formatAccountInfo(a));
  }

  /**
   * Gets a accounts list from searchCriteria
   * @param accountSearchCriteria Object of Search Criteria
   * @returns formatted account data with pagination info
   */
  static searchAccounts = async (accountSearchCriteria) => {
  	const searchAccounts = await http.createRepositoryFactory.createAccountRepository()
  		.search(accountSearchCriteria)
  		.toPromise();

  	return {
  		...searchAccounts,
  		data: searchAccounts.data.map(account => this.formatAccountInfo(account))
  	};
  }

  /**
   * Get custom Account list dataset into Vue Component
   * @param pageInfo - pagination info
   * @param filterVaule - object for search criteria
   * @returns Custom AccountInfo[]
   */
  static getAccountList = async (pageInfo, filterVaule) => {
  	const { pageNumber, pageSize } = pageInfo;
  	const searchCriteria = {
  		pageNumber,
  		pageSize,
  		order: Order.Desc,
  		...filterVaule
  	};

  	const accountInfos = await this.searchAccounts(searchCriteria);

  	const addresses = accountInfos.data.map(accountInfo => Address.createFromRawAddress(accountInfo.address));

  	const accountNames = await NamespaceService.getAccountsNames(addresses);

  	return {
  		...accountInfos,
  		data: accountInfos.data.map(account => ({
  			...account,
  			balance: helper.getNetworkCurrencyBalance(account.mosaics),
  			lastActivity: helper.getLastActivityHeight(account.activityBucket),
  			accountAliasName: this.extractAccountNamespace(account, accountNames)
  		}))
  	};
  }

  /**
   * Get custom Account info dataset into Vue Component
   * @param address - Account address
   * @returns Custom AccountInfo
   */
  static getAccountInfo = async address => {
  	const accountInfo = await this.getAccount(address);
  	const accountNames = await NamespaceService.getAccountsNames([Address.createFromRawAddress(address)]);
	  const harvestedBlockList = await BlockService.searchBlocks({ signerPublicKey: accountInfo.publicKey });

  	return {
  		...accountInfo,
  		activityBucket: accountInfo.activityBucket.map(activity => ({
  			...activity,
  			recalculationBlock: activity.startHeight,
  			totalFeesPaid: helper.toNetworkCurrency(activity.totalFeesPaid),
  			importanceScore: activity.rawScore
  		})),
  		supplementalPublicKeys: {
  			...accountInfo.supplementalPublicKeys,
  			voting: Array.isArray(accountInfo.supplementalPublicKeys.voting) ? accountInfo.supplementalPublicKeys.voting.map(voting => voting.publicKey) : accountInfo.supplementalPublicKeys.voting
  		},
  		accountAliasName: this.extractAccountNamespace(accountInfo, accountNames),
  		harvestedBlock: harvestedBlockList?.totalEntries || 0
  	};
  }

  /**
   * Gets custom array of confirmed transactions dataset into Vue Component
   * @param pageInfo - object for page info such as pageNumber, pageSize
   * @param filterVaule - object for search criteria
   * @param address - Account address
   * @returns Custom AggregateTransaction[]
   */
  static getAccountTransactionList = async (pageInfo, filterVaule, address) => {
  	const { pageNumber, pageSize } = pageInfo;
  	const searchCriteria = {
  		pageNumber,
  		pageSize,
  		order: Order.Desc,
  		type: [],
  		group: TransactionGroup.Confirmed,
  		address: Address.createFromRawAddress(address),
  		...filterVaule
  	};

  	const accountTransactions = await TransactionService.searchTransactions(searchCriteria);

  	return {
  		...accountTransactions,
  		data: accountTransactions.data.map(accountTransaction => ({
  			...accountTransaction,
  			transactionHash: accountTransaction.hash,
  			transactionType:
          accountTransaction.transactionBody.transactionType === TransactionType.TRANSFER
          	? (accountTransaction.signer === address
          		? 'outgoing_' + accountTransaction.transactionBody.transactionType
          		: 'incoming_' + accountTransaction.transactionBody.transactionType
          	)
          	: accountTransaction.transactionBody.transactionType
  		}))
  	};
  }

  /**
   * Gets custom array of confirmed transactions dataset into Vue Component
   * @param pageInfo - object for page info such as pageNumber, pageSize
   * @param filterVaule - object for search criteria
   * @param address - Account address
   * @returns Custom AggregateTransaction[]
   */
  static getAccountNamespaceList = async (pageInfo, filterVaule, address) => {
  	const { pageNumber, pageSize } = pageInfo;
  	const searchCriteria = {
  		pageNumber,
  		pageSize,
  		order: Order.Desc,
  		ownerAddress: Address.createFromRawAddress(address),
  		...filterVaule
	  };

	  const accountNamespaces = await NamespaceService.searchNamespaces(searchCriteria);

  	const currentHeight = await ChainService.getBlockchainHeight();

  	return {
  		...accountNamespaces,
  		data: accountNamespaces.data.map(namespaces => {
  			const { expiredInSecond } = helper.calculateNamespaceExpiration(currentHeight, namespaces.endHeight);

  			return {
  				...namespaces,
  				status: namespaces.active,
  				duration: helper.convertTimeFromNowInSec(expiredInSecond) || Constants.Message.UNLIMITED
  			};
  		})
  	};
  }

  /**
   * Gets custom array of block list dataset into Vue Component
   * @param pageInfo - object for page info such as pageNumber, pageSize
   * @param address - Account address
   */
  static getAccountHarvestedBlockList = async (pageInfo, address) => {
  	const accountInfo = await this.getAccount(address);
  	const { pageNumber, pageSize } = pageInfo;
  	const searchCriteria = {
  		pageNumber,
  		pageSize,
  		order: Order.Desc,
  		orderBy: BlockOrderBy.Height,
  		signerPublicKey: accountInfo.publicKey
  	};

  	const accountHarvestedBlockList = await BlockService.searchBlocks(searchCriteria);

  	return {
  		...accountHarvestedBlockList,
  		data: accountHarvestedBlockList.data.map(block => ({
  			...block,
  			date: helper.convertToUTCDate(block.timestamp),
  			age: helper.convertToUTCDate(block.timestamp),
  			harvester: block.signer
  		}))
  	};
  }

  /**
   * Gets Account Metadata list dataset into Vue component
   * @param pageInfo - object for page info such as pageNumber, pageSize
   * @param filterVaule - object for search criteria
   * @param address - Account address
   * @returns formatted account metadata list
   */
  static getAccountMetadataList = async (pageInfo, filterVaule, address) => {
  	const { pageNumber, pageSize } = pageInfo;
  	const searchCriteria = {
  		pageNumber,
  		pageSize,
  		order: Order.Desc,
  		sourceAddress: Address.createFromRawAddress(address),
  		...filterVaule
  	};
  	const accountMetadatas = await MetadataService.searchMetadatas(searchCriteria);

  	return accountMetadatas;
  }

  /**
   * Format AccountInfo to readable accountInfo objecy
   * @param accountInfo - AccountInfo DTO
   * @returns Readable AccountInfo DTO object
   */
  static formatAccountInfo = (accountInfo) => ({
  	...accountInfo,
  	address: accountInfo.address.address,
  	addressHeight: accountInfo.addressHeight.compact(),
  	publicKeyHeight: accountInfo.publicKeyHeight.compact(),
  	accountType: Constants.AccountType[accountInfo.accountType],
  	supplementalPublicKeys: this.formatSupplementalPublicKeys(accountInfo.supplementalPublicKeys),
  	importance: helper.ImportanceScoreToPercent(accountInfo.importance.compact()),
  	importanceHeight: accountInfo.importanceHeight.compact()
  })

  /**
   * Format SupplementalPublicKeys to readable SupplementalPublicKeys objecy
   * @param supplementalPublicKeys - supplementalPublicKeys DTO
   * @returns Readable supplementalPublicKeys DTO object
   */
  static formatSupplementalPublicKeys = (supplementalPublicKeys) => ({
  	...supplementalPublicKeys,
  	linked: supplementalPublicKeys.linked?.publicKey || Constants.Message.UNAVAILABLE,
  	node: supplementalPublicKeys.node?.publicKey || Constants.Message.UNAVAILABLE,
  	vrf: supplementalPublicKeys.vrf?.publicKey || Constants.Message.UNAVAILABLE,
  	voting: supplementalPublicKeys.voting?.map(vote => ({
  		...vote,
  		publicKey: vote.publicKey,
  		startPoint: vote.startPoint.compact(),
  		endPoint: vote.endPoint.compact()
  	})) || []
  })

  /**
   * Extract Name for Account
   * @param accountInfo - accountInfo DTO
   * @param accountNames - accountNames[]
   * @returns accountName
   */
  static extractAccountNamespace = (accountInfo, accountNames) => {
  	let accountName = accountNames.find((name) => name.address === accountInfo.address);
  	const name = accountName.names.length > 0 ? accountName.names[0].name : Constants.Message.UNAVAILABLE;

  	return name;
  }
}

export default AccountService;
