<template>
	<Dropdown
		:options="options"
		:dark="true"
		:border="false"
		:value="currentLanguage"
		@change="setLanguage"
	/>
</template>

<script>
import Dropdown from './Dropdown.vue';
export default {
	components: {
		Dropdown
	},

	computed: {
		languageList() {
			return this.$store.getters['ui/languages'] || [];
		},

		options() {
			let options = {};

			this.languageList.forEach(lang => {
				options[lang] = lang;
			}
			);
			return options;
		},

		currentLanguage() {
			return 'Language: ' + this.$store.getters['ui/currentLanguage'];
		}
	},

	methods: {
		setLanguage(language) {
			this.$store.dispatch('ui/changeLanguage', language);
		}
	}
};
</script>

<style lang="scss" scoped>
.dropdown-toggle {
    border: 0;
    color: #acc5ce;
}

.dropdown-menu {
    border: 0;
}

.node-selector {
    z-index: 9000;
}

.node-selector-menu {
    background: #3d7397c4;
}

.node-selector-item {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
</style>
