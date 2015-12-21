var path = require('path');
var webpack = require('webpack');
var WebpackConfig = require('webpack-config');
var here = require('../utils/here');

module.exports = new WebpackConfig().extend(path.join(__dirname, './prod')).merge({
	// The configuration for the server-side rendering
	name: "server-side rendering",
	//entry: "./server/page.js",
	target: "node",
	output: {
		path: here('./lib/server'),
		libraryTarget: "commonjs2"
	},
	externals: /^[a-z\-0-9]+$/,
	//module: {
	//	loaders: commonLoaders.concat([
	//		{ test: /\.css$/,  loader: path.join(__dirname, "server", "style-collector") + "!css-loader" },
	//	])
	//}
});

//console.log(module.exports.plugins);
//process.exit();

