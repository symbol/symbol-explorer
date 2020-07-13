<template>
    <div class="transaction-type">
        <div v-if="iconUrl" class="icon">
            <img :src="iconUrl" />
        </div>
        <div class="text">
            {{ transactionText }}
        </div>
    </div>
</template>

<script>
import IconTransfer from '../../styles/img/tx-transfer.png'
import IconTransferIncoming from '../../styles/img/tx-incoming.png'
import IconTransferOutgoing from '../../styles/img/tx-outgoing-2.png'
import IconAggregate from '../../styles/img/tx-aggregate.png'
import IconLock from '../../styles/img/tx-lock.png'
import IconNamespace from '../../styles/img/tx-namespace.png'
import IconMosaic from '../../styles/img/tx-mosaic.png'
import IconRestriction from '../../styles/img/tx-restriction.png'
import IconMultisig from '../../styles/img/tx-multisig.png'
import IconMetadata from '../../styles/img/tx-metadata.png'
import IconLink from '../../styles/img/tx-account-link.png'
import { TransactionType } from 'symbol-sdk'

export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      IconTransfer,
      IconTransferIncoming,
      IconTransferOutgoing,
      IconAggregate,
      IconLock,
      IconNamespace,
      IconMosaic,
      IconRestriction,
      IconMultisig,
      IconMetadata,
      IconLink
    }
  },

  computed: {
    iconUrl() {
      switch (this.extractTransactionType(this.value)) {
      case TransactionType.TRANSFER:
        if (this.value.toLowerCase().includes('incoming')) return this.IconTransferIncoming
        if (this.value.toLowerCase().includes('outgoing')) return this.IconTransferOutgoing
        return this.IconTransfer
      case TransactionType.NAMESPACE_REGISTRATION:
      case TransactionType.ADDRESS_ALIAS:
      case TransactionType.MOSAIC_ALIAS:
        return this.IconNamespace
      case TransactionType.MOSAIC_DEFINITION:
      case TransactionType.MOSAIC_SUPPLY_CHANGE:
        return this.IconMosaic
      case TransactionType.MULTISIG_ACCOUNT_MODIFICATION:
        return this.IconMultisig
      case TransactionType.AGGREGATE_COMPLETE:
      case TransactionType.AGGREGATE_BONDED:
        return this.IconAggregate
      case TransactionType.HASH_LOCK:
      case TransactionType.SECRET_LOCK:
      case TransactionType.SECRET_PROOF:
        return this.IconLock
      case TransactionType.ACCOUNT_KEY_LINK:
      case TransactionType.VOTING_KEY_LINK:
      case TransactionType.VRF_KEY_LINK:
      case TransactionType.NODE_KEY_LINK:
        return this.IconLink
      case TransactionType.ACCOUNT_ADDRESS_RESTRICTION:
      case TransactionType.ACCOUNT_MOSAIC_RESTRICTION:
      case TransactionType.ACCOUNT_OPERATION_RESTRICTION:
      case TransactionType.MOSAIC_ADDRESS_RESTRICTION:
      case TransactionType.MOSAIC_GLOBAL_RESTRICTION:
        return this.IconRestriction
      case TransactionType.ACCOUNT_METADATA:
      case TransactionType.MOSAIC_METADATA:
      case TransactionType.NAMESPACE_METADATA:
        return this.IconMetadata
      default:
        return null
      }
    },

    transactionText() {
      let text = this.value
        .replace('incoming_', '')
        .replace('outgoing_', '')
      return this.$store.getters['ui/getNameByKey'](text)
    }
  },

  methods: {
    extractTransactionType(value) {
      if (typeof value === 'string')
        return Number(value.split('_').pop())
    }
  }
}
</script>

<style lang="scss" scoped>
.transaction-type {
    display: flex;

    .icon {
        margin-right: 10px;

        img {
            height: 32px;
            width: 32px;
        }
    }

    .text {
        display: flex;
        align-items: center;
    }
}
</style>
