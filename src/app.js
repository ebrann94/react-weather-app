import React from 'react';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import Search from './components/Search';
import Header from './components/Header';
import Loader from 'react-loader-spinner';

class WeatherApp extends React.Component {
    constructor() {
        super();

        this.state = {
            currentLocation: '',
            searchterm: '',
            current: {
                temp: '-',
                windSpeed: '-',
                windDirection: '',
                img: undefined
            },
            forecast: [{}, {}, {}, {}, {}],
            apiError: false,
            currentLoading: true,
            forecastLoading: true
        };

        this.handleLocation = this.handleLocation.bind(this);
    }

    extractForecastData(results) {
        if (results.message !== 'city not found') {
            const forecastList = results.list;
            const newForecast = [];
            
            forecastList.forEach(data => {
                if (data.dt_txt.includes('12:00')) {
                    const tempC = (data.main.temp - 273.15).toFixed(1);
                    const forecastObj = {
                        day: new Date(data.dt * 1000).getDay(),
                        temp: tempC,
                        windSpeed: data.wind.speed.toFixed(1),
                        windDirection: this.calculateCardinalDirection(data.wind.deg),
                        img: this.getImageURL(data.weather[0].id)
                    }
                    newForecast.push(forecastObj);
                }
            });

            this.setState(() => {
                return ({
                    forecast: newForecast, 
                    forecastLoading: false
                });
            });
        } else {
            this.setState(() => {
                return ({
                    forecast: [{}, {}, {}, {}, {}],
                    forecastLoading: false
                });
            })
        }
    }

    extractCurrentData(results) {
         // Check if the API returns an error or not
         if (results.message !== 'city not found') {
            const tempC = (results.main.temp - 273.15).toFixed(1);
            const newCurrent = {
                temp: tempC,
                windSpeed: results.wind.speed.toFixed(1),
                windDirection: this.calculateCardinalDirection(results.wind.deg),
                img: this.getImageURL(results.weather[0].id)
            }
            const currentLocation = `${results.name}, ${results.sys.country}`;
            this.setState(() => {
                return {
                    current: newCurrent,
                    apiError: false,
                    currentLocation,
                    currentLoading: false 
                }
            });
        } else {
            this.setState(() => {
                return {
                    current: {},
                    apiError: true,
                    currentLoading: false
                };
            });
        }
    }

    fetchForecastData(location) {
        this.setState(() => ({forecastLoading: true}));
        fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=68efcb4ebe0d4d3baaa1fed66ebb6848`)
            .then(res => res.json())
            .then(results => this.extractForecastData(results));
    }

    fetchCurrentData(location) {
        this.setState(() => ({currentLoading: true}))
        fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=68efcb4ebe0d4d3baaa1fed66ebb6848`)
            .then(res => res.json())
            .then(results => this.extractCurrentData(results));
    }

    fetchForecastLatLong(latitude, longitude) {
        this.setState(() => ({forecastLoading: true}));
        fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=68efcb4ebe0d4d3baaa1fed66ebb6848`)
            .then(res => res.json())
            .then(results => this.extractForecastData(results))
    }

    fetchCurrentLatLong(latitude, longitude) {
        this.setState(() => ({currentLoading: true}));
        fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=68efcb4ebe0d4d3baaa1fed66ebb6848`)
            .then(res => res.json())
            .then(results => this.extractCurrentData(results));
    }

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

    handleLocation(location) {
        const encodedLocation = encodeURIComponent(location);
        this.fetchForecastData(encodedLocation);
        this.fetchCurrentData(encodedLocation);
        
        this.setState(() => ({serchTerm: location}));
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.fetchCurrentLatLong(position.coords.latitude, position.coords.longitude);
            this.fetchForecastLatLong(position.coords.latitude, position.coords.longitude);
        });
    }

    render() {
        return (
            <div className="app-container">
                <div className="header-container">
                    <Header />
                    <Search 
                        handleLocation={this.handleLocation} 
                        apiError={this.state.apiError}
                    />
                </div>
                {this.state.currentLoading ? (
                    <div className="current-loading">
                        <Loader type="Circles" width="200" height="200"/>
                    </div> 
                ) : (
                    <CurrentWeather {...this.state.current} currentLocation={this.state.currentLocation}/>
                )}
                <Forecast forecast={this.state.forecast} isLoading={this.state.forecastLoading}/>
            </div>
        );
    }
}

export default WeatherApp;