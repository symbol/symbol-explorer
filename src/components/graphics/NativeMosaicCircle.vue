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
			<linearGradient id="native-mosaic-circle-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stop-color="RGB(242, 114, 255)" />
				<stop offset="100%" stop-color="RGB(233, 42, 255)" />
			</linearGradient>
		</defs>
		<foreignObject x="446" y="318" width="100" height="100">
			<MosaicListPopover
				:target="id"
				:mosaics="mosaics"
			/>
		</foreignObject>
		<circle
			id="native-mosaic-circle"
			fill-rule="evenodd"
			clip-rule="evenodd"
			fill="url(#native-mosaic-circle-gradient)"
			cx="19.115"
			cy="19.094"
			r="17.26"
		/>
		<g>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				fill="#FFFFFF"
				d="M10.814,15.818c-0.769-0.017-0.844-0.56-0.664-1.071
                    c0.357-1.016,0.813-1.979,1.552-2.819c0.609-0.692,1.133-0.71,1.866-0.273c1.757,1.046,3.539,2.051,5.313,3.067
                    c0.152,0.087,0.328,0.133,0.492,0.198c0.748,0.755,2.021,0.876,3.223,0.245c1.467-0.772,2.359-2.011,2.761-3.611
                    c0.407-0.532,0.895-0.37,1.215,0.008c0.68,0.805,1.29,1.676,1.661,2.681c0.373,1.008,0.254,1.279-0.698,1.824
                    c-1.937,1.109-3.867,2.229-5.8,3.345c-0.45-0.002-0.68,0.348-0.929,0.624c-1.429,1.583-0.947,4.708,0.933,6.142
                    c0.26,0.792-0.214,1.124-0.862,1.206c-1.018,0.128-2.049,0.097-3.073,0.007c-0.86-0.075-1.16-0.604-1.148-1.423
                    c0.026-1.872,0.021-3.745,0.021-5.617c0-0.361-0.03-0.723-0.046-1.085c0.396-0.947-0.15-1.656-0.681-2.295
                    C14.895,15.695,12.574,15.214,10.814,15.818z"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				class="connector-shadow"
				d="M25.359,11.553c-0.402,1.6-1.294,2.838-2.761,3.611
		            c-1.202,0.632-2.475,0.51-3.223-0.245C21.369,13.798,23.364,12.675,25.359,11.553z"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				class="connector-shadow"
				d="M10.814,15.818c1.76-0.604,4.08-0.123,5.137,1.152
		            c0.531,0.64,1.076,1.348,0.681,2.295C14.693,18.116,12.754,16.967,10.814,15.818z"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				class="connector-shadow"
				d="M21.74,26.177c-1.88-1.435-2.362-4.559-0.933-6.142
		            c0.249-0.275,0.479-0.626,0.929-0.624C21.737,21.667,21.739,23.922,21.74,26.177z"
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
import GraphicComponent from './GraphicComponent.vue';
import MosaicListPopover from './MosaicListPopover.vue';

export default {
	extends: GraphicComponent,

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
			id: this.getId('native-mosaic-circle')
		};
	}
};
</script>

<style lang="scss" scoped>
.connector-shadow {
    fill: #ebebeb;
}
</style>
