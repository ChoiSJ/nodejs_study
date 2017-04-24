// 미들웨어 스택을 지원하는 express
var express = require("express");
// 로깅을 지원하는 morgan
var logger = require("morgan");
// 파일시스템 경로와 관련된 함ㅅ를 지원하는 path
var path = require("path");
// 요청 메세지를 처리하는 body-parser
var bodyParser = require("body-parser");

var app = express();

var books = [
	{no: 10, title: "자바의 정석", author: "남궁성", price : 35000},
	{no: 11, title: "이것이 자바다", author: "신용권", price : 25000}
];

app.use(logger('dev'));	// 로그 출력하기
// 정적컨텐츠 파일(html, js, css, image) 서비스 설정
app.use(express.static(path.resolve(__dirname, 'public')));
// 클라이언트가 json 형식으로 요청데이터를 보내는 경우 그 요청데이터의 처리를 지원
app.use(bodyParser.json());
// 클라이언트가 폼 입력값을 요청데이터로 보내는 경우 그 요청데이터의 처리를 지원
app.use(bodyParser.urlencoded({extended: true}));

app.get('/books/', function(req, res) {
	console.log("전체 도서 목록정보를 요청받았음.");
	res.json(books);
});

app.listen(3000, function() {
	console.log("서버가 시작되었습니다.");
});