const path = require('path');

module.exports = {
	verbose: true,
	setupFiles: ['<rootDir>/__tests__/config/jest.setup.js'],
	rootDir: path.join(__dirname),
	moduleDirectories: ['node_modules', 'src'],
	modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
	transform: {
		'^.+\\.js$': 'babel-jest',
		'^.+\\.vue$': 'vue-jest',
		'.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
	},

	testMatch: [
		'**/__tests__/**/*.spec.js'
	],

	transformIgnorePatterns: ['/node_modules']
};
