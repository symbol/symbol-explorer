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
import { Address } from 'symbol-sdk';

class MultisigService {
  /**
   * Gets a MultisigAccountInfo for an account.
   * @param address - Account Address
   * @returns MultisigAccountInfo
   */
  static getMultisigAccount = async address => {
  	let multisigAccountInfo;

  	try {
  		multisigAccountInfo = await http.createRepositoryFactory.createMultisigRepository()
  			.getMultisigAccountInfo(Address.createFromRawAddress(address))
  			.toPromise();
  	}
  	catch (e) {
  		// To Catach statusCode 404 if Address is not a multisig account.
  		throw Error('Address is not a multisig account.');
  	}

  	const formattedMultisigAccount = this.formatMultisigAccountInfo(multisigAccountInfo);

  	return formattedMultisigAccount;
  }

  /**
   * Get Customize MultisigAccountInfo for Vue component
   * @param address - Account Address
   * @returns customize MultisigAccountInfo
   */
  static getMultisigAccountInfo = async address => {
  	const multisigAccountInfo = await this.getMultisigAccount(address);

  	return {
  		...multisigAccountInfo,
  		minApproval: multisigAccountInfo?.cosignatoryAddresses.length > 0 ? multisigAccountInfo.minApproval : null,
  		minRemoval: multisigAccountInfo?.cosignatoryAddresses.length > 0 ? multisigAccountInfo.minRemoval : null,
  		cosignatoryAddresses: multisigAccountInfo?.cosignatoryAddresses,
  		multisigAddresses: multisigAccountInfo?.multisigAddresses
  	};
  }

  /**
   * Format multisigAccountInfo DTO to readable object
   * @param multisigAccountInfo - multisigAccountInfo DTO
   * @returns formatted multisigAccountInfo DTO
   */
  static formatMultisigAccountInfo = multisigAccountInfo => ({
  	...multisigAccountInfo,
  	cosignatoryAddresses: multisigAccountInfo.cosignatoryAddresses.map(address => address.plain()),
  	multisigAddresses: multisigAccountInfo.multisigAddresses.map(address => address.plain())
  })
}

export default MultisigService;
