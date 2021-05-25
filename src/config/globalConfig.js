import defaultConfig from './default.json';

const addNodeProxyUrl = nodes => nodes.map(url => window.location.origin + '/connect/' + url);

let globalConfig;

if (window.globalConfig) {
	globalConfig = { ...window.globalConfig };
	globalConfig.peersApi.nodes = addNodeProxyUrl(globalConfig.peersApi.nodes);
}
else
	globalConfig = defaultConfig;

export default globalConfig;
