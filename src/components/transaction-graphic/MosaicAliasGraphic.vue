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
			<MosaicIcon
				:x="objectPositionX"
				:y="objectPositionY"
				:width="subjectWidth"
				:height="subjectHeight"
				:mosaic="mosaic"
			/>
			<Arrow :x="arrowPositionX" :y="arrowPositionY" />
			<NamespaceCircle
				v-if="isLinkAction"
				:x="getCircleIconPositionX(0)"
				:y="circleIconPositionY"
				:namespaces="[namespace]"
			/>
			<NamespaceUnlinkCircle
				v-else
				:x="getCircleIconPositionX(0)"
				:y="circleIconPositionY"
				:namespaces="[namespace]"
			/>
			<text :x="transactionTypeTextPositionX" :y="transactionTypeTextPositionY" text-anchor="middle" class="message">
				{{ transactionType + subTitle }}
				<title>{{ transactionType }}</title>
			</text>
		</svg>
	</div>
</template>

<script>
import GraphicComponent from '../graphics/GraphicComponent.vue';
import AccountIcon from '../graphics/AccountIcon.vue';
import NamespaceCircle from '../graphics/NamespaceCircle.vue';
import NamespaceUnlinkCircle from '../graphics/NamespaceUnlinkCircle.vue';
import MosaicIcon from '../graphics/MosaicIcon.vue';
import Arrow from '../graphics/Arrow.vue';

export default {
	extends: GraphicComponent,

	components: {
		AccountIcon,
		NamespaceCircle,
		NamespaceUnlinkCircle,
		Arrow,
		MosaicIcon
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
			required: true
		},
		namespaceName: {
			type: String,
			required: true
		},
		aliasAction: {
			type: String,
			required: true
		},
		mosaicId: {
			type: String,
			required: true
		}
	},

	data() {
		return {
			width: this.transactionGraphicWidth,
			heigth: this.transactionGraphicHeight
		};
	},

	computed: {
		transactionType() {
			return this.getTransactionTypeCaption(17230); // Mosaic alias
		},

		circleIconsToDisplay() {
			return [true];
		},

		isLinkAction() {
			return this.aliasAction === 'Link';
		},

		subTitle() {
			return `. ${this.aliasAction} namespace`;
		},

		mosaic() {
			return { mosaicId: this.mosaicId };
		},

		namespace() {
			return { namespaceId: this.namespaceId, namespaceName: this.namespaceName };
		}
	}
};
</script>
