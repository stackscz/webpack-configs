"use strict";

module.exports = {
	"parser": "babel-eslint",
	"rules": {
		"indent": [
			2,
			"tab",
			{
				"SwitchCase": 1
			}
		],
		"quotes": [
			2,
			"single"
		],
		"linebreak-style": [
			2,
			"unix"
		],
		"semi": [
			2,
			"always"
		],
		"prefer-const": [
			2
		],
		"no-unused-vars": [2, {"varsIgnorePattern": "React"}],
		"no-mixed-spaces-and-tabs": [2, "smart-tabs"],
		"no-console": [0]
	},
	"env": {
		"es6": true,
		"node": true,
		"browser": true
	},
	"extends": "eslint:recommended",
	"ecmaFeatures": {
		"jsx": true,
		"experimentalObjectRestSpread": true,
		"modules": true,
		"destructuring": true,
		"spread": true
	},
	"plugins": [
		"react"
	]
};
