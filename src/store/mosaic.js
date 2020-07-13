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
import { MosaicService, RestrictionService, MetadataService } from '../infrastructure'
import {
  DataSet,
  Timeline,
  getStateFromManagers,
  getGettersFromManagers,
  getMutationsFromManagers,
  getActionsFromManagers
} from './manager'

const managers = [
  new Timeline(
    'timeline',
    () => MosaicService.getMosaicList(Constants.PageSize),
    (key, pageSize) => MosaicService.getMosaicList(pageSize, key),
    'mosaicId'
  ),
  new DataSet(
    'info',
    (hexOrNamespace) => MosaicService.getMosaicInfo(hexOrNamespace)
  ),
  new DataSet(
    'restrictions',
    (address) => RestrictionService.getMosaicGlobalRestrictionInfo(address)
  ),
  new Timeline(
    'metadatas',
    (pageSize, store) => MetadataService.getMosaicMetadataList(store.getters.getCurrentMosaicId, pageSize),
    (key, pageSize, store) => MetadataService.getMosaicMetadataList(store.getters.getCurrentMosaicId, pageSize, key),
    'id',
    10
  )
]

const LOCK = Lock.create()

export default {
  namespaced: true,
  state: {
    ...getStateFromManagers(managers),
    // If the state has been initialized.
    initialized: false,
    currentMosaicId: null
  },
  getters: {
    ...getGettersFromManagers(managers),
    getInitialized: state => state.initialized,
    getMosaicRestrictionList: state => state.restrictions?.data.restrictions || [],
    getCurrentMosaicId: state => state.currentMosaicId
  },
  mutations: {
    ...getMutationsFromManagers(managers),
    setInitialized: (state, initialized) => { state.initialized = initialized },
    setCurrentMosaicId: (state, currentMosaicId) => { state.currentMosaicId = currentMosaicId }
  },
  actions: {
    ...getActionsFromManagers(managers),
    // Initialize the mosaic model.
    async initialize({ commit, dispatch, getters }) {
      const callback = async () => {
        await dispatch('initializePage')
      }
      await LOCK.initialize(callback, commit, dispatch, getters)
    },

    // Uninitialize the mosaic model.
    async uninitialize({ commit, dispatch, getters }) {
      const callback = async () => {
        getters.timeline?.uninitialize()
      }
      await LOCK.uninitialize(callback, commit, dispatch, getters)
    },

    // Fetch data from the SDK and initialize the page.
    initializePage(context) {
      context.getters.timeline.setStore(context).initialFetch()
    },

    // Fetch data from the SDK.
    fetchMosaicInfo(context, payload) {
      context.dispatch('uninitializeDetail')
      context.commit('setCurrentMosaicId', payload.mosaicId)
      context.getters.info.setStore(context).initialFetch(payload.mosaicId)
      context.getters.restrictions.setStore(context).initialFetch(payload.mosaicId)
      context.getters.metadatas.setStore(context).initialFetch(payload.mosaicId)
    },

    uninitializeDetail(context) {
      context.getters.info.setStore(context).uninitialize()
      context.getters.restrictions.setStore(context).uninitialize()
      context.getters.metadatas.setStore(context).uninitialize()
    }
  }
}
