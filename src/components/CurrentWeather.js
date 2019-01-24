import React from 'react';

const CurrentWeather = (props) => {
    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date();
    const day = days[date.getDay()];
    const month = months[date.getMonth()];

    return (
        <div>
            <h3 className="current__date">{`${day} ${date.getDate()} ${month}`}</h3>
            <p></p>
            <p>{props.currentData.temp}&deg;C</p>
            <p>{props.currentData.windSpeed}mph {props.currentData.windDirection}</p>
        </div>

    )
};

export default CurrentWeather;