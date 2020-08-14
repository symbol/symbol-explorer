<template>
	<b-popover :target="target" placement="bottom" triggers="hover">
		<template v-slot:title>{{ title }}</template>
		<b-list-group>
			<b-list-group-item
				v-for="(namespace, index) in namespaces"
				class="d-flex justify-content-between align-items-center namespace-list"
				:key="'nlp'+namespace.namespaceId + index"
				:title="namespace.namespaceName"
			>
				<NamespaceIcon
					hideCaption
					:width="32"
					:height="32"
					:namespace="namespace"
					:key="'namespace'+namespace.namespaceId+index"
				/>
				{{ truncString(namespace.namespaceName, 8) }}
				<i />
			</b-list-group-item>
		</b-list-group>
	</b-popover>
</template>

<script>
import NamespaceIcon from '../graphics/NamespaceIcon.vue';
import GraphicComponent from './GraphicComponent.vue';

export default {
	extends: GraphicComponent,

	components: {
		NamespaceIcon
	},

	props: {
		namespaces: {
			type: Array,
			default: () => []
		},

		title: {
			type: String,
			default: 'Namespaces'
		},

		target: {
			type: String,
			required: true
		}
	}
};
</script>

<style lang="scss" scoped>
.namespace-list {
    min-width: 250px;
}
</style>
