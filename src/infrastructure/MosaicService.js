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
import helper from '../helper'
import { Address, MosaicId } from 'symbol-sdk'
import { DataService, NamespaceService } from '../infrastructure'
import { Constants } from '../config'

class MosaicService {
  /**
   * Gets MosaicInfo for different mosaicIds.
   * @param mosaicIds[] - Array of mosaic ids
   * @returns Formatted MosaicInfo[]
   */
   static getMosaics = async mosaicIds => {
     const mosaics = await http.createRepositoryFactory.createMosaicRepository()
       .getMosaics(mosaicIds).toPromise()
     const formattedMosaics = mosaics.map(mosaic => this.formatMosaicInfo(mosaic))

     return formattedMosaics
   }

   /**
   * Gets the MosaicInfo for a given mosaicId
   * @param mosaicId -  Mosaic id
   * @returns Formatted MosaicInfo
   */
   static getMosaic = async mosaicId => {
     const mosaic = await http.createRepositoryFactory.createMosaicRepository()
       .getMosaic(mosaicId).toPromise()

     const formattedMosaic = this.formatMosaicInfo(mosaic)

     return formattedMosaic
   }

   /**
    * Get balance mosaics in form of MosaicAmountViews for a given account address
    * @param address - Account address
    * @returns formatted MosaicAmountView[]
    */
   static getMosaicAmountView = async address => {
     const mosaicAmountViews = await http.mosaicService.mosaicsAmountViewFromAddress(Address.createFromRawAddress(address)).toPromise()
     return mosaicAmountViews.map(mosaicAmountView => this.formatMosaicAmountView(mosaicAmountView))
   }

   /**
    * Get formatted MosaicInfo dataset into Vue Component
    * @param hexOrNamespace - hex value or namespace name
    * @returns MosaicInfo info object
    */
   static getMosaicInfo = async (hexOrNamespace) => {
     const mosaicId = await helper.hexOrNamespaceToId(hexOrNamespace, 'mosaic')
     const mosaicInfo = await this.getMosaic(mosaicId)

     const mosaicNames = await NamespaceService.getMosaicsNames([mosaicId])

     return {
       ...mosaicInfo,
       mosaicAliasName: this.extractMosaicNamespace(mosaicInfo, mosaicNames)
     }
   }

   /**
    * Get custom MosaicInfo dataset into Vue Component
    * @param limit — No of namespaceInfo
    * @param fromMosaicId — (Optional) retrive next mosaicInfo in pagination
    * @returns Custom MosaicInfo[]
    */
   static getMosaicList = async (limit, fromMosaicId) => {
     const mosaicInfos = await DataService.getMosaicsByIdWithLimit(limit, fromMosaicId)

     const mosaicIdsList = mosaicInfos.map(mosaicInfo => mosaicInfo.id)
     const mosaicNames = await NamespaceService.getMosaicsNames(mosaicIdsList)

     const formattedMosaics = mosaicInfos.map(mosaic => this.formatMosaicInfo(mosaic))

     return formattedMosaics.map(formattedMosaic => ({
       ...formattedMosaic,
       owneraddress: formattedMosaic.address,
       mosaicAliasName: this.extractMosaicNamespace(formattedMosaic, mosaicNames)
     }))
   }

   /**
    * Get customize MosaicAmountView dataset for Vue component.
    * @param address - Account address
    * @returns customize MosaicAmountView[]
    */
   static getMosaicAmountViewList = async address => {
     const mosaicAmountViewInfos = await this.getMosaicAmountView(address)

     const mosaicIdsList = mosaicAmountViewInfos.map(mosaicAmountViewInfo => new MosaicId(mosaicAmountViewInfo.mosaicId))
     const mosaicNames = await NamespaceService.getMosaicsNames(mosaicIdsList)

     return mosaicAmountViewInfos.map(mosaicAmountViewInfo => ({
       ...mosaicAmountViewInfo,
       mosaicAliasName: this.extractMosaicNamespace(mosaicAmountViewInfo, mosaicNames)
     }))
   }

   /**
    * Format MosaicInfo to readable mosaicInfo object
    * @param MosaicInfoDTO
    * @returns Object readable MosaicInfoDTO object
    */
   static formatMosaicInfo = mosaicInfo => ({
     mosaicId: mosaicInfo.id.toHex(),
     divisibility: mosaicInfo.divisibility,
     address: mosaicInfo.owner.address.plain(),
     supply: mosaicInfo.supply.compact().toLocaleString('en-US'),
     relativeAmount: helper.formatMosaicAmountWithDivisibility(mosaicInfo.supply, mosaicInfo.divisibility),
     revision: mosaicInfo.revision,
     startHeight: mosaicInfo.height.compact(),
     duration: mosaicInfo.duration.compact() > 0 ? mosaicInfo.duration.compact() : Constants.Message.UNLIMITED,
     supplyMutable: mosaicInfo.flags.supplyMutable,
     transferable: mosaicInfo.flags.transferable,
     restrictable: mosaicInfo.flags.restrictable
   })

   /**
    * format MosaicAmountView to readable object
    * @param mosaicAmountView - mosaicAmountView DTO
    * @returns formatted mosaicAmountView
    */
   static formatMosaicAmountView = mosaicAmountView => ({
     ...this.formatMosaicInfo(mosaicAmountView.mosaicInfo),
     amount: helper.formatMosaicAmountWithDivisibility(mosaicAmountView.amount, mosaicAmountView.mosaicInfo.divisibility)
   })

   /**
    * Extract Name for Mosaic
    * @param mosaicInfo - mosaicInfo DTO
    * @param mosaicNames - MosaicNames[]
    * @returns mosaicName
    */
   static extractMosaicNamespace = (mosaicInfo, mosaicNames) => {
     let mosaicName = mosaicNames.find((name) => name.mosaicId === mosaicInfo.mosaicId)
     const name = mosaicName.names.length > 0 ? mosaicName.names[0].name : Constants.Message.UNAVAILABLE
     return name
   }
}

export default MosaicService
