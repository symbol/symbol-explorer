<script>
import helper from '../../helper'
import http from '../../infrastructure/http'

export default {
  props: {
    x: {
      type: Number,
      default: 0
    },

    y: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      circlesHorisontalPositions: [
        [466],
        [447, 485],
        [428, 466, 504]
      ]
    }
  },

  computed: {
    nativeMosaicId() {
      return http.networkCurrecy.mosaicId
    },

    nativeMosaicAliasName() {
      return http.networkCurrecy.mosaicId.namespace
    },

    _x() {
      return this.x + 'px'
    },

    _y() {
      return this.y + 'px'
    },

    _height() {
      return (this.height || '0') + 'px'
    },

    _width() {
      return (this.width || '0') + 'px'
    },

    circlesCount() {
      return Array.isArray(this.circleIconsToDisplay)
        ? this.circleIconsToDisplay.reduce((acc, value) => acc + value)
        : 0
    }
  },

  methods: {
    getIconColor(str) {
      const color = helper.getColorFromHash(str, false)
      return `RGB(${color.R},${color.G},${color.B})`
    },

    getIconColorFromHex(str) {
      const color = helper.getColorFromHash(str, true)
      return `RGB(${color.R},${color.G},${color.B})`
    },

    truncString(str) {
      return helper.truncString(str)
    },

    getId(id) {
      return id + '-' + Math.floor(Math.random() * Math.floor(1000))
    },

    getCirclePosition(index) {
      const circlesCount = this.circlesCount
      switch (index) {
      case 0:
        if (this.circleIconsToDisplay[0])
          return this.circlesHorisontalPositions[circlesCount - 1][0]
        break
      case 1:
        if (this.circleIconsToDisplay[1]) {
          if (this.circleIconsToDisplay[0])
            return this.circlesHorisontalPositions[circlesCount - 1][1]
          return this.circlesHorisontalPositions[circlesCount - 1][0]
        }
        break
      case 2:
        if (this.hasNativeMosaic) {
          if (this.circleIconsToDisplay[0] && this.circleIconsToDisplay[1])
            return this.circlesHorisontalPositions[circlesCount - 1][2]
          if (this.circleIconsToDisplay[0] || this.circleIconsToDisplay[1])
            return this.circlesHorisontalPositions[circlesCount - 1][1]
          return this.circlesHorisontalPositions[circlesCount - 1][0]
        }
        break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.circle-icon {
    margin-left: 2px;
    margin-right: 2px;
}
</style>
