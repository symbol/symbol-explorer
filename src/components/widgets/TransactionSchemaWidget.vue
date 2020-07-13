<template>
    <Card :loading="loading">
        <template #title>{{getNameByKey('transactionGraphic')}}</template>

        <template #body>
            <div class="body">
                <TransferTransactionSchema v-if="TransactionTypes[data.type] === 'Transfer'" v-bind="data" />
            </div>
        </template>
    </Card>
</template>

<script>
import Constants from '@/config/constants'
import Card from '@/components/containers/Card.vue'
import TransferTransactionSchema from '@/components/transaction-schema/TransferTransactionSchema.vue'

export default {
  props: {
    managerGetter: String
  },

  components: {
    Card,
    TransferTransactionSchema
  },

  data() {
    return {
      TransactionTypes: Constants.TransactionType
    }
  },

  computed: {
    data() {
      return this.$store.getters[this.managerGetter].data
    },

    loading() {
      return this.$store.getters[this.managerGetter].loading
    },

    error() {
      return this.$store.getters[this.managerGetter].error
    }
  },

  methods: {
    getNameByKey(e) {
      return this.$store.getters['ui/getNameByKey'](e)
    }
  }
}
</script>

<style lang="scss" scoped>
.body {
    display: flex;
    justify-content: center;
}
</style>
