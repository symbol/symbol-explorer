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

import { UInt64, TransactionGroup, Order, BlockOrderBy } from 'symbol-sdk';
import { TransactionService, ReceiptService } from '../infrastructure';
import http from './http';
import helper from '../helper';
import { Constants } from '../config';
import { take, toArray } from 'rxjs/operators';
import { MerkleTree } from 'merkletreejs';
import { sha3_256 as sha3256 } from 'js-sha3';

class BlockService {
  /**
   * Gets a BlockInfo for a given block height
   * @param height - Block height
   * @returns Formatted BlockDTO
   */
  static getBlockByHeight = async (height) => {
  	const blockInfo = await http.createRepositoryFactory.createBlockRepository()
		  .getBlockByHeight(UInt64.fromUint(height))
		  .toPromise();

  	return this.formatBlock(blockInfo);
  }

  /**
   * Gets a blocks from searchCriteria
   * @param blockSearchCriteria Object of Block Search Criteria
   * @returns formatted block data with pagination info
   */
  static searchBlocks = async (blockSearchCriteria) => {
  	const searchblocks = await http.createRepositoryFactory.createBlockRepository()
  		.search(blockSearchCriteria)
  		.toPromise();

  	return {
  		...searchblocks,
  		data: searchblocks.data.map(block => this.formatBlock(block))
  	};
  }

  /**
   * Gets a blocks from streamer
   * @param searchCriteria - Object  Search Criteria
   * @param noOfBlock - Number of blocks returned.
   * @returns formatted BlockInfo[]
   */
  static streamerBlocks = async (searchCriteria, noOfBlock) => {
  	const streamerBlocks = await http.blockPaginationStreamer
  		.search(searchCriteria).pipe(take(noOfBlock), toArray())
  		.toPromise();

  	return streamerBlocks.map(block => this.formatBlock(block));
  }

  /**
   * Gets a merkle path for merkle proof.
   * @param height - Block height
   * @param hash Transaction hash
   * @returns MerkleProofInfo[]
   */
  static getMerkleTransaction = async (height, hash) => {
  	const merklePath = await http.createRepositoryFactory.createBlockRepository()
  		.getMerkleTransaction(UInt64.fromUint(height), hash)
  		.toPromise();

  	return merklePath.merklePath || [];
  }

  /**
   * Gets transactions a merkle tree.
   * @param height - Block height
   * @returns merkleTree object
   */
  static getMerkleTransactionTree = async (height) => {
  	const searchCriteria = {
  		group: TransactionGroup.Confirmed,
  		height: UInt64.fromUint(height),
  		pageSize: 100,
  		order: Order.Desc
  	};

  	const transactions = await TransactionService.streamerTransactions(searchCriteria);
  	const leaves = transactions.sort((n1, n2) => n1.transactionInfo.index - n2.transactionInfo.index)
  		.map(transaction => transaction.transactionInfo.hash);

  	const tree = new MerkleTree(leaves, sha3256, {
  		duplicateOdd: true,
  		hashLeaves: false,
  		sort: false,
  		sortLeaves: false,
  		sortPairs: false,
  		isBitcoinTree: false });

  	return tree.getLayersAsObject();
  }

  /**
   * Get formatted BlockInfo[] dataset into Vue Component
   * @param pageInfo - pageNumber and pageSize
   * @returns Block info list
   */
  static getBlockList = async (pageInfo) => {
  	const { pageNumber, pageSize } = pageInfo;
  	const blockSearchCriteria = {
  		pageNumber,
  		pageSize,
  		order: Order.Desc,
  		orderBy: BlockOrderBy.Height
  	};

  	const blocks = await this.searchBlocks(blockSearchCriteria);

  	return {
  		...blocks,
  		data: blocks.data.map(block => ({
  			...block,
  			date: helper.convertToUTCDate(block.timestamp),
  			age: helper.convertToUTCDate(block.timestamp),
  			harvester: block.signer
  		}))
  	};
  }

  /**
   * Get Custom Transactions dataset into Vue Component
   * @param pageInfo - object for page info such as pageNumber, pageSize
   * @param filterVaule - object for search criteria
   * @param height -  block height
   * @returns Custom Transactions dataset
   */
  static getBlockTransactionList = async (pageInfo, filterVaule, height) => {
  	const { pageNumber, pageSize } = pageInfo;
  	const searchCriteria = {
  		pageNumber,
  		pageSize,
  		order: Order.Desc,
  		type: [],
  		group: TransactionGroup.Confirmed,
  		height: UInt64.fromUint(height),
  		...filterVaule
  	};

  	const blockTransactions = await TransactionService.searchTransactions(searchCriteria);

  	return {
  		...blockTransactions,
  		data: blockTransactions.data.map(blockTransaction => ({
  			...blockTransaction,
  			transactionHash: blockTransaction.hash,
  			transactionType: blockTransaction.transactionBody.transactionType
  		}))
  	};
  }

  /**
   * Gets formatted Receipt and Resolution statements
   * @param height - Block height.
   * @returns Receipt and Resolution info object
   */
  static getBlockReceiptsInfo = async (height) => {
  	const searchCriteria = {
  		order: Order.Desc,
  		height: UInt64.fromUint(height)
	  };

	const [blockReceipts, address, mosaic] = await Promise.all([ReceiptService.streamerReceipts(searchCriteria), ReceiptService.streamerAddressResolution(searchCriteria), ReceiptService.streamerMosaicResolution(searchCriteria)]);

  	return {
  		transactionReceipt: blockReceipts,
  		resolutionStatements: [...address, ...mosaic]
  	};
  }

  /**
   * Get formatted BlockInfo dataset into Vue Component
   * @param height - Block height.
   * @returns Block info object
   */
  static getBlockInfo = async height => {
  	const block = await this.getBlockByHeight(height);

  	// Get merkle info
  	let { stateHash, stateHashSubCacheMerkleRoots, blockReceiptsHash, blockTransactionsHash } = block;

  	// Append merkle root name into hash
  	stateHashSubCacheMerkleRoots = stateHashSubCacheMerkleRoots.map((root, index) => {
  		return `${Constants.MerkleRootsOrder[index]} - ${root}`;
	  });

  	return {
  		...block,
  		blockHash: block.hash,
  		harvester: block.signer,
  		date: helper.convertToUTCDate(block.timestamp),
  		merkleInfo: {
  			stateHash,
  			stateHashSubCacheMerkleRoots,
  			blockReceiptsHash,
  			blockTransactionsHash
  		}
  	};
  }

  /**
   * Format Block to readable Block object
   * @param BlockDTO
   * @returns Object readable BlockDTO object
   */
  static formatBlock = block => ({
  	...block,
  	height: block.height.compact(),
  	timestampRaw: block.timestamp,
  	timestamp: helper.networkTimestamp(block.timestamp),
  	totalFee: helper.toNetworkCurrency(block.totalFee),
  	difficulty: helper.convertBlockDifficultyToReadable(block.difficulty),
  	feeMultiplier: block.feeMultiplier.toString(),
  	transactions: block.numTransactions,
  	signer: helper.publicKeyToAddress(block.signer.publicKey),
  	beneficiaryAddress: block?.beneficiaryAddress.plain() || Constants.Message.UNAVAILABLE
  })
}

export default BlockService;
