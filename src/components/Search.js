import React from 'react';

const Search = (props) => (
    <div className="location-input">
        <form onSubmit={props.handleLocation}>
            <input type="text" name="location" placeholder="Location" className="location-input__text" />
            <input type="submit" value="Submit" className="location-input__submit" />
        </form>
        {props.apiError && <p className="api-error">Location not found, please enter another!</p>}
    </div>

);

export default Search;