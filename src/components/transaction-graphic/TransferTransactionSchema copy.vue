<template>
	<div>
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			x="0px"
			y="0px"
			width="700px"
			height="200px"
			viewBox="140 200 700 200"
			xml:space="preserve"
		>
			<AccountIcon
				:x="112"
				:y="240"
				:address="signer"
				@click="accountClick"
			/>
			<AccountIcon
				:x="614"
				:y="240"
				:address="recipient"
				@click="accountClick"
			/>
			<Arrow
				:x="341"
				:y="305"
			/>
			<MessageCircle
				v-if="hasMessage"
				:x="getCirclePosition(0)"
				:y="300"
				:message="message"
			/>
			<MosaicsCircle
				v-if="hasMosaic"
				id="target"
				:x="getCirclePosition(1)"
				:y="300"
				:mosaics="mosaicList"
			/>
			<NativeMosaicCircle
				v-if="hasNativeMosaic"
				id="target"
				:x="getCirclePosition(2)"
				:y="300"
				:mosaics="nativeMosaic
					? [nativeMosaic]
					: []"
			/>
			<!--
                <text
                    x="490"
                    y="361.9268"
                    text-anchor="middle"
                    class="message"
                > {{ messageText }}
                    <title> {{ message }} </title>
                </text>
                <rect x="459.56" y="252.25" fill-rule="evenodd" clip-rule="evenodd" fill="none" width="65" height="15.5"/>
                <text
                    x="490"
                    y="262.8906"
                    text-anchor="middle"
                    class="message"
                >
                    <title>{{ mosaics }}</title>
                    {{ mosaic2Text }}
                </text>
                <rect x="459.56" y="269.659" fill-rule="evenodd" clip-rule="evenodd" fill="none" width="65" height="15.5"/>
                <text
                    x="490"
                    y="280.2993"
                    text-anchor="middle"
                    class="message"
                >
                    <title>{{ mosaics }}</title>
                    {{ mosaic1Text }}
                </text>-->
		</svg>
	</div>
</template>

<script>
import helper from '../../helper';
import GraphicComponent from '../graphics/GraphicComponent.vue';
import AccountIcon from '../graphics/AccountIcon.vue';
import MessageCircle from '../graphics/MessageCircle.vue';
import MosaicsCircle from '../graphics/MosaicsCircle.vue';
import NativeMosaicCircle from '../graphics/NativeMosaicCircle.vue';
import Arrow from '../graphics/Arrow.vue';

export default {
	extends: GraphicComponent,

	components: {
		AccountIcon,
		MessageCircle,
		MosaicsCircle,
		NativeMosaicCircle,
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
		recipient: {
			type: String,
			required: true,
			default: ''
		},
		mosaics: {
			type: Array,
			default: () => []
		}
	},

	computed: {
		circleIconsToDisplay() {
			return [
				this.hasMessage,
				this.hasNativeMosaic,
				this.hasMosaic
			];
		},

		hasMessage() {
			return typeof this.message === 'string' && this.message.length > 0;
		},

		hasNativeMosaic() {
			return typeof this.nativeMosaic !== 'undefined';
		},

		hasMosaic() {
			return this.mosaicList.length > 0;
		},

		nativeMosaic() {
			return this.mosaics.find(mosaic => mosaic.mosaicId === this.nativeMosaicId);
		},

		mosaicList() {
			return this.mosaics.filter(mosaic => mosaic.mosaicId !== this.nativeMosaicId);
		},

		mosaicListText() {
			const mosaicList = this.mosaicList;
			const name = mosaicList[0].mosaicAliasName !== 'N/A'
				? mosaicList[0].mosaicAliasName
				: this.trunc(mosaicList[0].mosaicId);
			const amount = mosaicList[0].amount;
			const more = mosaicList.length - 1 > 0
				? `[+${mosaicList.length - 1}]`
				: '';

			return `${name} - ${amount} ${more}`;
		},

		nativeMosaicText() {
			if (this.hasNativeMosaic)
				return `${this.nativeMosaic.amount} XYM`;
			return '';
		},

		mosaic2Text() {
			if (this.hasMosaic)
				return this.nativeMosaicText;
			return '';
		},

		mosaic1Text() {
			if (this.hasMosaic)
				return this.mosaicListText;
			return this.nativeMosaicText;
		},

		messageText() {
			return this.message?.substring(0, 30) + (this.message?.length > 30 ? '...' : '');
		},

		circlesCount() {
			return +this.hasMessage + this.hasMosaic + this.hasNativeMosaic;
		}
	},

	methods: {
		getColor(hash) {
			const color = helper.getColorFromHash(hash, false);

			return `RGB(${color.R},${color.G},${color.B})`;
		},

		trunc(hash, strLen = 5) {
			return `${hash.substring(0, strLen)}...${hash.substring(hash.length - strLen, hash.length)}`;
		},

		accountClick(address) {
			this.$store.dispatch(`ui/openPage`, {
				pageName: 'address',
				param: address
			});
		},

		getCirclePosition(index) {
			const circlesCount = this.circlesCount;

			switch (index) {
			case 0:
				if (this.hasMessage)
					return this.circlesHorisontalPositions[circlesCount - 1][0];
				break;
			case 1:
				if (this.hasMosaic) {
					if (this.hasMessage)
						return this.circlesHorisontalPositions[circlesCount - 1][1];
					return this.circlesHorisontalPositions[circlesCount - 1][0];
				}
				break;
			case 2:
				if (this.hasNativeMosaic) {
					if (this.hasMessage && this.hasMosaic)
						return this.circlesHorisontalPositions[circlesCount - 1][2];
					if (this.hasMessage || this.hasMosaic)
						return this.circlesHorisontalPositions[circlesCount - 1][1];
					return this.circlesHorisontalPositions[circlesCount - 1][0];
				}
				break;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.account {
    cursor: pointer;
}

.account-text {
    font-size: 18px;
    font-weight: bold;
    fill: var(--secondary);
}

.message {
    font-size: 13px;
    font-weight: bold;
    fill: var(--blue);
}

.arrow-stroke {
    stroke: var(--secondary);
}

.arrow {
    fill: var(--secondary);
}
</style>
