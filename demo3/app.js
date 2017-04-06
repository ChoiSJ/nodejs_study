var express = require('express');
var path = require('path');	// 파일시스템의 경로와 관련된 기능 제공

// Express 객체 생성하기
var app = express();

// 뷰템플릿 엔진 설정하기
// 템플릿 파일이 있는 경로를 "views" 라는 이름으로 설정하기
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
console.log(__dirname);
// 정적인 컨텐츠를 제공하는 미들웨어 추가하기
// 정적 컨텐츠가 위치한 경로
var staticpath = path.resolve(__dirname, 'public');

// express 의 static(경로) 함수는 스태틱 컨텐츠를 제공하는 미들웨어 함수를 반환한다.
app.use(express.static(staticpath));

// 요청 처리 미들웨어 함수 추가하기
app.get('/home', function(req, res) {
	// res.render('뷰이름', 데이터);
	res.render('home', {message:"홈페이지 방문을 환영합니다."});
});

app.get('/about', function(req, res) {
	res.render('about', {message:"도움말 페이지 방문을 환영합니다."});
});

// 404 처리 미들웨어 함수
app.use(function(req, res, next) {
	res.writeHead('404', {'Content-Type':'text/plane;charset=utf-8'});
	res.end('404 - Not found');
});

app.listen(3000, function() {
	console.log('서버 시작됨.');
}) 