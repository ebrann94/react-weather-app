import React from 'react';

const LocationInput = (props) => (
    <div>
        <form onSubmit={props.handleLocation}>
            <input type="text" name="location" placeholder="Location"/>
        </form>
    </div>

);

export default LocationInput;