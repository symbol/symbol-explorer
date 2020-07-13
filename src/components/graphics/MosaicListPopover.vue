<template>
    <b-popover :target="target" placement="bottom" triggers="hover">
        <template v-slot:title>{{ title }}</template>
        <b-list-group>
            <b-list-group-item
                v-for="(mosaic, index) in mosaics"
                class="d-flex justify-content-between align-items-center mosaic-list"
                :key="'mlp'+mosaic.mosaicId + index"
            >
                <MosaicIcon
                    v-if="!isNativeMosaic(mosaic.mosaicId)"
                    :width="32"
                    :height="32"
                    :mosaicId="mosaic.mosaicId"
                    :key="'mosaic'+mosaic.mosaicId+index"
                />
                <NativeMosaicIcon
                    v-else
                    :width="32"
                    :height="32"
                    :mosaicId="mosaic.mosaicId"
                    :key="'mosaic'+mosaic.mosaicId+index"
                />
                {{ trunc(mosaic.mosaicAliasName !== 'N/A' ? mosaic.mosaicAliasName : mosaic.mosaicId) }}
                <b-badge variant="primary" pill>{{ mosaic.amount }}</b-badge>
            </b-list-group-item>
        </b-list-group>
    </b-popover>
</template>

<script>
import MosaicIcon from '../graphics/MosaicIcon.vue'
import NativeMosaicIcon from '../graphics/NativeMosaicIcon.vue'
import SchemaComponent from './SchemaComponent.vue'

export default {
  extends: SchemaComponent,

  components: {
    MosaicIcon,
    NativeMosaicIcon
  },

  props: {
    mosaics: {
      type: Array,
      default: () => []
    },

    title: {
      type: String,
      default: 'Mosaics'
    },

    target: {
      type: String,
      required: true
    }
  },

  methods: {
    isNativeMosaic(mosaicId) {
      return mosaicId === this.nativeMosaicId
    },

    trunc(str) {
      return this.truncString(str, 6)
    },

    click() {
      this.$emit('click', this.mosaicId)
    }
  }
}
</script>

<style lang="scss" scoped>
.mosaic-list {
    min-width: 250px;
}
</style>
