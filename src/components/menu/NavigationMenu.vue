<template>
	<header class="ex-menu" :class="{'ex-menu-fixed': fixed}" ref="DesktopMenu">
		<div class="width-limiter">
			<router-link to="/" :class="{'hide': !fixed}">
				<img src="../../styles/img/logo-w.png" class="menu-logo"/>
			</router-link>
			<router-link
				v-for="item in items"
				:key="'dsktp_mn_'+getNameByKey(item.text)"
				class="ex-menu-item"
				:to="item.to" exact active-class="active"
			>
				<component :is="item.icon" class="menu-icon"/>
				<i :class="item.classname"></i>
				<span>{{getNameByKey(item.text)}}</span>
			</router-link>
		</div>
	</header>
</template>

<script>
import { pageMenu } from '../../config/';
import IconHome from 'vue-material-design-icons/Home.vue';
import IconBlocks from 'vue-material-design-icons/Widgets.vue';
import IconTransactions from 'vue-material-design-icons/Send.vue';
import IconAccounts from 'vue-material-design-icons/Account.vue';
import IconMosaics from 'vue-material-design-icons/CheckboxMultipleBlankCircle.vue';
import IconNodes from 'vue-material-design-icons/VectorTriangle.vue';
import IconNamespaces from 'vue-material-design-icons/Tag.vue';
import IconStatistics from 'vue-material-design-icons/ChartBar.vue';

export default {
	components: {
		IconHome,
		IconBlocks,
		IconTransactions,
		IconAccounts,
		IconMosaics,
		IconNodes,
		IconNamespaces,
		IconStatistics
	},

	mounted() {
		let DesktopMenu = this.$refs.DesktopMenu;

		let offset = DesktopMenu.offsetTop;

		window.onscroll = () => {
			if (window.pageYOffset > offset)
				this.fixed = true;
			else
				this.fixed = false;
		};
	},

	data() {
		return {
			items: pageMenu.items,
			fixed: false,
			scrollListener: {}
		};
	},

	methods: {
		getNameByKey(e) {
			return this.$store.getters['ui/getNameByKey'](e);
		}
	}
};
</script>

<style lang="scss" scoped>
.ex-menu {
    background: linear-gradient(120deg, var(--primary) 0%, var(--secondary) 100%);
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    padding: 0 60px;
    position: relative;

    .width-limiter {
        display: block;
        width: 100%;
        max-width: $navmenu-max-width;
        margin-left: auto;
        margin-right: auto;
    }

    .menu-logo {
        width: 30px;
        margin-right: 15px;
    }

    .ex-menu-item {
        padding: 0 20px;
        color: var(--light);
        text-decoration: none;
        letter-spacing: 1px;
        position: relative;
        transition: all 0.2s ease-in-out;
        width: auto;
        display: inline-block;
        font-size: 13px;
        line-height: 40px;

        .menu-icon {
            margin-right: 10px;
        }
    }

    .ex-menu-item.active::before {
        content: '';
        position: absolute;
        left: 0;
        width: 100%;
        height: 3px;
        background: var(--light);
        transition: all 0.2s ease-in-out;
    }
}

.ex-menu-fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
}

.hide {
    display: none;
}
</style>
