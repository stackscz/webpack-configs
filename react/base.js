var _ = require('lodash');
var path = require('path');
var join = path.join;
var webpack = require('webpack');
var WebpackConfig = require('webpack-config');
var here = require('../utils/here');

var srcPath = here('src');

var config = {};
config[join(__dirname, '../common/base')] = function (config) {

	var knownModuleSpaces = {
		'examples/index': './examples',
		'app/index': './public',
		index: './src'
	};
	_.each(knownModuleSpaces, function (moduleName, outputPath) {
		var modulePath = here(moduleName);
		try {
			require.resolve(modulePath);
			console.error('module space "' + modulePath + '" present!');
			if(!config.entry) {
				config.entry = {};
			}
			config.entry[outputPath] = [moduleName];
		} catch (e) {}
	});

	return config;
};


module.exports = new WebpackConfig().extend(config).merge({
	resolve: {
		extensions: ['', '.js', '.jsx'],
		alias: {
			actions: join(srcPath, 'actions'),
			reducers: join(srcPath, 'reducers'),
			components: join(srcPath, 'components'),
			containers: join(srcPath, 'containers'),
			store: join(srcPath, 'store'),
			styles: join(srcPath, 'styles'),
			utils: join(srcPath, 'utils'),
			//config: srcPath + '/config/' + process.env.REACT_WEBPACK_ENV
		}
	},
	output: {
		path: here('./lib'),
		filename: '[name].js',
		//publicPath: '/'
	},
	module: {
		preLoaders: [
			{
				test: /\/(components|containers)\/.+\.(js|jsx)$/,
				loader: 'baggage?index.less'
			}
		],
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loaders: ['babel?cacheDirectory=true&presets[]=es2015&presets[]=react&presets[]=stage-0'],
				include: [here('src'), here('examples')],
			}
		]
	}
});
