var NodeGeocoder = require('node-geocoder');
var ForecastIO = require('forecastio');

var option = {
	provider:'google',
	httpAdapter:'https',
	apikey:'AIzaSyAUlw1fE1Ai5MNkEJ6WztjGary6l7O6dVw',	// google api key
	formatter:null
};

var geocoder = NodeGeocoder(option);
var weather = new ForecastIO('c28d0c8402a38e2b177551979b32240b');

var address = '右京区太秦三尾町1-15';
geocoder.geocode(address, function(err, data) {
	if (err) {				// 에러발생
		return;
	}

	if (!data.length) {		// 주소에 해당하는 위도경도 정보가 존재하지 않음
		return;
	}

	var lat = data[0].latitude;
	var lon = data[0].longitude;

	weather.forecast(lat, lon, function(err, weatherData) {
		if (err) {
			console.log(err);
			return;
		}

		console.log(weatherData);
	});
});