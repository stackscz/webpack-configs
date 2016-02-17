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
			if (!config.entry) {
				config.entry = {};
			}
			config.entry[outputPath] = [moduleName];
		} catch (e) {
		}
	});

	return config;
};


module.exports = new WebpackConfig()
	.merge({
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
				//react: here('node_modules/react'),
				//config: join(srcPath, 'config')
			}
		},
		output: {
			path: here('./lib'),
			filename: '[name].js',
			publicPath: '/'
		},
		module: {
			preLoaders: [
				{
					test: /\/(components|containers)\/.+\.(js|jsx)$/,
					loader: 'baggage?index.less',
					include: [here('src'), here('examples'), here('apps')]
				}
			],
			loaders: [
				{
					test: /\.(js|jsx)$/,
					loader: 'babel',
					include: [here('src'), here('examples'), here('apps')],
					query: {
						presets: ['es2015', 'react', 'stage-0'],
						plugins: ['transform-decorators-legacy'] //, '@stackscz/babel-plugin-async-route-component'
					}
				}
			]
		},
		eslint: {
			configFile: path.join(__dirname, '.eslintrc.js')
		}
	})
	.extend(config);

//console.log(module.exports.module.loaders);
//process.exit();
