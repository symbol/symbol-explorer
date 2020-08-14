<template>
	<b-modal
		:id="id"
		:title="title"
		centered
		no-close-on-esc
		hide-footer
		scrollable
		size="lg"
		class="ex-modal"
		header-text-variant="title"
	>
		<template v-slot:default>
			<slot name="body" />
		</template>
	</b-modal>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: ''
		},
		id: {
			type: String,
			required: true
		}
	}
};
</script>
