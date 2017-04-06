var path = require('path');
var express = require('express');
var ejs = require('ejs');
var NodeGeocoder = require('node-geocoder');
var ForecastIO = require('forecastio');
var dateFormat = require('dateformat');

var app = express();
var weather = new ForecastIO("Dark Sky API Secret Key");

var options = {
	provider: 'google',
 
  	httpAdapter: 'https', // Default 
  	apiKey: 'GOOGLE API_KEY', // for Mapquest, OpenCage, Google Premier 
  	formatter: null         // 'gpx', 'string', ... 
};
var geocoder = NodeGeocoder(options);


app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'views'));

app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.get("/", function(req, res) {
	res.render('index.html');
});

app.get("/:address", function(req, res, next) {
	var address = req.params.address;

	geocoder.geocode(address, function(err, data) {
		if (err) {
			next();
			return;
		}

		if (!data.length) {
			next();
			return;
		}

		var latitude = data[0].latitude;
		var longitude = data[0].longitude;

		weather.forecast(latitude, longitude, function(err, data) {
			if (err) {
				console.log(err);
				next();
				return;
			}

			var currentlyTemperature = Math.round((data.currently.temperature - 32) / 1.8);
			var dailyTemperature = [];

			data.daily.data.forEach(function(item, index) {
				var day = dateFormat(new Date(item.time * 1000), "yyyy-mm-dd");
				var minTemperature = Math.round((item.temperatureMin - 32) / 1.8);
				var maxTemperature = Math.round((item.temperatureMax - 32) / 1.8);

				dailyTemperature.push({
					day: day,
					icon: item.icon,
					summary: item.summary,
					min: minTemperature,
					max: maxTemperature
				});
			});

			res.json({
				address: address,
				current: currentlyTemperature, 
				daily: dailyTemperature
			});
		});

	});
});


app.use(function(req, res) {
	res.status(404).render('404.html');
})

app.listen(3000, function() {
	console.log('Server started.');
})