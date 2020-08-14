import Vue from 'vue';

export { default as Filter } from './Filter';
export { default as Timeline } from './Timeline';
export { default as DataSet } from './DataSet';
export { default as Pagination } from './Pagination';

export const getStateFromManagers = (managers) => {
	let state = {};

	for (const manager of managers)
		state[manager.name] = manager;
	return state;
};

export const getGettersFromManagers = (managers) => {
	let getters = {};

	for (const manager of managers)
		getters[manager.name] = (state) => state[manager.name];
	return getters;
};

export const getMutationsFromManagers = (managers) => {
	let mutations = {};

	for (const manager of managers)
		mutations[manager.name] = (state, payload) => Vue.set(state, manager.name, payload);
	return mutations;
};

export const getActionsFromManagers = (managers) => {
	let actions = {};

	for (const manager of managers)
		actions[manager.name] = ({ commit }, payload) => commit(manager.name, payload);
	return actions;
};
