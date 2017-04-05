var connect = require('connect');

var app = connect();	// 커넥터 객체 생성하기

// 정상 처리 미들웨어 함수
app.use(findUser);
app.use(findPet);

// 404 처리 미들웨어 함수
app.use(function(req, res, next) {
	res.setStatusCode = 404;
	res.setHeader('Content-Type', 'text/plane');
	res.end('404 - Not found');
});

// 에러처리 미들웨어 함수
app.use(errorLoggingHandler);
app.use(errorHandler);

app.listen(3000);

var db = {
	users: [
		{name:"홍진호"},
		{name:"임요환"},
		{name:"이윤열"}
	],
	pets: [
		{name:"고양이"},
		{name:"강아지"},
		{name:"망아지"}
	]
};

function findUser(req, res, next) {
	// 요청 url: /user/1
	var match = req.url.match(/^\/user\/(.+)/);
	console.log("match ->" + match);

	if (match) {
		var user = db.users[match[1]];

		if (user) {
			res.setHeader('Content-Type', 'application/json;charset=utf-8');
			res.end(JSON.stringify(user));
		} else {
			var err = new Error("User not found");
			err.notfound = true;
			err.message = match[1] + "번째 사람을 찾을 수 없습니다.";

			// 에러를 담아서 다음 미들웨어 함수를 실행한다.
			next(err);
		}

	} else {
		// 다음 미들웨어 함수 실행
		next();
	}
}

function findPet(req, res, next) {
	// 요청 url: /pet/1
	var match = req.url.match(/^\/pet\/(.+)/);
	console.log("match ->" + match);

	if (match) {
		var pet = db.pets[match[1]];

		if (pet) {
			res.setHeader('Content-Type', 'application/json;charset=utf-8');
			res.end(JSON.stringify(pet));
		} else {
			var err = new Error("Pet not found");
			err.notfound = true;
			err.message = match[1] + "번째 동물을 찾을 수 없습니다.";

			next(err);
		}

	} else {
		next();
	}
}

function errorLoggingHandler(err, req, res, next) {
	console.log("에러 정보 출력");
	console.error("에러 메시지:" + err.message);
	console.error("not found:" + err.notfound);
	console.error(err.stack);

	next(err);
}

// 에러 발생시 실행되는 미드웨어 함수
// 에러처리 미들웨어 함수는 매개변수를 4개 가진다
function errorHandler(err, req, res, next) {
	console.log(err);

	if (err.notfound) {
		res.setHeader('Content-Type', 'text/plane;charset=utf-8');
		res.setStatusCode = 400;
		res.end(err.message);
	} else {
		res.setHeader('Content-Type', 'text/plane;charset=utf-8');
		res.setStatusCode = 500;
		res.end("Server Error");
	}
}