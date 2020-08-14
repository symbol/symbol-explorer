/*
 *
 * Copyright (c) 2019-present for NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License ");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import Vue from 'vue';
import Router from 'vue-router';
import PageAssembler from './views/PageAssembler.vue';
import pages from './config/pages';
Vue.use(Router);

const pagesRoutes = pages.map(page => ({
	...page,
	meta: {
		...page.meta,
		storeNamespaces: page.props?.storeNamespaces || []
	},
	component: PageAssembler
}));

const routerConfig = {
	mode: 'history',
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
	routes: [
		...pagesRoutes,
		{
			path: '/',
			name: 'home',
			meta: {
				group: 'page',
				keepAliveGoTo: []
			},
			component: () =>
				import('./views/Home.vue')
		},
		{
			path: '/statistics',
			name: 'statistics',
			component: () =>
				import('./views/Statistics.vue')
		},
		{
			path: '/terms',
			name: 'terms',
			meta: {
				group: 'page',
				keepAliveGoTo: []
			},
			component: () =>
				import('./views/Terms.vue')
		},
		{
			path: '/privacy',
			name: 'privacy',
			meta: {
				group: 'page',
				keepAliveGoTo: []
			},
			component: () =>
				import('./views/Privacy.vue')
		},
		{
			path: '*',
			name: '404',
			meta: {
				group: 'page',
				keepAliveGoTo: []
			},
			component: () => import('./views/NotFound.vue')
		}
	]
};

export default new Router(routerConfig);

// const router =  new Router(routerConfig);
// router.beforeEach((to, from, next) => {
//   console.log(from, to);
//   if(to.fullPath !== from.fullPath) {

//     next()
//   }
// })
