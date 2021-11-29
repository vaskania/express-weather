const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=0514e774fed3bd8bd0cfd9e970f5d4b5&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('unable to find location', undefined);
    } else {
      const temp = body.current.temperature;
      const feelsLike = body.current.feelslike;
      const weatherDescription = body.current.weather_descriptions[0];

      callback(
        undefined,
        `${weatherDescription}. It is currently ${temp} celsius and it feels like ${feelsLike} celsius.`
      );
    }
  });
};

module.exports = forecast;
