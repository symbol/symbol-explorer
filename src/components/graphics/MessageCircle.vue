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
			<linearGradient id="message-circle-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stop-color="RGB(255, 197, 113)" />
				<stop offset="100%" stop-color="RGB(255, 167, 40)" />
			</linearGradient>
		</defs>
		<foreignObject x="446" y="318" width="100" height="100">
			<MessagePopover
				:target="this.id"
				:message="message"
			/>
		</foreignObject>
		<circle
			fill-rule="evenodd"
			clip-rule="evenodd"
			fill="url(#message-circle-gradient)"
			cx="19.115"
			cy="19.094"
			r="17.26"
		/>
		<g>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				fill="#FFFFFF"
				d="M19.251,26.109c-2.859,0-5.718,0-8.576,0
                    c-0.172,0-0.346-0.005-0.519,0c-0.208,0.006-0.447-0.068-0.528-0.203c-0.092-0.15,0.16-0.266,0.273-0.38
                    c2.224-2.231,4.458-4.454,6.676-6.693c0.233-0.235,0.378-0.206,0.606-0.025c0.542,0.43,1.1,0.841,1.654,1.255
                    c0.272,0.202,0.554,0.202,0.827-0.003c0.563-0.424,1.128-0.843,1.681-1.279c0.208-0.167,0.337-0.188,0.546,0.023
                    c2.267,2.284,4.543,4.558,6.824,6.827c0.241,0.239,0.197,0.318-0.104,0.417c-0.16,0.054-0.31,0.06-0.465,0.06
                    C25.181,26.109,22.217,26.109,19.251,26.109z"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				fill="#FFFFFF"
				d="M9.584,12.283c0.284-0.199,0.563-0.225,0.858-0.225
                    c5.876,0.005,11.754,0.005,17.63,0.001c0.282-0.001,0.549,0.024,0.831,0.212c-0.392,0.299-0.775,0.595-1.164,0.885
                    c-2.151,1.604-4.304,3.207-6.455,4.812c-0.544,0.405-1.083,0.817-1.627,1.224c-0.259,0.193-0.544,0.202-0.798,0.015
                    c-1.701-1.264-3.394-2.538-5.091-3.806c-1.321-0.986-2.646-1.968-3.97-2.951C9.726,12.394,9.654,12.335,9.584,12.283z"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				fill="#FFFFFF"
				d="M8.75,19.07c0-1.715-0.001-3.43,0.001-5.145
                    c0.001-0.314,0.028-0.625,0.152-0.922c0.085-0.206,0.191-0.243,0.376-0.102c1.294,0.98,2.591,1.957,3.89,2.932
                    c0.94,0.706,1.871,1.427,2.835,2.1c0.297,0.208,0.172,0.288,0.008,0.451c-1.863,1.858-3.723,3.72-5.584,5.58
                    c-0.403,0.404-0.818,0.8-1.208,1.217c-0.195,0.209-0.264,0.13-0.343-0.08c-0.103-0.274-0.125-0.561-0.126-0.849
                    C8.75,22.526,8.75,20.798,8.75,19.07z"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				fill="#FFFFFF"
				d="M29.749,19.085c0,1.729,0.001,3.456-0.001,5.185
                    c0,0.248-0.027,0.494-0.095,0.736c-0.088,0.315-0.176,0.387-0.444,0.109c-1-1.029-2.024-2.034-3.039-3.05
                    c-1.24-1.24-2.479-2.483-3.723-3.721c-0.167-0.165-0.202-0.224,0.031-0.396c2.251-1.664,4.488-3.348,6.724-5.033
                    c0.205-0.154,0.313-0.119,0.402,0.102c0.115,0.283,0.143,0.583,0.143,0.885C29.75,15.63,29.749,17.357,29.749,19.085z"
			/>
		</g>
		<circle
			:id="this.id"
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
import MessagePopover from './MessagePopover.vue';

export default {
	extends: GraphicComponent,

	components: {
		MessagePopover
	},

	props: {
		message: {
			type: String,
			default: ''
		}
	},

	data() {
		return {
			id: this.getId('message-circle')
		};
	}
};
</script>
