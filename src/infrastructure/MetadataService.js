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
import Constants from '../config/constants';

class MetadataService {
  /**
   * Gets a metadata from searchCriteria
   * @param metadataSearchCriteria Object of Search Criteria
   * @returns formatted metadatas with pagination info
   */
  static searchMetadatas = async (metadataSearchCriteria) => {
  	const searchMetadatas = await http.createRepositoryFactory.createMetadataRepository()
  		.search(metadataSearchCriteria)
  		.toPromise();

  	return {
  		...searchMetadatas,
  		data: searchMetadatas.data.map(metadata => this.formatMetadata(metadata))
  	};
  }

  /**
   * Format Metadata to readable object
   * @param metadata - metadata DTO
   * @returns readable Metadata object
   */
  static formatMetadata = metadata => ({
  	metadataId: metadata.id,
  	...this.formatMetadataEntry(metadata.metadataEntry)
  })

  /**
   * Format MetadataEntry to readable object
   * @param metadataEntry - metadataEntry DTO
   * @returns readable metadataEntry object
   */
  static formatMetadataEntry = metadataEntry => ({
  	...metadataEntry,
  	scopedMetadataKey: metadataEntry.scopedMetadataKey.toHex(),
  	sourceAddress: metadataEntry.sourceAddress.plain(),
  	targetAddress: metadataEntry.targetAddress.plain(),
  	metadataType: Constants.MetadataType[metadataEntry.metadataType],
  	targetId: metadataEntry.targetId ? metadataEntry.targetId.toHex() : Constants.Message.UNAVAILABLE,
  	metadataValue: metadataEntry.value
  })
}

export default MetadataService;
