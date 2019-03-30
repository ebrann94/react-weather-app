import React from 'react';
import DayCard from './DayCard'
import Loader from 'react-loader-spinner';

const Forecast = ({ forecast, isLoading}) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <div className="forecast-container">
            {
                forecast.map((data, i) => (
                    isLoading ? 
                        <div className="forecast-loading" key={i}>
                            <Loader type="Circles" height="50px" width="50px" /> 
                        </div> 
                    :
                        <DayCard 
                            key={i} 
                            day={days[data.day]}
                            temperature={data.temp} 
                            windSpeed={data.windSpeed}
                            windDirection={data.windDirection}
                            img={data.img}
                        />
                ))
            }
        </div>
    );
}

export default Forecast;