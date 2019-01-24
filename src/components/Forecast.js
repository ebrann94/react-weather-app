import React from 'react';
import DayCard from './DayCard'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//const temps = [24, 12, 15, 10, 8];

const Forecast = (props) => (
    <div className="forecast-container">
        {
            props.forecast.map((data, i) => (
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