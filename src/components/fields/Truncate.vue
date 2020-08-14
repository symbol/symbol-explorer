<template>
	<div>
		<div class="d-none d-md-block">
			<slot />
		</div>
		<div class="truncate-mobile d-block d-md-none">
			<span><slot /></span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.truncate-mobile {
    span {
        white-space: nowrap;
        overflow: hidden;
        display: inline-block;
    }

    span:first-child {
        width: 70px;
        text-overflow: ellipsis;
        -webkit-mask-image: linear-gradient(to left, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1));
        -webkit-mask-size: 100% 100%;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-position: left top;
    }
}
</style>
