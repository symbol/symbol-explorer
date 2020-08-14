<template>
	<b-button
		exact
		active-class="active"
		class="btn-green noselect pointer"
		@click="$emit('click')"
	>
		<ArrowLeft class="more-icon" />
		<span><slot/></span>
	</b-button>
</template>

<script>
import ArrowLeft from 'vue-material-design-icons/ArrowLeft.vue';
export default {
	components: {
		ArrowLeft
	}
};
</script>

<style lang="scss" scoped>
.more-icon {
    font-size: 15px;
    margin-right: 5px;
    margin-top: 1px;
}

.btn-green {
    border: 1px solid var(--info);
    border-radius: 4px;
    color: var(--info);
    font-size: 12px;
    padding: 5px 12px 5px 12px;
    line-height: 1.6;
    position: relative;
    background: transparent;
}

.btn-green i {
    font-size: 24px;
    line-height: 0;
    position: relative;
    top: -4px;
    right: -4px;
    height: 20px;
}

.btn-green * {
    display: inline-block;
    float: left;
    position: relative;
    z-index: 1;
}

.btn-green::before {
    content: '';
    background: var(--primary);
    width: 0;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    transition: all 0.4s cubic-bezier(0, 0, 0.23, 1);
}

.btn-green:hover {
    color: #fff;
}

.btn-green:hover::before {
    width: 100%;
}

.pointer {
    cursor: pointer;
}
</style>
