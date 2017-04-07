var express = require('express');
var ejs = require('ejs');
var path = require('path');

var NodeGeocoder = require('node-geocoder');
var ForecastIO = require('forecastio');
var dateformat = require('dateformat');

var option = {
	provider:'google',
	httpAdapter:'https',
	apikey:'AIzaSyAUlw1fE1Ai5MNkEJ6WztjGary6l7O6dVw',
	formatter:null
};

var geocoder = NodeGeocoder(option);
var weather = new ForecastIO('c28d0c8402a38e2b177551979b32240b');

var app = express();

// 뷰템플릿 위치 및 뷰템플릿 엔진 설정
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);	// 템플릿 파일의 확장자를 ejs 대신 html 로 사용가능하게 설정

// 정적 컨텐츠를 제공하는 미들웨어 함수 등록
app.use(express.static(path.resolve(__dirname, 'public')));

app.get("/", function(req, res) {
	res.render("index.html");
});
 
 // 날씨 정보를 json 으로 제공
app.get("/weather/:address", function(req, res, next) {
	var address = req.params.address;
	console.log("요청받은 주소:", address);

	geocoder.geocode(address, function(err, data) {
		if (err) {
			console.log(err);
			next();
			return;
		}

		if (!data.length) {
			next(new Error("결과 없음"));
			return;
		}

		// data = [{latitude:XXX.XXX, longitude:XXX.XXX}]
		var lat = data[0].latitude;
		var lon = data[0].longitude;

		weather.forecast(lat, lon, function(err, weatherData) {
			if (err) {
				console.log(err);
				next();
				return;
			}

			// 지금 날씨
			var currentlyTemperature = fToc(weatherData.currently.temperature);
			var currentlyWeatherIcon = weatherData.currently.icon;

			// 주간 날씨
			var dailyWeather = [];

			// daliyWeatherDataArray -> [{}, {}, {}, {}, {}, {}, {}]
			var dailyWeatherDataArray = weatherData.daily.data;
			dailyWeatherDataArray.forEach(function(item, index) {
				dailyWeather.push({
					date: timeToString(item.time),
					min: fToc(item.temperatureMin),
					max: fToc(item.temperatureMax),
					icon: item.icon
				});
			});

			// 응답데이터 객체
			var result =  {
				address: address,
				currently: {
					temperature: currentlyTemperature,
					icon: currentlyWeatherIcon
				},
				daily: dailyWeather
			};

			// json 응답보내기
			res.json(result);
		});
	});
});

app.use(function(req, res) {
	res.status(404);
	res.render('404.html');
});

app.use(function(err, req, res, next) {
	res.status(500);
	res.end();
});

app.listen(3000, function() {
	console.log("서버 시작됨...");
});

// 화씨를 섭씨로 변환
function fToc(f) {
	return Math.round((f-32)/1.8);
}

// time 시간을 "년-월-일" 로 변환
function timeToString(time) {
	var date = new Date(time*1000);
	return dateformat(date, "yyyy-mm-dd");
}