<template>
	<div class="pagination-wrapper">
		<div v-if="!canFetchPrevious && !canFetchNext">
			<b-button-group>
				<b-button variant="outline-info" size="sm" disabled>
					<IconArrowLeft />
				</b-button>
				<b-button variant="outline-info" size="sm" disabled>
					<IconArrowRight />
				</b-button>
			</b-button-group>
		</div>
		<ButtonMore v-else-if="!canFetchPrevious" @click="nextPage">{{getNameByKey('more')}}</ButtonMore>
		<ButtonLess v-else-if="!canFetchNext" @click="previousPage">{{getNameByKey('less')}}</ButtonLess>
		<div v-else :nextPageAction="nextPageAction" :previousPageAction="previousPageAction">
			<b-button-group>
				<b-button variant="outline-info" size="sm" @click="previousPage">
					<IconArrowLeft />
				</b-button>
				<b-button variant="outline-info" size="sm" @click="nextPage">
					<IconArrowRight />
				</b-button>
			</b-button-group>
		</div>
	</div>
</template>

<script>
import ButtonLess from './ButtonLess.vue';
import ButtonMore from './ButtonMore.vue';
import IconArrowLeft from 'vue-material-design-icons/ArrowLeft.vue';
import IconArrowRight from 'vue-material-design-icons/ArrowRight.vue';

export default {
	components: {
		IconArrowLeft,
		IconArrowRight,
		ButtonLess,
		ButtonMore
	},

	props: {
		canFetchPrevious: {
			type: Boolean,
			required: true
		},

		canFetchNext: {
			type: Boolean,
			required: true
		},

		nextPageAction: {
			type: String,
			required: false
		},

		previousPageAction: {
			type: String,
			required: false
		},

		goUp: {
			type: Boolean,
			required: false,
			default: true
		}
	},

	methods: {
		nextPage() {
			if (this.nextPageAction)
				this.$store.dispatch(this.nextPageAction);
			this.$emit('next');
			if (this.goUp)
				this.goToTop();
		},

		previousPage() {
			if (this.previousPageAction)
				this.$store.dispatch(this.previousPageAction);
			this.$emit('previous');
			if (this.goUp)
				this.goToTop();
		},

		goToTop() {
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		},

		getNameByKey(e) {
			return this.$store.getters['ui/getNameByKey'](e);
		}
	}
};
</script>

<style lang="scss" scoped>
.disabled {
    cursor: not-allowed;
    color: gray;
}

.page-item {
    cursor: pointer;
}

.pagination-wrapper {
    float: right;

    .pagination-arrow {
        justify-content: center;
        flex-direction: column;
        display: flex;
        height: 22px;
    }
}
</style>
