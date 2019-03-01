import React from 'react';

const DayCard = (props) => (
    <div className="day-card">
        <h4 className="forecast__date">{props.day}</h4>
        {props.img && <img className="forecast__img" src={`./images/${props.img}`}  width="auto" />}
        <div className="forecast__info"> 
            <p className="forecast__wind">{props.windSpeed}mph {props.windDirection}</p>
            <p className="forecast__temp">{props.temperature} &deg;C</p>
        </div>
    </div>
);

DayCard.defaultProps ={
    day: '- - -',
    temperature: '-',
    windSpeed: '-',
    windDirection: '-'
}

export default DayCard;