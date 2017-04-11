var path = require('path');				// 경로 관련 모듈
var logger = require('morgan');			// 로그 출력 관련 모듈
var express = require('express');		// 웹 애플리케이션 미들웨어 지원
var ejs = require('ejs');				// 뷰 템플릿 엔진 모듈
var bodyParser = require('body-parser');	// 폼 입력값 처리 모듈
var dataformat = require('dataformat');	// 날짜를 지정된 형식의 문자열로 변환

var app = express();

// 뷰 템플릿 설정
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);		// 템플릿 파일의 확장자를 .html 로 사용할 수 있게 한다.

// 정적 컨텐츠 제공 미들웨어함수 설정
var staticpath = path.resolve(__dirname, 'public');
app.set(express.static(staticpath));

// 로그를 출력하는 미들웨어 함수 설정
app.use(logger('dev'));

// 폼 입력값을 처리해서 req.body 에 저장하는 미들웨어 함수 설정
app.use(bodyParser.urlencoded({extended:true}));

// 라우팅 설정
app.get('/todos', function(req, res, next) {
	res.render("index.html");
});

app.listen(3000, function() {
	console.log("Server start...");
});