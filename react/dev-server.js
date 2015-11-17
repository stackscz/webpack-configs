var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var WebpackConfig = require('webpack-config');
var here = require('../utils/here');

var rmdir = require('rimraf');
var WebpackDevServer = require('webpack-dev-server');

var port = 8080;
var ip = '127.0.0.1';


var publicPath = '/';

var entry = require('../utils/generateEntryPoints')(true);

var devConfig = {};
devConfig[path.join(__dirname, './dev')] = function (config) {
	_.each(config.entry, function (entry, key) {
		if (_.isArray(entry)) {
			config.entry[key].unshift('webpack/hot/only-dev-server');
			config.entry[key].unshift('webpack-dev-server/client?http://' + ip + ':' + port);
		}
	});

	_.find(config.module.loaders, {test: /\.(js|jsx)$/}).loaders.unshift('react-hot');


	return config;
};

var config = module.exports = new WebpackConfig().extend(devConfig).merge({
	entry: entry,
	//cache: true,
	//devtool: 'eval',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
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
//
//console.log(config.module.loaders);
//process.exit();

// cleanup build directory
rmdir(config.output.path, function (error) {
	if (error) {
		console.error(error);
		return;
	}

	new WebpackDevServer(webpack(config), {
		contentBase: here('public'),
		historyApiFallback: true,
		hot: true,
		inline: true,
		stats: {colors: true},
		port: port,
		publicPath: publicPath,
		noInfo: false
	}).listen(port, ip, function (err) {
			if (err) {
				return console.log(err);
			}

			console.log('Listening at ' + ip + ':' + port);
		});
});


//, {
//	publicPath: config.output.publicPath,
//		historyApiFallback: true,
//		contentBase: __dirname + '/assets/',
//		hot: true,
//		inline: true,
//		stats: {colors: true}
//}