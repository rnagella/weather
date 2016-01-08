var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=7eaac056c1406731054889307f6b66cc';
var _ = require('lodash');

var kelvinToF = function (kelvin) {
	return Math.round((kelvin - 273.15) * 1.8 + 32) + '˚F';
};

module.exports = function (latitude, longitude) {
	console.log('inside fetch api');
	var url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;
	console.log('url' + url);

	return fetch(url)
		.then(function (response){
			console.log('fetch response' + response);
			return response.json();
		})
		.then(function (json) {
			console.log('json' + json);
			return {
				city: json.name,
				temperature: kelvinToF(json.main.temp),
				description: _.capitalize(json.weather[0].description)
			}
		});
}
