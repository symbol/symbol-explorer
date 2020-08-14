<template>
	<b-popover :target="target" placement="bottom" triggers="hover">
		<template v-slot:title>{{ title }}</template>
		<b-list-group>
			<b-list-group-item
				v-for="(value, key) in data"
				class="d-flex justify-content-between align-items-center table-list"
				:key="'tp' + value + key"
				:title="getTranslation(key) + ': ' + value"
			>
				<span class="key">
					{{ truncString(getTranslation(key), 7) }}:
				</span>
				<span class="value">
					{{ truncString(value, 5) }}
				</span>
			</b-list-group-item>
		</b-list-group>
		<!--<TableInfoView :data="data" />-->
	</b-popover>
</template>

<script>
import GraphicComponent from './GraphicComponent.vue';

export default {
	extends: GraphicComponent,

	props: {
		data: {
			type: Object,
			default: () => ({})
		},

		title: {
			type: String,
			default: 'Table'
		},

		target: {
			type: String,
			required: true
		}
	}
};
</script>

<style lang="scss" scoped>
.table-list {
    min-width: 250px;

    .key {
        color: $table-title-text-color;
        font-weight: bolder;
        font-size: 12px;
        letter-spacing: 1px;
    }

    .value {
        font-size: 12px;
        color: $table-text-color;
    }
}
</style>
