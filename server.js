const fs = require('fs');
const express = require('express');
const expressWs = require('express-ws');
const WebSocket = require('websocket').w3cwebsocket;
const Axios = require('axios');
const Logger = require('./logger');
const app = express();

const PORT = 4000;
const CONFIG_ROUTE = '/config';
const DEFAULT_CONFIG_PATH = '/src/config/default.json';
const STATIC_FOLDER = '/www';
const INDEX_HTML = '/index.html';

const logger = {
	http: Logger.getLogger('HTTP'),
	ws: Logger.getLogger('WebSocket'),
	listener: Logger.getLogger('Listener'),
	server: Logger.getLogger('Server'),
};

expressWs(app);
app.use(express.json());


// Set server routes

const setRootRoute = (server) => {
	server.get('/', (req, res, next) => {
		req.params[0] = INDEX_HTML;
		next();
	})
}

const setConfigRoute = (server, config) => {
	server.get(CONFIG_ROUTE, (req, res) => {
		res.send(config);
	})
}

const setNodeHttpRoutes = (server, nodeUrl) => {
	server.all(`/connect/${nodeUrl}/*`, async (req, res, next) => {
		const url = `${nodeUrl}/${req.params[0]}`;
		let origin;
		
		logger.http.info(req.method + ' reqest: ' + req.originalUrl);

		try {
			origin = new URL(req.originalUrl.replace('/connect/', '')).origin;
		}
		catch(e) {
			logger.http.error(`Invalid url "${req.originalUrl}": ${e.message}`);
		}

		if (nodeUrl !== origin)
			return res.status(400).send(`Invalid URL "${origin}"`);

		try {
			const options = {
				method: req.method.toLowerCase(),
				data: req.method === 'POST' ? req.body : void 0,
				params: req.method === 'GET' ? req.query : void 0,
				url
			};

			const response = await Axios(options);
			res.send(response.data);
		}
		catch(e) {
			if (e.response)
				res.status(e.response.status ? e.response.status : 500).send(e.response.message);
			else {
				logger.http.error(`Request failed: ${e.message}`);
				res.status(500).send(e.message);
			}
		}
	})
}

const setNodeWsRoutes = (server, nodeUrl) => {
	server.ws(`/connect/${nodeUrl}/ws`, (wsServer) => {
		const url = nodeUrl.replace('http', 'ws') + '/ws';
		let nodeListener = new WebSocket(url);

		logger.ws.info('New connection');

		nodeListener.onopen = () => {
			logger.listener.info('Connected to: ' + url);
		};

		nodeListener.onmessage = (event) => {
			logger.listener.info('Message received: ' + ('' + event.data).slice(0, 128) + '...')
			wsServer.send(event.data);
		};

		nodeListener.onclose = (event) => {
			if (event.wasClean) 
				logger.listener.info(`Connection closed clean. [${event.code}]:  ${event.reason}`);
			else
				logger.listener.error(`Connection lost. [${event.code}]:  ${event.reason}`);
		
			wsServer.close();
		};

		nodeListener.onerror = (error) => {
			logger.listener.error('Error occured: ' + error.message);
		};

		wsServer.on('error', err => {
			logger.ws.error('Error occured: ' + err)
		});

		wsServer.on('message', msg => {
			logger.ws.info('Message received: ' + ('' + msg).slice(0, 128) + '...');
			nodeListener.send(msg);
		});

		wsServer.on('close', (e) => {
			logger.ws.info('Connection closed: ' + e);
			nodeListener.close();
			nodeListener = undefined;
		});
	});
}

const setStaticHttpRoutes = (server) => {
	server.all('/*', async (req, res, next) => {
		const route = '/' + req.params[0];
		if (route.length > 256)
			return res.status(400).send('Request too long');
		
		readFileByRoute(route,
			data => res.end(data),
			() => {
				readFileByRoute(INDEX_HTML,
					data => res.end(data),
					err => res.status(404).send(err),
				);
			},
		);
	})
}


// Read static files

const readFileByRoute = (route, callback, errCallback) => {
	fs.readFile(__dirname + STATIC_FOLDER + route, (err, data) => {
		if (err) {
			if(typeof errCallback === 'function')
				errCallback(err);
		}
		else
			if(typeof callback === 'function')
				callback(data);
	});
};


// Get config from ENV and merge with default config json file

const readConfig = (callback) => {
	const ENV = process.env;

	fs.readFile(__dirname + DEFAULT_CONFIG_PATH, (err, data) => {
		if (err)  {
			logger.server.error('Failed to read default config. ' + err);
			throw Error('Failed to read default config. ' + err);
		}
		else {
			const defaultConfig = JSON.parse(data);
			const parsedENV = {};

			Object.keys(ENV).forEach(key => {
				try {
					if (defaultConfig[key]) {
						parsedENV[key] = JSON.parse(ENV[key]);
					}
				}
				catch(e) {
					parsedENV[key] = ENV[key];
				}
			});

			const mergedConfig = {
				...defaultConfig,
				...parsedENV
			};

			callback(mergedConfig);
		}
	});
};


// Set all routes and start server

const startServer = config => {
	setRootRoute(app);
	setConfigRoute(app, config);
	config.peersApi.nodes.forEach(nodeUrl => { setNodeWsRoutes(app, nodeUrl); });
	config.peersApi.nodes.forEach(nodeUrl => { setNodeHttpRoutes(app, nodeUrl); });
	setStaticHttpRoutes(app);

	app.listen(PORT, () => {
		logger.server.info('Server is running on port: ' + PORT);
	})
};


readConfig(startServer);
