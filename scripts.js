module.exports = {
	"dev": "node ./node_modules/@stackscz/webpack-configs/react/dev-server",
	"build:dev": "webpack --config ./node_modules/@stackscz/webpack-configs/react/dev",
	"build:dev:watch": "webpack --watch --config ./node_modules/@stackscz/webpack-configs/react/dev",
	"build:prod": "webpack -p --config ./node_modules/@stackscz/webpack-configs/react/prod",
	"build": "npm run build:dev && npm run build:prod"
};
