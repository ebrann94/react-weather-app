import React from 'react';

const CurrentWeather = (props) => {
    const date = new Date();

    const day = date.toLocaleString('en-GB', {weekday: 'long'});
    const month = date.toLocaleString('en-GB', { month: 'long' });

    return (
        <div className="current">
            <h3 className="current__date">{props.currentLocation ? `${props.currentLocation} `: '' }{`${day} ${date.getDate()} ${month}`}</h3>
            {props.img && <img className="current__img" src={`./images/${props.img}`}  />}
            <div className="current__info">
                <p className="current__wind">{props.windSpeed}mph {props.windDirection}</p>
                <p className="current__temp">{props.temp}&deg;C</p>
            </div>
        </div>

    )
};

export default CurrentWeather;