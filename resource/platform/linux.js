'use strict';
/**
 * External Dependencies
 */
var exec = require( 'child_process' ).execSync;
var path = require( 'path' );
var spellchecker = require( '../lib/spellchecker' )
var fs = require( 'fs-extra' );

/**
 * Internal dependencies
 */
var builder = require( '../lib/tools' );

function cleanBuild( appPath, buildOpts ) {
	var icon, tar;
	var calypsoModules = path.join( appPath, 'resources', 'app', 'calypso', 'node_modules' );

	console.log( 'Cleaning the Linux build' );

	icon = 'cp ./resource/app-icon/icon_128x128@2x.png ' + appPath + '/WordPress.png';
	tar = 'tar -zcf ' + appPath + '.' + buildOpts.appVersion + '.tar.gz -C ' + buildOpts.out + ' ' + path.basename( appPath );

	exec( icon );
	exec( icon.replace( /ia32/g, 'x64' ) );
	exec( tar );
	exec( tar.replace( /ia32/g, 'x64' ) );

	console.log( ' - Removing default app' );
	builder.rmdir( path.join( appPath, 'resources', 'default_app' ) );

	console.log( ' - Copying pruned node_modules' );

	fs.removeSync( calypsoModules );
	fs.copySync( path.join( appPath, '..', 'node_modules' ), calypsoModules );
}

module.exports = {
	cleaner: cleanBuild,
	beforeBuild: spellchecker.bind( null, 'http://automattic.github.io/wordpress-desktop/deps/spellchecker-linux64-v1.0.2-electron-v0.35.4.zip' )
}
