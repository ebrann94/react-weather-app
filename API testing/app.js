const fs = require('fs');

const forecast = JSON.parse(fs.readFileSync('owm-forecast.json'));

const forecastList = forecast.list;

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const tempsArr = [];
const windSpeedArr = [];

forecastList.forEach(forecast => {
    const time = forecast.dt_txt;

    if (time.includes('12')) {
        // Get the no of the day from date object and convert to english day by using days array
        const day = days[new Date(forecast.dt * 1000).getDay()];
        // Get the temp in kelvin from json and convert to celsius and fix to 1dp
        const tempC = (forecast.main.temp - 273.15).toFixed(1);
        const windSpeed = forecast.wind.speed.toFixed(1);

        console.log(day + ': ', tempC + '\xB0C ', windSpeed + 'mph');
        tempsArr.push(tempC);
        windSpeedArr.push(windSpeed);
    }
});

// console.log(tempsArr);
// console.log(windSpeedArr);

// URL constructor
// http://api.openweathermap.org/data/2.5/forecast?q=london&appid=68efcb4ebe0d4d3baaa1fed66ebb6848

const location = 'london';
const url = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=68efcb4ebe0d4d3baaa1fed66ebb6848`
console.log(url);