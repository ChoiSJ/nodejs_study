var connect = require('connect');

var app = connect();	// connect() 함수는 connect 객체를 반환한다.

app.use(function(req, res, next) {
	var remoteAddr = req.connection.remoteAddress;
	req['ip'] = remoteAddr;
	next();
});

app.use(logger);
app.use(hello);

app.listen(3000);

// 미들웨어 함수 정의하기
function logger(req, res, next) {
	console.log("요청 메소드:" + req.method);
	console.log("요청 URL:" + req.url);
	console.log("클라이언트 ip:" + req.ip);

	next();
}

function hello(req, res, next) {
	res.setHeader('Content-Type', 'text/plane');
	res.end("Hello!");
}