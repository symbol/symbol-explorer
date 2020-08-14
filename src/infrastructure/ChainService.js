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

class ChainService {
  /**
   * Gets current blockchain height
   * @returns block height
   */
  static getBlockchainHeight = async () => {
  	const blockHeight = await http.createRepositoryFactory.createChainRepository()
  		.getBlockchainHeight()
  		.toPromise();

  	return blockHeight.compact();
  }

  /**
   * Gets current blockchain score
   * @returns
   */
  static getChainScore = async () => {
  	const chainScore = await http.createRepositoryFactory.createChainRepository()
  		.getChainScore()
  		.toPromise();

  	const formattedChainScore = this.formatBlockchainScore(chainScore);

  	return formattedChainScore;
  }

  /**
   * Format BlockchainScoreDTO to readable BlockchainScore object
   * @param BlockchainScoreDTO
   */
  static formatBlockchainScore = blockchainScore => ({
  	...blockchainScore,
  	scoreLow: blockchainScore.scoreLow.compact(),
  	scoreHigh: blockchainScore.scoreHigh.compact()
  })
}

export default ChainService;
