var path = require('path');
var join = path.join;
var webpack = require('webpack');
var WebpackConfig = require('webpack-config');
//var packageConfig = require('./package.json');
var here = require('../utils/here');


var publicPath = '/';
var srcPath = here('src');

module.exports = new WebpackConfig().extend(join(__dirname, '../common/base')).merge({
	entry: require('../utils/generateEntryPoints')(),
	resolve: {
		extensions: ['', '.js', '.jsx'],
		alias: {
			actions: join(srcPath, 'actions'),
			reducers: join(srcPath, 'reducers'),
			components: join(srcPath, 'components'),
			containers: join(srcPath, 'containers'),
			store: join(srcPath, 'store'),
			styles: join(srcPath, 'styles')
			//config: srcPath + '/config/' + process.env.REACT_WEBPACK_ENV
		}
	},
	output: {
		path: here('dist'),
		filename: '[name].js',
		publicPath: publicPath
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
				loaders: ['babel?cacheDirectory=true&presets[]=es2015&presets[]=react'],
				include: [here('src'), here('examples')],
			}
		]
	}
});
