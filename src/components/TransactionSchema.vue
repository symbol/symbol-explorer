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
			<defs>
				<radialGradient
					id="gradient"
					cx="0.5"
					cy="0.5"
					r="0.5"
					fx="0.25"
					fy="0.25"
				>
					<stop offset="0%" stop-color="red"/>
					<stop offset="100%" stop-color="transparent"/>
				</radialGradient>
			</defs>
			<g
				id="account-1"
				class="account"
				@click="accountClick(signer)"
			>
				<title> {{ signer }} </title>
				<rect x="138.025" y="347.646" fill-rule="evenodd" clip-rule="evenodd" fill="none" width="207.333" height="23.667"/>
				<text
					text-anchor="middle"
					x="240"
					y="362.8457"
					class="account-text"
				>
					{{ trunc(signer) }}
				</text>
				<path fill-rule="evenodd" clip-rule="evenodd" :fill="signerColor" d="M220.535,269.897c0.11-2.393,1.469-4.188,2.864-5.965
                    c3.048-1.255,3.729,1.313,4.431,3.09c1.125,2.856,2.42,5.67,3.176,8.668c-1.665,4.138-1.7,8.836-4.374,12.65
                    c-0.821,1.172-0.687,2.651-0.132,3.862c2.345,5.117,3.962,10.643,7.713,15.007c5.933,6.903,13.437,7.12,19.964,0.701
                    c1.067-1.049,1.933-2.298,3.157-3.203c4.781-2.331,5.483-2.001,5.302,2.479c-3.134,6.533-3.136,6.54,3.791,8.697
                    c5.604,1.746,10.847,4.162,15.436,7.91c2.636,2.153,4.714,4.73,6.01,7.836c2.767,6.629,0.91,9.446-6.062,9.446
                    c-25.46,0.001-50.919,0.005-76.379-0.003c-5.917-0.002-6.961-1.378-5.369-7.242c1.377-5.071,4.73-8.7,8.907-11.649
                    c4.818-3.403,10.195-5.654,15.89-6.994c3.9-0.917,3.877-2.855,2.286-5.771c-1.985-3.637-3.917-7.306-5.762-11.016
                    c-1.813-3.646-2.879-7.571-1.92-11.578c0.956-3.998-1.518-7.904,0.072-11.818C220.819,273.488,219.422,271.447,220.535,269.897z"/>
				<path fill-rule="evenodd" clip-rule="evenodd" :fill="signerColor" d="M262.636,307.188c-0.404-5.872-3.108-1.998-5.086-1.199
                    c-1.204-3.42,0.808-5.817,2.62-8.278c1.204-0.877,2.237-1.888,2.553-3.435c0.103-0.405,0.229-0.802,0.349-1.199
                    c0.44-1.873,0.59-3.707-0.636-5.387c-0.26-0.368-0.465-0.76-0.636-1.175c-0.632-1.697-0.229-3.663-1.401-5.21
                    c-1.313-2.182-3.421-2.083-5.596-2.151c-3.911-0.125-7.841-0.393-10.932-3.333c-2.035-3.97-4.009-7.979-4.421-12.496
                    c-0.549-6.004,3.39-9.86,9.502-9.444c14.104,2.032,22.724,15.274,19.107,29.276c-0.127,0.493,0.353,1.144,0.55,1.721
                    c0.715,3.103,0.664,6.207,0.028,9.314C266.638,298.523,264.637,302.855,262.636,307.188z"/>
				<path fill-rule="evenodd" clip-rule="evenodd" :fill="signerColor" d="M248.952,253.88c-6.989,0.567-10.491,6.707-6.721,15.414
                    c0.913,2.108,2.521,3.977,2.34,6.483c-4.664,0.345-9.343-0.588-14.004,0.146c-1.74-2.197-2.747-4.654-3.429-7.409
                    c-0.459-1.855-1.019-4.28-3.739-4.581C230.245,255.119,240.113,251.236,248.952,253.88z"/>
				<path fill-rule="evenodd" clip-rule="evenodd" :fill="signerColor" d="M268.638,294.191c-0.01-3.105-0.019-6.21-0.028-9.314
                    C270.451,287.976,270.092,291.082,268.638,294.191z"/>
				<path fill-rule="evenodd" clip-rule="evenodd" :fill="signerColor" d="M220.535,269.897c-0.188,1.731,0.723,3.677-0.999,5.107
                    C219.347,273.201,219.329,271.429,220.535,269.897z"/>
				<path fill-rule="evenodd" clip-rule="evenodd" fill="#FEFEFE" d="M230.567,275.923c4.634-3.386,9.317-1.942,14.004-0.146
                    c3.862,1.618,7.917,2.616,12.045,1.926c3.065-0.512,4.242,0.942,5.128,3.315c0.881,1.818-0.407,3.951,0.831,5.717
                    c0.229,0.247,0.512,0.348,0.846,0.304c0.954,2.305,0.975,4.607-0.012,6.909l0.049-0.094c-0.576,1.418-0.718,3.058-2.079,4.076
                    c-2.852,1.937-2.223,5.528-3.829,8.058c-10.658,12.183-22.736,10.036-28.462-5.123c-0.548-1.45-1.613-2.528-2.163-3.844
                    c-1.519-3.635-4.027-7.059-0.158-11.234C229.076,283.293,227.551,278.597,230.567,275.923z"/>
				<path fill-rule="evenodd" clip-rule="evenodd" fill="#FAF9FA" d="M244.355,326.348c-4.086,0.139-7.628-1.205-10.59-3.779
                    c-0.985-0.855-3.435-1.527-1.698-3.795c1.208-1.576,2.265-2.247,4.525-1.178c5.184,2.451,10.693,2.553,15.829-0.171
                    c2.445-1.297,3.336,0.133,4.391,1.535c1.448,1.928-0.664,2.647-1.588,3.437C252.109,325.063,248.468,326.551,244.355,326.348z"/>
				<path fill-rule="evenodd" clip-rule="evenodd" :fill="signerColor" d="M263.409,293.948c-0.007-2.304,0.91-4.604,0.012-6.909
                    C265.29,289.346,265.243,291.647,263.409,293.948z"/>
				<path fill-rule="evenodd" clip-rule="evenodd" :fill="signerColor" d="M262.575,286.735c-1.953-1.662-0.281-3.851-0.831-5.717
                    C263.274,282.742,262.314,284.827,262.575,286.735z"/>
				<path fill-rule="evenodd" clip-rule="evenodd" :fill="signerColor" d="M261.379,297.931c0.693-1.358,1.386-2.718,2.079-4.076
                    C263.688,295.684,263.484,297.292,261.379,297.931z"/>
			</g>
			<g
				id="account-2"
				class="account"
				@click="accountClick(recipient)"
			>
				<title> {{ recipient }} </title>
				<rect
					x="639.146"
					y="347.646"
					fill-rule="evenodd"
					clip-rule="evenodd"
					fill="none"
					width="207.333"
					height="23.667"
				/>
				<text
					x="745"
					y="362.8457"
					text-anchor="middle"
					class="account-text"
					:title="recipient"
				>
					{{ trunc(recipient) }}
				</text>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					:fill="recipientColor"
					d="M721.656,269.897c0.11-2.393,1.469-4.188,2.864-5.965
                    c3.048-1.255,3.729,1.313,4.431,3.09c1.125,2.856,2.42,5.67,3.176,8.668c-1.665,4.138-1.7,8.836-4.374,12.65
                    c-0.821,1.172-0.687,2.651-0.132,3.862c2.345,5.117,3.962,10.643,7.713,15.007c5.933,6.903,13.437,7.12,19.964,0.701
                    c1.067-1.049,1.933-2.298,3.157-3.203c4.781-2.331,5.483-2.001,5.302,2.479c-3.134,6.533-3.136,6.54,3.791,8.697
                    c5.604,1.746,10.847,4.162,15.436,7.91c2.636,2.153,4.714,4.73,6.01,7.836c2.767,6.629,0.91,9.446-6.062,9.446
                    c-25.46,0.001-50.919,0.005-76.379-0.003c-5.917-0.002-6.961-1.378-5.369-7.242c1.377-5.071,4.73-8.7,8.907-11.649
                    c4.818-3.403,10.195-5.654,15.89-6.994c3.9-0.917,3.877-2.855,2.286-5.771c-1.985-3.637-3.917-7.306-5.762-11.016
                    c-1.813-3.646-2.879-7.571-1.92-11.578c0.956-3.998-1.518-7.904,0.072-11.818C721.94,273.488,720.543,271.447,721.656,269.897z"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					:fill="recipientColor"
					d="M763.757,307.188c-0.404-5.872-3.108-1.998-5.086-1.199
                    c-1.204-3.42,0.808-5.817,2.62-8.278c1.204-0.877,2.237-1.888,2.553-3.435c0.103-0.405,0.229-0.802,0.349-1.199
                    c0.44-1.873,0.59-3.707-0.636-5.387c-0.26-0.368-0.465-0.76-0.636-1.175c-0.632-1.697-0.229-3.663-1.401-5.21
                    c-1.313-2.182-3.421-2.083-5.596-2.151c-3.911-0.125-7.841-0.393-10.932-3.333c-2.035-3.97-4.009-7.979-4.421-12.496
                    c-0.549-6.004,3.39-9.86,9.502-9.444c14.104,2.032,22.724,15.274,19.107,29.276c-0.127,0.493,0.353,1.144,0.55,1.721
                    c0.715,3.103,0.664,6.207,0.028,9.314C767.759,298.523,765.758,302.855,763.757,307.188z"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					:fill="recipientColor"
					d="M750.073,253.88c-6.989,0.567-10.491,6.707-6.721,15.414
                    c0.913,2.108,2.521,3.977,2.34,6.483c-4.664,0.345-9.343-0.588-14.004,0.146c-1.74-2.197-2.747-4.654-3.429-7.409
                    c-0.459-1.855-1.019-4.28-3.739-4.581C731.366,255.119,741.234,251.236,750.073,253.88z"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					:fill="recipientColor"
					d="M769.759,294.191c-0.01-3.105-0.019-6.21-0.028-9.314
                    C771.572,287.976,771.213,291.082,769.759,294.191z"
				/>
				<path fill-rule="evenodd" clip-rule="evenodd" :fill="recipientColor"  d="M721.656,269.897c-0.188,1.731,0.723,3.677-0.999,5.107
                    C720.468,273.201,720.45,271.429,721.656,269.897z"/>
				<path fill-rule="evenodd" clip-rule="evenodd" fill="#FEFEFE" d="M731.688,275.923c4.634-3.386,9.317-1.942,14.004-0.146
                    c3.862,1.618,7.917,2.616,12.045,1.926c3.065-0.512,4.242,0.942,5.128,3.315c0.881,1.818-0.407,3.951,0.831,5.717
                    c0.229,0.247,0.512,0.348,0.846,0.304c0.954,2.305,0.975,4.607-0.012,6.909l0.049-0.094c-0.576,1.418-0.718,3.058-2.079,4.076
                    c-2.852,1.937-2.223,5.528-3.829,8.058c-10.658,12.183-22.736,10.036-28.462-5.123c-0.548-1.45-1.613-2.528-2.163-3.844
                    c-1.519-3.635-4.027-7.059-0.158-11.234C730.197,283.293,728.672,278.597,731.688,275.923z"/>
				<path fill-rule="evenodd" clip-rule="evenodd" fill="#FAF9FA" d="M745.477,326.348c-4.086,0.139-7.628-1.205-10.59-3.779
                    c-0.985-0.855-3.435-1.527-1.698-3.795c1.208-1.576,2.265-2.247,4.525-1.178c5.184,2.451,10.693,2.553,15.829-0.171
                    c2.445-1.297,3.336,0.133,4.391,1.535c1.448,1.928-0.664,2.647-1.588,3.437C753.23,325.063,749.589,326.551,745.477,326.348z"/>
				<path fill-rule="evenodd" clip-rule="evenodd" :fill="recipientColor"  d="M764.53,293.948c-0.007-2.304,0.91-4.604,0.012-6.909
                    C766.411,289.346,766.364,291.647,764.53,293.948z"/>
				<path fill-rule="evenodd" clip-rule="evenodd" :fill="recipientColor"  d="M763.696,286.735c-1.953-1.662-0.281-3.851-0.831-5.717
                    C764.396,282.742,763.436,284.827,763.696,286.735z"/>
				<path fill-rule="evenodd" clip-rule="evenodd" :fill="recipientColor"  d="M762.5,297.931c0.693-1.358,1.386-2.718,2.079-4.076
                    C764.809,295.684,764.605,297.292,762.5,297.931z"/>
			</g>
			<g id="arrow">
				<g>
					<line
						fill="none"
						class="arrow-stroke"
						stroke-width="5"
						stroke-miterlimit="10"
						x1="350"
						y1="318.5"
						x2="617"
						y2="318.5"
					/>
					<g>
						<polygon
							points="610.177,327.628 614.267,318 610.177,308.372 633,318 "
							class="arrow"
						/>
					</g>
					<g id="icons">
						<!--<foreignObject class="circle-icon" x="446" y="318" width="100" height="100">
                            <div style="border:1px green solid">I'm a div inside a SVG.</div>
                        </foreignObject>-->
						<circle id="icon-3" v-if="hasMessage" fill="#FFA82D" cx="446.875" cy="318.5" r="17.25">
							<title> {{ mosaicList }} </title>
						</circle>
						<circle id="icon-2" v-if="hasMosaic" fill="#3085FF" cx="484.875" cy="318.5" r="17.25"/>
						<circle id="icon-1" v-if="hasNativeMosaic" fill="#EC33FF" cx="522.875" cy="318.5" r="17.25"/>
					</g>
				</g>

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
				</text>
			</g>
		</svg>
	</div>
</template>

<script>
import helper from '../helper';
import Constants from '../config/constants';
export default {
	props: {
		message: {
			type: String,
			default: 'Message'
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
			default: () => [
				{ name: 'symbol.xym', amount: 228 },
				{ name: '072031D75989B881', amount: 1 },
				{ name: '6D1B935676E3659D', amount: 2 }
			]
		}
	},

	computed: {
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
			return this.mosaics.find(mosaic => mosaic.mosaicId === Constants.NetworkConfig.NATIVE_MOSAIC_HEX);
		},

		mosaicList() {
			return this.mosaics.filter(mosaic => mosaic.mosaicId !== Constants.NetworkConfig.NATIVE_MOSAIC_HEX);
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

		signerColor() {
			return this.getColor(this.signer);
		},

		recipientColor() {
			return this.getColor(this.recipient);
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
