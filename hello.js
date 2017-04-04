var http = require('http');

var server = http.createServer(function(request, response) {
	response.writeHead(200, {'Contect-Type':'text/plane'});
	response.end("Hello, world!");		
});

server.listen(3000);
console.log("웹서버가 시작되었습니다. Ctrl+c 키를 누르면 종료됩니다.");