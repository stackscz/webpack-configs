var path = require('path');
var webpack = require('webpack');
var WebpackConfig = require('webpack-config');
var here = require('../utils/here');

module.exports = new WebpackConfig().merge({
	resolve: {
		//modulesDirectories: [path.join(__dirname, "..", "node_modules")],
		root: path.join(__dirname, "..", "node_modules"),
		//fallback: path.join(__dirname, "..", "node_modules")
	},
	resolveLoader: {
		//root: path.join(__dirname, "..", "node_modules"),
		fallback: path.join(__dirname, "..", "node_modules")
	},
	module: {
		preLoaders: [
			{
				test: /\.(js|jsx)$/,
				include: here('src'),
				loader: 'eslint'
			}
		],
		loaders: [
			{
				test: /\.css$/,
				loader: 'style!css'
			},
			{
				test: /\.sass/,
				loader: 'style!css!sass?outputStyle=expanded&indentedSyntax'
			},
			{
				test: /\.scss/,
				loader: 'style!css!sass?outputStyle=expanded'
			},
			{
				test: /\.less/,
				loader: 'style!css!less'
			},
			{
				test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9\.=\-]+)?$/,
				loader: 'url?limit=32768&name=[hash].[ext]'
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'url?limit=32768&name=[hash].[ext]',
					'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
				]
			},
		]
	},
	eslint: {
		configFile: path.join(__dirname, '../.eslintrc')
	}
});
