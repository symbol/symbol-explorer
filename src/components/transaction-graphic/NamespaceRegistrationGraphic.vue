<template>
	<div>
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			x="0px"
			y="0px"
			:width="getPixels(transactionGraphicWidth)"
			:height="getPixels(transactionGraphicHeight)"
			:viewBox="transactionGraphicViewbox"
			xml:space="preserve"
		>
			<AccountIcon
				:x="subjectPositionX"
				:y="subjectPositionY"
				:width="subjectWidth"
				:height="subjectHeight"
				:address="signer"
			/>
			<NamespaceIcon
				:x="objectPositionX"
				:y="objectPositionY"
				:width="subjectWidth"
				:height="subjectHeight"
				:namespace="namespace"
			/>
			<Arrow :x="arrowPositionX" :y="arrowPositionY" />
			<AddCircle
				:x="getCircleIconPositionX(0)"
				:y="circleIconPositionY"
				title="Namespace Registration"
				:data="namespace"
			/>
			<text :x="transactionTypeTextPositionX" :y="transactionTypeTextPositionY" text-anchor="middle" class="message">
				{{ transactionType }}
				<title>{{ transactionType }}</title>
			</text>
		</svg>
	</div>
</template>

<script>
import GraphicComponent from '../graphics/GraphicComponent.vue';
import AccountIcon from '../graphics/AccountIcon.vue';
import AddCircle from '../graphics/AddCircle.vue';
import NamespaceIcon from '../graphics/NamespaceIcon.vue';
import Arrow from '../graphics/Arrow.vue';

export default {
	extends: GraphicComponent,

	components: {
		AccountIcon,
		AddCircle,
		NamespaceIcon,
		Arrow
	},

	props: {
		message: {
			type: String,
			default: ''
		},

		signer: {
			type: String,
			required: true,
			default: ''
		},

		namespaceId: {
			type: String,
			required: true,
			default: ''
		},

		namespaceName: {
			type: String,
			required: true,
			default: ''
		},

		duration: {
			type: Number,
			required: true
		}
	},

	computed: {
		transactionType() {
			return this.getTransactionTypeCaption(16718); // Namespace registration
		},

		circleIconsToDisplay() {
			return [true];
		},

		namespace() {
			return {
				namespaceName: this.namespaceName,
				namespaceId: this.namespaceId,
				duration: this.duration
			};
		}
	}
};
</script>
