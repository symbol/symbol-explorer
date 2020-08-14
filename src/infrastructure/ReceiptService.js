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

import http from './http';
import { ReceiptType, ResolutionType } from 'symbol-sdk';
import Constants from '../config/constants';
import helper from '../helper';
import { take, toArray } from 'rxjs/operators';

class ReceiptService {
	/**
	 * Gets a Receipts from searchCriteria
	 * @param transactionStatementSearchCriteria Object of Block Search Criteria
	 * @returns formatted Receipts data with pagination info
	 */
  static searchReceipts = async (transactionStatementSearchCriteria) => {
  	const searchReceipts = await http.createRepositoryFactory.createReceiptRepository()
  		.searchReceipts(transactionStatementSearchCriteria)
		  .toPromise();

  	return {
  		...searchReceipts,
  		data: this.formatTransactionStatement(searchReceipts.data)
  	};
  }

  	/**
	 * Gets a Address Resolution from searchCriteria
	 * @param resolutionStatementSearchCriteria Object of Block Search Criteria
	 * @returns formatted address resolution data with pagination info
	 */
  static searchAddressResolutionStatements = async (resolutionStatementSearchCriteria) => {
  	const searchAddressResolutionStatements = await http.createRepositoryFactory.createReceiptRepository()
  		.searchAddressResolutionStatements(resolutionStatementSearchCriteria)
  		.toPromise();

  	return {
  		...searchAddressResolutionStatements,
  		data: this.formatResolutionStatement(searchAddressResolutionStatements.data)
  	};
  }

    	/**
	 * Gets a Mosaic Resolution from searchCriteria
	 * @param resolutionStatementSearchCriteria Object of Block Search Criteria
	 * @returns formatted mosaic resolution data with pagination info
	 */
  static searchMosaicResolutionStatements = async (resolutionStatementSearchCriteria) => {
  	const searchMosaicResolutionStatements = await http.createRepositoryFactory.createReceiptRepository()
  		.searchMosaicResolutionStatements(resolutionStatementSearchCriteria)
  		.toPromise();

  	return {
  		...searchMosaicResolutionStatements,
  		data: this.formatResolutionStatement(searchMosaicResolutionStatements.data)
  	};
  }

  /**
   * Gets a receipts from streamer
   * @param searchCriteria - Object Search Criteria:
   * @returns formatted statementReceipt[]
   */
  static streamerReceipts = async (searchCriteria) => {
  	const streamerReceipts = await http.transactionStatementPaginationStreamer()
  		.search(searchCriteria)
  		.pipe(take(10), toArray())
  		.toPromise();

  	return this.formatTransactionStatement(streamerReceipts);
  }

  /**
   * Gets a Address Resolution statement from streamer
   * @param searchCriteria - Object Search Criteria:
   * @returns formatted statementAddressResolution[]
   */
	static streamerAddressResolution = async (searchCriteria) => {
		const streamerAddressResolution = await http.addressResolutionStatementPaginationStreamer()
			.search(searchCriteria)
			.pipe(take(10), toArray())
			.toPromise();

		return this.formatResolutionStatement(streamerAddressResolution);
	}

	 /**
   * Gets a Mosaic Resolution statement from streamer
   * @param searchCriteria - Object Search Criteria:
   * @returns formatted statementMosaicResolution[]
   */
	static streamerMosaicResolution = async (searchCriteria) => {
		const streamerMosaicResolution = await http.mosaicResolutionStatementPaginationStreamer()
			.search(searchCriteria)
			.pipe(take(10), toArray())
			.toPromise();

		return this.formatResolutionStatement(streamerMosaicResolution);
	}

  /**
   * Format Receipt Statements
   * @param TransactionStatementDTO[]
   * @returns collection of receipts
   *
   */
  static formatTransactionStatement = transactionStatement => {
  	let balanceChangeReceipt = [];

  	let balanceTransferReceipt = [];

  	let inflationReceipt = [];

	  let artifactExpiryReceipt = [];

  	transactionStatement.forEach(statement => {
  		statement.receipts.forEach(receipt => {
  			switch (receipt.type) {
  			case ReceiptType.Harvest_Fee:
  			case ReceiptType.LockHash_Created:
  			case ReceiptType.LockHash_Completed:
  			case ReceiptType.LockHash_Expired:
  			case ReceiptType.LockSecret_Created:
  			case ReceiptType.LockSecret_Completed:
  			case ReceiptType.LockSecret_Expired:
  				balanceChangeReceipt.push({
  					...receipt,
  					size: receipt.size || Constants.Message.UNAVAILABLE,
  					receiptType: Constants.ReceiptType[receipt.type],
  					targetAddress: receipt.targetAddress.plain(),
  					amount: helper.formatMosaicAmountWithDivisibility(receipt.amount, http.networkCurrecy.divisibility),
  					mosaicId: receipt.mosaicId.toHex()
  				});
  				break;
  			case ReceiptType.Mosaic_Levy:
  			case ReceiptType.Mosaic_Rental_Fee:
  			case ReceiptType.Namespace_Rental_Fee:
  				balanceTransferReceipt.push({
  					...receipt,
  					size: receipt.size || Constants.Message.UNAVAILABLE,
  					receiptType: Constants.ReceiptType[receipt.type],
  					senderAddress: receipt.senderAddress.address,
  					recipientAddress: receipt.recipientAddress.address,
  					amount: helper.formatMosaicAmountWithDivisibility(receipt.amount, http.networkCurrecy.divisibility),
  					mosaicId: receipt.mosaicId.toHex()
  				});
  				break;
  			case ReceiptType.Mosaic_Expired:
  			case ReceiptType.Namespace_Expired:
  			case ReceiptType.Namespace_Deleted:
  				artifactExpiryReceipt.push({
  					...receipt,
  					size: receipt.size || Constants.Message.UNAVAILABLE,
  					receiptType: Constants.ReceiptType[receipt.type],
  					artifactId: receipt.artifactId.toHex()
  				});
  				break;
  			case ReceiptType.Inflation:
  				inflationReceipt.push({
  					...receipt,
  					size: receipt.size || Constants.Message.UNAVAILABLE,
  					receiptType: Constants.ReceiptType[receipt.type],
  					amount: helper.formatMosaicAmountWithDivisibility(receipt.amount, http.networkCurrecy.divisibility),
  					mosaicId: receipt.mosaicId.toHex()
  				});
  				break;
  			}
  		});
  	});

  	return {
  		balanceChangeReceipt,
  		balanceTransferReceipt,
  		inflationReceipt,
  		artifactExpiryReceipt
  	};
  }

  /**
   * Format Resolution Statements
   * @param ResolutionStatementDTO
   * @returns Address Resolution | Mosaic Resolution
   */
  static formatResolutionStatement = resolutionStatement => {
	  return resolutionStatement.map(statement => {
  		if (statement.resolutionType === ResolutionType.Address) {
  			return {
  				...statement,
  				height: statement.height.compact(),
  				resolutionType: Constants.ResolutionType[statement.resolutionType],
  				unresolved: statement.unresolved.toHex(),
  				addressResolutionEntries: statement.resolutionEntries.map(resolutionEntry => resolutionEntry.resolved.address)
  			};
  		}

  		if (statement.resolutionType === ResolutionType.Mosaic) {
  			return {
  				...statement,
  				resolutionType: Constants.ResolutionType[statement.resolutionType],
  				unresolved: statement.unresolved.toHex(),
  				mosaicResolutionEntries: statement.resolutionEntries.map(resolutionEntry => resolutionEntry.resolved.toHex())
  			};
  		}
	  });
  }
}

export default ReceiptService;
