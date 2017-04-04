// http 모듈을 사용해서 간단한 응답을 제공한 웹 애플리케이션

// http 모듈은 node 의 내장모듈
// http 요청과 응답을 처리하는 간단한 웹서버를 제작할 수 있다.
var http = require('http');

http.createServer(function(req, res) {
	console.log("요청:URL:" + req.url);

	var path = req.url;

	switch(path) {
		case '/':
			res.writeHead(200, {'Content-Type':'text/plane'});
			res.end("Welcome to Home");
			break;
		case '/about':
			res.writeHead(200, {'Content-Type':'text/plane'});
			res.end("Welcome to About Page");
			break;
		default:
			res.writeHead(200, {'Content-Type':'text/plane'});
			res.end('404 - Not found');
	}
}).listen(3000);