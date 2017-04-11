var NodeGeocoder = require('node-geocoder');
var ForecastIO = require('forecastio');

var option = {
	provider:'google',
	httpAdapter:'https',
	apikey:'API Number',	// google api key
	formatter:null
};

var geocoder = NodeGeocoder(option);
var weather = new ForecastIO('API Number');

var address = 'Address';
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