<template>
    <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        :x="_x"
        :y="_y"
        width="38.5px"
        height="38.167px"
        viewBox="0 0 38.5 38.167"
        xml:space="preserve"
        class="circle-icon"
    >
        <defs>
            <linearGradient id="mosaics-circle-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="RGB(114, 171, 255)" />
                <stop offset="100%" stop-color="RGB(40, 127, 255)" />
            </linearGradient>
        </defs>
        <foreignObject x="446" y="318" width="100" height="100">
            <MosaicListPopover
                :target="id"
                :mosaics="mosaics"
            />
        </foreignObject>
        <circle
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill="url(#mosaics-circle-gradient)"
            cx="19.115"
            cy="19.094"
            r="17.26"
        />
        <g>
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                fill="#FFFFFF"
                d="M20.022,11.301c2.027,0.088,4.224,0.351,6.26,1.37
                    c0.185,0.093,0.37,0.187,0.543,0.297c1.907,1.227,1.898,2.807-0.067,3.967c-2.426,1.433-5.133,1.697-7.863,1.643
                    c-2.28-0.046-4.533-0.375-6.598-1.468c-0.092-0.048-0.182-0.1-0.27-0.154c-1.973-1.218-1.993-2.789-0.006-4.005
                    c2.1-1.285,4.469-1.535,6.861-1.648C19.192,11.289,19.504,11.301,20.022,11.301z"
            />
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                fill="#FFFFFF"
                d="M10.565,18.102c5.887,2.869,11.704,2.864,17.537,0.063
                    c0.277,2.469,0.314,2.872-2.115,3.9c-0.935,0.396-1.922,0.615-2.917,0.728c-2.685,0.304-5.373,0.349-8.05-0.13
                    c-0.892-0.16-1.763-0.39-2.594-0.741C10.63,21.164,10.37,20.603,10.565,18.102z"
            />
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                fill="#FFFFFF"
                d="M10.571,22.956c5.836,2.332,11.669,2.308,17.524,0.063
                    c0.313,1.884,0.212,2.431-1.409,3.205c-1.659,0.792-3.465,1.099-5.258,1.222c-2.848,0.195-5.701,0.091-8.443-0.885
                    C10.376,25.632,10.4,25.035,10.571,22.956z"
            />
        </g>
        <circle
            :id="id"
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill="transparent"
            cx="19.115"
            cy="19.094"
            r="17.26"
        />
    </svg>
</template>

<script>
import SchemaComponent from './SchemaComponent.vue'
import MosaicListPopover from './MosaicListPopover.vue'

export default {
  extends: SchemaComponent,

  components: {
    MosaicListPopover
  },

  props: {
    mosaics: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      id: this.getId('mosaics-circle')
    }
  }
}
</script>
