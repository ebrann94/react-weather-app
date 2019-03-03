import React from 'react';
import DayCard from './DayCard'
import Loader from 'react-loader-spinner';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//const temps = [24, 12, 15, 10, 8];

const Forecast = (props) => (
    <div className="forecast-container">
        {
            props.forecast.map((data, i) => (
                props.isLoading ? 
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

export default Forecast;