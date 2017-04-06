var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

// express 객체 설정하기 
var app = express();

// 뷰템플릿 엔진 설정하기
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

// 방명록을 저장할 배열 만들기
var entries = [];

// 요청에 대한 로그를 기록하는 미들웨어 등록하기
app.use(logger('dev'));

// 클라이언트가 제출한 폼입력값을 해석해서 요청객체에 저장하는 미들웨어 등록하기
// enctype 이 "application/x-www-form-urlencoded" 로 지정된 form 입력값을 해석하는 미들웨어 함수가 등록된다.
app.use(bodyParser.urlencoded({extended:true}));

app.get("/home", function(req, res) {
	res.render("home", {guestbookList: entries});
});

app.get("/form", function(req, res) {
	res.render("form");
});

app.post("/register", function(req, res) {
	//console.log(req.body);
	var titleValue = req.body.title;
	var contentValue = req.body.content;
	console.log("제목:" + titleValue);
	console.log("내용:" + contentValue);

	var guestbook = {
		title: titleValue,
		content: contentValue,
		published:new Date()
	};

	// 방명록 객체를 배열에 저장하기
	entries.push(guestbook);

	res.redirect("/home");
});

// 일치하는 맵핑 정보가 없을 때 실행되는 미들웨어
// 404 에러 페이지를 응답으로 제공한다.
app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

// 요청 처리 중 에러가 발생했을 때 실행되는 미들웨어
// 500 에러 페이지를 응답으로 제공한다.
app.use(function(err, req, res, next) {
	console.log(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(3000, function() {
	console.log("서버 시작됨.");
});