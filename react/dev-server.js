var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var WebpackConfig = require('webpack-config');
var here = require('../utils/here');
//var rmdir = require('rimraf');
//var WebpackDevServer = require('webpack-dev-server');

var port = 8080;
var ip = '127.0.0.1';


var publicPath = '/';
var contentBase = here();
try {
	fs.statSync(here('examples'));
	contentBase = here('examples');
} catch (e) {
}
try {
	fs.statSync(here('public'));
	contentBase = here('public');
} catch (e) {
}


var devConfig = {};
devConfig[path.join(__dirname, './base')] = function (config) {
	_.each(config.entry, function (entry, key) {
		if (_.isArray(entry)) {
			config.entry[key].unshift('webpack/hot/only-dev-server');
			config.entry[key].unshift('webpack-dev-server/client?http://' + ip + ':' + port);
		}
	});

	config.module.loaders.unshift({
		test: /\.(js|jsx)$/,
		loader: 'react-hot',
		include: [here('src'), here('examples'), here('apps')]
	});
	//_.find(config.module.loaders, {test: /\.(js|jsx)$/}).loaders.unshift('react-hot');



	return config;
};

var config = module.exports = new WebpackConfig().extend(devConfig).merge({
	//entry: entry,
	//cache: true,
	//devtool: 'eval',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	output: {
		publicPath: 'http://127.0.0.1:8080/'
	},
	module: {
		loaders: [
			//{
			//	test: /\.(js|jsx)$/,
			//	loader: 'react-hot',
			//	include: [here('src'), here('examples')]
			//}
		]
	}
});


// cleanup build directory
//rmdir(config.output.path, function (error) {
//	if (error) {
//		console.error(error);
//		return;
//	}
//
//	new WebpackDevServer(webpack(config)).listen(port, ip, function (err) {
//		if (err) {
//			return console.log(err);
//		}
//
//		console.log('Listening at ' + ip + ':' + port);
//	});
//});

//console.log(config);
//process.exit();
