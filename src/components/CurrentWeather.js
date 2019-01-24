import React from 'react';

const CurrentWeather = (props) => {
    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date();
    const day = days[date.getDay()];
    const month = months[date.getMonth()];

    return (
        <div className="current">
            <h3 className="current__date">{`${day} ${date.getDate()} ${month}`}</h3>
            <img className="current__img" src={`./images/${props.img}`}  />
            <div className="current__info">
                <p className="current__wind">{props.windSpeed}mph {props.windDirection}</p>
                <p className="current__temp">{props.temp}&deg;C</p>
            </div>
        </div>

    )
};

export default CurrentWeather;