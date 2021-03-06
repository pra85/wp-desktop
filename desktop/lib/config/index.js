'use strict';

const pkg = require( '../../../package.json' );
let config = require( '../../config.json' );

// Merge in some details from package.json
config.name = pkg.productName;
config.description = 'WordPress Desktop';
config.version = pkg.version;
config.author = pkg.author;

config.isRelease = function() {
	return this.build === 'release';
};

config.isUpdater = function() {
	return this.build === 'updater';
};

config.isMacAppStore = function() {
	return this.build === 'mac-app-store';
};

config.isBeta = function() {
	return this.build === 'beta';
};

module.exports = config;
