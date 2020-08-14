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
				options[node.toString()] = node.hostname;
			}
			);
			return options;
		},

		currentNode() {
			return 'Node: ' + this.$store.getters['api/currentNodeHostname'];
		}
	},

	methods: {
		async setNode(url) {
			this.$emit('change', url);
			await this.$store.dispatch('api/changeNode', url);
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
