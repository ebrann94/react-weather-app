import React from 'react';

const DayCard = (props) => (
    <div className="day-card">
        <h4>{props.day}</h4>
        <p>{props.temperature} &deg;C</p>
        <p>{props.windSpeed}mph {props.windDirection}</p>
    </div>
);

DayCard.defaultProps ={
    day: '- - -',
    temperature: '-',
    windSpeed: '-',
    windDirection: '-'
}

export default DayCard;