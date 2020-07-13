/*
 *
 * Copyright (c) 2019-present for symbol
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

import * as symbol from 'symbol-sdk'
import { MosaicService } from '../infrastructure'

let NODE_URL
let MARKET_DATA_URL
let NETWORK_TYPE
let GENERATION_HASH
let NETWORK_PROPERTIES
let NETWORK_CURRECY

export default class http {
  static init = async (nodeUrl, marketDataUrl) => {
    NODE_URL = nodeUrl
    MARKET_DATA_URL = marketDataUrl
    NETWORK_TYPE = await http.createRepositoryFactory.getNetworkType().toPromise()
    GENERATION_HASH = await http.createRepositoryFactory.getGenerationHash().toPromise()
    NETWORK_PROPERTIES = await http.createRepositoryFactory.createNetworkRepository().getNetworkProperties().toPromise()

    const mosaicId = NETWORK_PROPERTIES.chain.currencyMosaicId.replace(/0x|'/g, '')
    NETWORK_CURRECY = await MosaicService.getMosaicInfo(mosaicId)
  }

  static get networkCurrecy() {
    const splitNamespace = NETWORK_CURRECY.mosaicAliasName.toUpperCase().split('.')
    return {
      namespace: [...splitNamespace, NETWORK_CURRECY.mosaicAliasName.toUpperCase()],
      mosaicId: NETWORK_CURRECY.mosaicId,
      divisibility: NETWORK_CURRECY.divisibility
    }
  }

  static get networkProperties() {
    return new symbol.NetworkConfiguration(NETWORK_PROPERTIES.network, NETWORK_PROPERTIES.chain, NETWORK_PROPERTIES.plugins)
  }

  static get networkConfig() {
    const convertedTotalChainImportance = +this.networkProperties.chain.totalChainImportance.replace(/'/g, '')
    const convertedNamespaceGracePeriodDuration = +this.networkProperties.plugins.namespace.namespaceGracePeriodDuration.replace(/d/g, '')
    const convertedBlockGenerationTargetTime = +this.networkProperties.chain.blockGenerationTargetTime.replace(/s/g, '')
    const blockPerday = (60 / convertedBlockGenerationTargetTime) * 60 * 24

    return {
      MosaicRentalSinkPublicKey: this.networkProperties.plugins.mosaic.mosaicRentalFeeSinkPublicKey,
      NamespaceRentalSinkPublicKey: this.networkProperties.plugins.namespace.namespaceRentalFeeSinkPublicKey,
      NetworkType: this.networkType,
      NemsisTimestamp: symbol.Deadline.timestampNemesisBlock,
      TargetBlockTime: convertedBlockGenerationTargetTime,
      NamespaceGraceDuration: convertedNamespaceGracePeriodDuration * blockPerday,
      TotalChainImportance: convertedTotalChainImportance
    }
  }

  static get marketDataUrl() {
    return MARKET_DATA_URL
  }

  static get nodeUrl() {
    return NODE_URL
  }

  static get generationHash() {
    return GENERATION_HASH
  }

  static get networkType() {
    return NETWORK_TYPE
  }

  static get createRepositoryFactory() {
    return new symbol.RepositoryFactoryHttp(this.nodeUrl, this.networkType, this.generationHash)
  }

  static get mosaicService() {
    const accountRepository = this.createRepositoryFactory.createAccountRepository()
    const mosaicRepository = this.createRepositoryFactory.createMosaicRepository()
    return new symbol.MosaicService(accountRepository, mosaicRepository)
  }

  static get namespaceService() {
    const namespaceRepository = this.createRepositoryFactory.createNamespaceRepository()
    return new symbol.NamespaceService(namespaceRepository)
  }
}
