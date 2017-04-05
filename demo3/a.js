var path = require('path');

var directory = __dirname;
console.log("현재 디렉토리:" + directory);

var staticpath = path.resolve(__dirname, "public");
console.log("public directory 경로:" + staticpath);