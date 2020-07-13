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

import http from './http'
import { ReceiptType, ResolutionType, UInt64 } from 'symbol-sdk'
import Constants from '../config/constants'
import helper from '../helper'

class ReceiptService {
  /**
   * Gets an array receipts for a block heigh
   * @param height - Block height
   * @returns Statement
   */
  static getBlockReceipts = async (height) => {
    const blockReceipts = await http.createRepositoryFactory.createReceiptRepository()
      .getBlockReceipts(UInt64.fromUint(height))
      .toPromise()

    let transactionReceipt = blockReceipts.transactionStatements.reduce((receipt, item) => {
      receipt.push(...item.receipts)
      return receipt
    }, []) || []

    let resolutionStatements = [...blockReceipts.addressResolutionStatements, ...blockReceipts.mosaicResolutionStatements]

    return {
      transactionReceipt: this.formatTransactionStatement(transactionReceipt),
      resolutionStatements: resolutionStatements.map(statement => this.formatResolutionStatement(statement))
    }
  }

  /**
   * Get formatted Block Receipts dataset into Vue Component
   * @param height - Block height
   * @returns Formatted TransactionStatements and ResolutionStatements
   */
  static getBlockReceiptsInfo = async (height) => {
    let blockReceipts = await this.getBlockReceipts(height)
    return blockReceipts
  }

  /**
   * Format Receipt Statements
   * @param TransactionStatementDTO[]
   * @returns collection of receipts
   *
   */
  static formatTransactionStatement = transactionStatement => {
    let balanceChangeReceipt = []
    let balanceTransferReceipt = []
    let inflationReceipt = []
    let artifactExpiryReceipt = []

    transactionStatement.forEach(receipt => {
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
          type: Constants.ReceiptType[receipt.type],
          targetPublicAccount: receipt.targetPublicAccount.address.plain(),
          amount: helper.formatMosaicAmountWithDivisibility(receipt.amount, http.networkCurrecy.divisibility),
          mosaicId: receipt.mosaicId.toHex()
        })
        break
      case ReceiptType.Mosaic_Levy:
      case ReceiptType.Mosaic_Rental_Fee:
      case ReceiptType.Namespace_Rental_Fee:
        balanceTransferReceipt.push({
          ...receipt,
          size: receipt.size || Constants.Message.UNAVAILABLE,
          type: Constants.ReceiptType[receipt.type],
          sender: receipt.sender.address.plain(),
          recipientAddress: receipt.recipientAddress.address,
          amount: helper.formatMosaicAmountWithDivisibility(receipt.amount, http.networkCurrecy.divisibility),
          mosaicId: receipt.mosaicId.toHex()
        })
        break
      case ReceiptType.Mosaic_Expired:
      case ReceiptType.Namespace_Expired:
      case ReceiptType.Namespace_Deleted:
        artifactExpiryReceipt.push({
          ...receipt,
          size: receipt.size || Constants.Message.UNAVAILABLE,
          type: Constants.ReceiptType[receipt.type],
          artifactId: receipt.artifactId.toHex()
        })
        break
      case ReceiptType.Inflation:
        inflationReceipt.push({
          ...receipt,
          size: receipt.size || Constants.Message.UNAVAILABLE,
          type: Constants.ReceiptType[receipt.type],
          amount: helper.formatMosaicAmountWithDivisibility(receipt.amount, http.networkCurrecy.divisibility),
          mosaicId: receipt.mosaicId.toHex()
        })
        break
      }
    })

    return {
      balanceChangeReceipt,
      balanceTransferReceipt,
      inflationReceipt,
      artifactExpiryReceipt
    }
  }

  /**
   * Format Resolution Statements
   * @param ResolutionStatementDTO
   * @returns Address Resolution | Mosaic Resolution
   */
  static formatResolutionStatement = resolutionStatement => {
    if (resolutionStatement.resolutionType === ResolutionType.Address) {
      return {
        type: Constants.ResolutionType[resolutionStatement.resolutionType],
        unresolved: resolutionStatement.unresolved.toHex(),
        addressResolutionEntries: resolutionStatement.resolutionEntries[0].resolved.toHex()
      }
    } else if (resolutionStatement.resolutionType === ResolutionType.Mosaic) {
      return {
        type: Constants.ResolutionType[resolutionStatement.resolutionType],
        unresolved: resolutionStatement.unresolved.toHex(),
        mosaicResolutionEntries: resolutionStatement.resolutionEntries[0].resolved.toHex()
      }
    }
  }
}

export default ReceiptService
