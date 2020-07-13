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

import Lock from './lock'
import Constants from '../config/constants'
import helper from '../helper'
import {
  AccountService,
  MosaicService,
  NamespaceService,
  MultisigService,
  MetadataService,
  RestrictionService
} from '../infrastructure'
import {
  Filter,
  DataSet,
  Timeline,
  getStateFromManagers,
  getGettersFromManagers,
  getMutationsFromManagers,
  getActionsFromManagers
} from './manager'

const managers = [
  new Timeline(
    'harvester',
    () => AccountService.getAccountList(Constants.PageSize, 'harvested/blocks'),
    (key, pageSize) => AccountService.getAccountList(pageSize, 'harvested/blocks', key),
    'address'
  ),
  new Filter(
    'timeline',
    {
      'harvester': 'Harvester List'
    }
  ),
  new DataSet(
    'info',
    (address) => AccountService.getAccountInfo(address)
  ),
  new DataSet(
    'OwnedMosaic',
    (address) => MosaicService.getMosaicAmountViewList(address)
  ),
  new Timeline(
    'OwnedNamespace',
    (pageSize, store) => NamespaceService.getNamespacesFromAccountList(store.getters.getCurrentAccountAddress, pageSize),
    (key, pageSize, store) => NamespaceService.getNamespacesFromAccountList(store.getters.getCurrentAccountAddress, pageSize, key),
    'metaId',
    10
  ),
  new DataSet(
    'multisig',
    (address) => MultisigService.getMultisigAccountInfo(address)
  ),
  new Timeline(
    'transactions',
    (pageSize, store) => AccountService.getAccountTransactionList(store.getters.getCurrentAccountAddress, pageSize),
    (key, pageSize, store) => AccountService.getAccountTransactionList(store.getters.getCurrentAccountAddress, pageSize, key),
    'transactionId',
    10
  ),
  new Timeline(
    'metadatas',
    (pageSize, store) => MetadataService.getAccountMetadataList(store.getters.getCurrentAccountAddress, pageSize),
    (key, pageSize, store) => MetadataService.getAccountMetadataList(store.getters.getCurrentAccountAddress, pageSize, key),
    'id',
    10
  ),
  new DataSet(
    'restrictions',
    (address) => RestrictionService.getAccountRestrictionList(address)
  ),
  new Timeline(
    'partialTransactions',
    (pageSize, store) => AccountService.getAccountPartialTransactionList(store.getters.getCurrentAccountAddress, pageSize),
    (key, pageSize, store) => AccountService.getAccountPartialTransactionList(store.getters.getCurrentAccountAddress, pageSize, key),
    'id',
    10
  )

  // TODO OlegMakarenko: Add `getAccountTransactions` method to `infratructure.getAccount`
  // new Timeline(
  //   'all',
  //   (pageSize, store) => sdkAccount.getAccountTransactions(pageSize, null, store.getters.currentAccountAddress),
  //   (key, pageSize, store) => sdkAccount.getAccountTransactions(pageSize, null, store.getters.currentAccountAddress, key),
  //   'transactionHash',
  //   10
  // ),
  // new Timeline(
  //   'transfer',
  //   (pageSize, store) => sdkAccount.getAccountTransactions(pageSize, 'transfer', store.getters.currentAccountAddress),
  //   (key, pageSize, store) => sdkAccount.getAccountTransactions(pageSize, 'transfer', store.getters.currentAccountAddress, key),
  //   'transactionHash',
  //   10
  // ),
  // new Filter(
  //   'transactions',
  //   {
  //     all: 'All transactions',
  //     mosaic: 'Mosaic transactions',
  //     namespace: 'Namespace transactions',
  //     transfer: 'Transfers'
  //   }
  // )
]

const LOCK = Lock.create()

export default {
  namespaced: true,
  state: {
    ...getStateFromManagers(managers),
    // If the state has been initialized.
    initialized: false,
    currentAccountAddress: null
  },
  getters: {
    ...getGettersFromManagers(managers),
    getInitialized: state => state.initialized,
    getActivityBucketList: state => state.info?.data.activityBucket || [],
    getSupplementalAccountKeys: state => state.info?.data.supplementalAccountKeys || [],
    getCurrentAccountAddress: state => state.currentAccountAddress
  },
  mutations: {
    ...getMutationsFromManagers(managers),
    setInitialized: (state, initialized) => { state.initialized = initialized },
    setCurrentAccountAddress: (state, currentAccountAddress) => { state.currentAccountAddress = currentAccountAddress }
  },
  actions: {
    ...getActionsFromManagers(managers),
    // Initialize the account model.
    async initialize({ commit, dispatch, getters }) {
      const callback = async () => {
        await dispatch('initializePage')
      }
      await LOCK.initialize(callback, commit, dispatch, getters)
    },

    // Uninitialize the account model.
    async uninitialize({ commit, dispatch, getters }) {
      const callback = async () => { getters.timeline?.uninitialize() }
      await LOCK.uninitialize(callback, commit, dispatch, getters)
    },

    // Fetch data from the SDK and initialize the page.
    initializePage(context) {
      context.getters.harvester.setStore(context)
      context.getters.timeline.setStore(context).initialFetch()
    },

    // Fetch data from the SDK By Address.
    async fetchAccountDetail(context, payload) {
      if (!helper.isAccountAddress(payload.address))
        payload.address = await helper.decodeToAddress(payload.address)

      context.dispatch('uninitializeDetail')
      context.commit('setCurrentAccountAddress', payload.address)

      context.getters.info.setStore(context).initialFetch(payload.address)
      context.getters.OwnedMosaic.setStore(context).initialFetch(payload.address)
      context.getters.OwnedNamespace.setStore(context).initialFetch(payload.address)
      context.getters.multisig.setStore(context).initialFetch(payload.address)
      context.getters.transactions.setStore(context).initialFetch(payload.address)
      context.getters.metadatas.setStore(context).initialFetch(payload.address)
      context.getters.restrictions.setStore(context).initialFetch(payload.address)
      context.getters.partialTransactions.setStore(context).initialFetch(payload.address)
    },

    uninitializeDetail(context) {
      context.getters.info.setStore(context).uninitialize()
      context.getters.OwnedMosaic.setStore(context).uninitialize()
      context.getters.OwnedNamespace.setStore(context).uninitialize()
      context.getters.multisig.setStore(context).uninitialize()
      context.getters.transactions.setStore(context).uninitialize()
      context.getters.metadatas.setStore(context).uninitialize()
      context.getters.restrictions.setStore(context).uninitialize()
      context.getters.partialTransactions.setStore(context).uninitialize()
    }
  }
}
