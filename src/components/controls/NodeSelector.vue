<template>
	<Dropdown
		:options="options"
		:dark="true"
		right
		:value="currentNode"
		class="node-selector"
		@change="setNode"
	/>
</template>

<script>
import Dropdown from './Dropdown.vue';
export default {
	components: {
		Dropdown
	},

	computed: {
		nodeList() {
			return this.$store.getters['api/nodes'] || [];
		},

		options() {
			let options = {};

			this.nodeList.forEach(node => {
				const hostname = this.getHostname(node);

				options[node.toString()] = hostname;
			});

			return options;
		},

		currentNode() {
			const node = new URL(this.$store.getters['api/currentNode']);
			const hostname = this.getHostname(node);

			return 'Node: ' + hostname;
		}
	},

	methods: {
		async setNode(url) {
			this.$emit('change', url);
			await this.$store.dispatch('api/changeNode', url);
		},

		getHostname(node) {
			const nodeURL = node.href.replace(window.location.origin + '/connect/', '');

			return new URL(nodeURL).hostname;
		}
	}
};
</script>

<style lang="scss">
.node-selector {
    .dropdown-toggle {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 12px;
        max-width: 350px;
        width: 100%;
    }
}
</style>
