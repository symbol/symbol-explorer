<template>
	<svg
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		:x="_x"
		:y="_y"
		:width="_width"
		:height="_height"
		viewBox="0 0 116 105"
		xml:space="preserve"
		class="connector"
		@click="onMosaicClick(mosaicId || mosaic.mosaicId)"
	>
		<defs>
			<linearGradient id="connector-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stop-color="RGB(255, 255, 255)" />
				<stop offset="100%" stop-color="RGB(196, 182, 208)" />
			</linearGradient>
		</defs>
		<g>
			<title> {{ title }} </title>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				class="connector-body"
				fill="url(#connector-gradient)"
				d="M11.904,34.983c-4.227-0.093-4.647-3.084-3.658-5.896
                    c1.968-5.593,4.479-10.894,8.546-15.516c3.351-3.808,6.236-3.907,10.271-1.502c9.666,5.76,19.471,11.289,29.236,16.88
                    c0.837,0.479,1.802,0.731,2.708,1.089c4.115,4.153,11.126,4.823,17.737,1.344c8.075-4.25,12.982-11.063,15.193-19.869
                    c2.245-2.927,4.929-2.037,6.688,0.043c3.749,4.43,7.098,9.225,9.141,14.753c2.05,5.549,1.401,7.036-3.843,10.04
                    c-10.657,6.104-21.28,12.268-31.917,18.407c-2.476-0.013-3.744,1.917-5.115,3.435c-7.864,8.708-5.21,25.899,5.134,33.797
                    c1.434,4.358-1.177,6.186-4.74,6.636c-5.604,0.709-11.279,0.534-16.912,0.038c-4.731-0.415-6.382-3.324-6.32-7.834
                    c0.141-10.301,0.112-20.605,0.117-30.907c0-1.989-0.163-3.979-0.25-5.968c2.176-5.214-0.826-9.114-3.744-12.631
                    C34.355,34.307,21.589,31.658,11.904,34.983z"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				:fill="iconColor"
				d="M91.938,11.513c-2.211,8.805-7.118,15.619-15.193,19.869
		            c-6.611,3.479-13.622,2.809-17.737-1.344C69.985,23.862,80.962,17.688,91.938,11.513z"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				:fill="iconColor"
				d="M11.904,34.983c9.685-3.325,22.451-0.676,28.271,6.339
		            c2.918,3.517,5.92,7.417,3.744,12.631C33.248,47.63,22.576,41.307,11.904,34.983z"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				:fill="iconColor"
				d="M72.025,91.988c-10.344-7.897-12.998-25.089-5.134-33.797
		            c1.371-1.518,2.64-3.447,5.115-3.435C72.014,67.167,72.02,79.578,72.025,91.988z"
			/>
		</g>
	</svg>
</template>

<script>
import GraphicComponent from './GraphicComponent.vue';

export default {
	extends: GraphicComponent,

	props: {
		width: {
			type: Number,
			default: 261.333
		},

		height: {
			type: Number,
			default: 131.313
		},

		mosaic: {
			type: Object,
			default: () => ({
				mosaicId: '',
				aliasName: ''
			})
		},

		mosaicId: {
			type: String
		},

		aliasName: {
			type: String
		}
	},

	computed: {
		title() {
			return this.getTranslation('mosaic') + ': ' + ((this.aliasName || this.mosaic.aliasName) || (this.mosaicId || this.mosaic.mosaicId));
		},
		iconColor() {
			return this.getIconColorFromHex(this.mosaicId || this.mosaic.mosaicId);
		},

		truncatedMosaicId() {
			return this.truncString(this.mosaicId || this.mosaic.mosaicId);
		}
	}
};
</script>

<style lang="scss" scoped>
.connector {
    cursor: pointer;
}

.connector-body {
    font-size: 18px;
    font-weight: bold;
}
</style>
