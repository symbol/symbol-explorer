<template>
	<div>
		<div class="page_con">
			<div class="container">
				<div class="content">
					<h1>404</h1>
					<blockquote>That's a Four-Oh-Four.</blockquote>
					<router-link v-bind:to="'/'">Take me home.</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.content {
    max-width: 740px;
    margin: 0 auto;
    padding: 2rem 2.5rem;
}

.content h1 {
    padding-top: 4.6rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    font-size: 40px;
}

blockquote {
    font-size: 1.2rem;
    color: #999;
    border-left: 0.25rem solid #dfe2e5;
    margin-left: 0;
    padding-left: 1rem;
}

a {
    color: #84accb;
    font-weight: bold;
    letter-spacing: 1px;
    text-decoration: none;
}
</style>
