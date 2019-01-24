import React from 'react';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import LocationInput from './components/LocationInput';
import Header from './components/Header';

class WeatherApp extends React.Component {
    constructor() {
        super();

        this.state = {
            location: '',
            current: {
                temp: 0,
                windSpeed: 0,
                windDirection: ''
            },
            forecast: [{}, {}, {}, {}, {}]
        };

        this.handleLocation = this.handleLocation.bind(this);
        this.fetchCurrentData = this.fetchCurrentData.bind(this);
        this.fetchForecastData = this.fetchForecastData.bind(this);
    }

    fetchForecastData(location) {
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=68efcb4ebe0d4d3baaa1fed66ebb6848`)
            .then(res => {
                // Convert the response body to a js object
                return res.json();
            })
            .then(results => {
                if (results.message === 'city not found') {

                }

                const forecastList = results.list;
                const newForecast = [];

                forecastList.forEach((data) => {
                    if (data.dt_txt.includes('12:00')) {
                        const tempC = (data.main.temp - 273.15).toFixed(1);
                        const forecastObj = {
                            day: new Date(data.dt * 1000).getDay(),
                            temp: tempC,
                            windSpeed: data.wind.speed,
                            windDirection: this.calculateCardinalDirection(data.wind.deg),
                            // img: this.getImage(data.weather.id)
                        }
                        newForecast.push(forecastObj);
                    }
                });
                return newForecast;
            })
            .then(newForecast => {
                // Set the state to the new forecast data
                this.setState(() => {
                    return ({forecast: newForecast})
                });
            });
    }

    fetchCurrentData(location) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=68efcb4ebe0d4d3baaa1fed66ebb6848`)
            .then(res => res.json())
            .then(data => {
                // Extract data from json
                const tempC = (data.main.temp - 273.15).toFixed(1);
                const newCurrent = {
                    temp: tempC,
                    windSpeed: data.wind.speed,
                    windDirection: this.calculateCardinalDirection(data.wind.deg),
                    // img: this.getImageURL(data.weather.id);
                }

                return newCurrent;
            })
            .then(newData => {
                this.setState(() => ({current: newData}));
            }); 
    }

    // createWeatherObject(data) {
    //     const tempC = (data.main.temp - 273.15).toFixed(1);
    //     return {
    //         temp: tempC,
    //         windSpeed: data.wind.speed,
    //         windDirection: this.calculateCardinalDirection(data.wind.deg),
    //         // img: this.getImageURL(data.weather.id);
    //     }
    // }

    calculateCardinalDirection(angle) {
        var val = Math.floor((angle / 22.5) + 0.5);
        var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }

    getImageURL(weather) {
        if (weather >= 200 && weather < 300) {
            return 'thunderstorm.svg'
        } else if (weather >= 300 && weather < 400) {
            return 
        } else if (weather >= 500 && weather < 600) {
            return 'rain.svg'
        } else if (weather >= 600 && weather < 700) {
            return 'snow.svg'
        } else if (weather >= 700 && weather < 800) {
            return 'fog.svg'
        } else if (weather === 800) {
            return 'sunny.svg'
        } else if (weather > 800 && weather < 900) {
            return 'cloudy.svg'
        }
    }

    handleLocation(event) {
        event.preventDefault();
        const location = event.target.elements.location.value
        if (location) {
            const encodedLocation = encodeURIComponent(location);
            this.fetchForecastData(encodedLocation);
            this.fetchCurrentData(encodedLocation);

            event.target.elements.location.value = '';
        }
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    render() {
        return (
            <div className="app-container">
                <div className="header-container">
                    <Header />
                    <LocationInput handleLocation={this.handleLocation}/>
                </div>
                <CurrentWeather 
                    currentData={this.state.current} 
                />
                <Forecast forecast={this.state.forecast} />
            </div>
        );
    }
}

export default WeatherApp;