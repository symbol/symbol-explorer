<template>
	<div>
		<ArrowCollapseDown v-if="value === 'incoming'" class="incoming"/>
		<ArrowExpandUp v-if="value === 'outgoing'" class="outgoing"/>
	</div>
</template>

<script>
import ArrowCollapseDown from 'vue-material-design-icons/ArrowCollapseDown.vue';
import ArrowExpandUp from 'vue-material-design-icons/ArrowExpandUp.vue';
export default {
	components: {
		ArrowCollapseDown,
		ArrowExpandUp
	},

	props: {
		value: {
			type: String,
			default: ''
		}
	}
};
</script>

<style lang="scss" scoped>
.incoming {
    color: green;
}

.outgoing {
    color: red;
}
</style>
