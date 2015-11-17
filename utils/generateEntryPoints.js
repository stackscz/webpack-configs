var _ = require('lodash');
var here = require('../utils/here');

module.exports = function (devServer) {
// check for typical module directories and create entry points
	var knownModuleSpaces = ['./examples', './public', './'];
	var entryPoints = {};
	_.each(knownModuleSpaces, function (moduleName) {
		var modulePath = here(moduleName);
		try {
			require.resolve(modulePath);
			console.error('module space "' + modulePath + '" present!');
			entryPoints[moduleName] = [moduleName];
		} catch (e) {
			console.error('module space "' + modulePath + '" NOT present.');
		}
	});
	return entryPoints;
};
