<template>
	<b-dropdown
		:variant="variant"
		:text="selectedOptionLabel"
		:size="_size"
		:right="right"
	>
		<b-dropdown-item
			v-for="(el, index) in options"
			class="ex-dropdown"
			:key="'dropdown ' + index"
			@click="onChange(index)"
		>
			<span class="mdi" :class="{[el.icon]: true}"/> {{el.label}}
		</b-dropdown-item>
	</b-dropdown>
</template>

<script>
export default {
	props: {
		options: {
			type: Array,
			default: () => []
		},

		index: {
			type: Number,
			default: 0
		},

		changePageAction: {
			type: String
		},

		dark: {
			type: Boolean,
			default: false
		},

		right: {
			type: Boolean,
			default: false
		},

		border: {
			type: Boolean,
			default: true
		},

		size: {
			type: String,
			default: 'small'
		}
	},

	computed: {
		variant() {
			let variant = '';

			variant = 'outline-';

			if (this.dark === true)
				variant += 'light';
			else
				variant += 'info';

			if (this.border === false)
				variant += ' border-transparent';

			return variant;
		},

		_size() {
			switch (this.size) {
			case 'small': return 'sm';
			case 'medium': return '';
			case 'large': return 'lg';
			}
			return '';
		},

		selectedOptionLabel() {
			if (this.options && this.options[this.index] !== void 0)
				return this.options[this.index].label;
			return this.index;
		}
	},

	methods: {
		onChange(e) {
			this.$emit('change', e);
			if (this.changePageAction)
				this.$store.dispatch(this.changePageAction, e);
		}
	}
};
</script>
