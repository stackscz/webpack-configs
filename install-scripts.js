var here = require('./utils/here');
var packageFile = require(here('./package.json'));

console.log(process);
console.log(packageFile.name);