const winston = require('winston');
const ALL_LOG_MAX_SIZE = 100000000;
const ERROR_LOG_MAX_SIZE = 100000000;
const ALL_LOG_FILENAME = 'server.log';
const ERROR_LOG_FILENAME = 'error.log';

const logTemplate = (info) => {
	return `${info.timestamp} ${info.level}: [${info.label}] ${info.message}`;
};

const getLogger = (name) => {
	return winston.createLogger({
		format: winston.format.combine(winston.format.label({ label: name })),
		transports: [
			new winston.transports.Console({
				format: winston.format.combine(winston.format.timestamp(), winston.format.cli(), winston.format.printf(logTemplate))
			}),
			new winston.transports.File({
				format: winston.format.combine(winston.format.timestamp(), winston.format.printf(logTemplate)),
				filename: ALL_LOG_FILENAME,
				maxsize: ALL_LOG_MAX_SIZE
			}),
			new winston.transports.File({
				format: winston.format.combine(winston.format.timestamp(), winston.format.printf(logTemplate)),
				level: 'error',
				filename: ERROR_LOG_FILENAME,
				maxsize: ERROR_LOG_MAX_SIZE
			})
		]
	});
};

module.exports = { getLogger };
