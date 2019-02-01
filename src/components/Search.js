import React from 'react';

const Search = (props) => (
    <div className="location-input">
        <form onSubmit={props.handleLocation}>
            <input type="text" name="location" placeholder="Location"/>
        </form>
        {props.apiError && <p className="api-error">Location not found, please enter another!</p>}
    </div>

);

export default Search;