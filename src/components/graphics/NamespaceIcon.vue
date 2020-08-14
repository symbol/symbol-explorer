<template>
	<svg
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		:x="_x"
		:y="_y"
		:width="_width"
		:height="_height"
		:viewBox="viewBox"
		xml:space="preserve"
		class="namespace"
		@click="onNamespaceClick(namespace.namespaceId)"
	>
		<defs>
			<radialGradient :id="id" cx="50%" y="50%" fx="70%" fy="5%">
				<stop offset="0%" :stop-color="iconColor" stop-opacity="0.5"/>
				<stop offset="60%" :stop-color="iconColor" />
				<stop offset="100%" :stop-color="iconColor" />
			</radialGradient>
		</defs>
		<title> {{ title }} </title>
		<rect
			x="25.266"
			y="107.646"
			fill-rule="evenodd"
			clip-rule="evenodd"
			fill="none"
			width="207.333"
			height="23.667"
		/>
		<text
			v-if="!hideCaption"
			x="130"
			y="122.8457"
			class="namespace-text"
			text-anchor="middle"
		>{{ truncatedNamespaceName }}</text>
		<path fill-rule="evenodd" clip-rule="evenodd" :fill="iconColor" d="M112.358,13.08c4.963,0,9.925,0.041,14.889-0.018
            c2.416-0.028,4.408,0.836,6.074,2.501c13.303,13.271,26.615,26.535,39.869,39.853c3.283,3.299,3.326,8.558,0.037,11.887
            c-10.336,10.465-20.721,20.887-31.195,31.215c-3.641,3.59-8.674,3.32-12.311-0.285c-12.516-12.404-24.98-24.863-37.578-37.181
            c-3.314-3.243-4.947-6.862-4.836-11.51c0.214-9.05,0.094-18.107,0.322-27.157c0.154-6.098,3.422-9.142,9.578-9.244
            c5.049-0.084,10.1-0.018,15.15-0.018C112.358,13.108,112.358,13.095,112.358,13.08z M103.104,35.029
            c3.468-0.028,6.512-3.168,6.51-6.717c-0.002-3.541-3.041-6.587-6.594-6.605c-3.849-0.023-6.973,2.932-6.917,6.539
            C96.161,32.009,99.307,35.057,103.104,35.029z"
		/>

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

		namespace: {
			type: Object,
			required: true,
			default: () => ({
				namespaceId: '',
				namespaceName: ''
			})
		},

		'hideCaption': {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {
			id: this.getId('namespace-icon')
		};
	},

	computed: {
		title() {
			return this.getTranslation('namespace') + ': ' + this.namespace.namespaceName;
		},
		iconColor() {
			return this.getIconColorFromHex(this.namespace.namespaceId);
		},

		// iconFill() {
		//     return `url(#${this.id})`;
		// },

		truncatedNamespaceName() {
			return this.truncString(this.namespace.namespaceName, 5);
		},

		viewBox() {
			return this.hideCaption
				? '115 0 16 105'
				: '0 0 261.333 131.313';
		}
	}
};
</script>

<style lang="scss" scoped>
.namespace {
    cursor: pointer;
}

.namespace-text {
    font-size: 18px;
    font-weight: bold;
    fill: var(--secondary);
}
</style>
