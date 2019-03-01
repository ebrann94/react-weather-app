import React from 'react';

const Search = (props) => (
    <div className="location-input">
        <form onSubmit={props.handleLocation} className="location-form">
            <input type="text" name="location" placeholder="Search" className="location-input__text" />
            <input type="image" name="submit" src='./images/search.svg' className="search-icon" borders="0"  />
        </form>
        {props.apiError && <p className="api-error">Location not found, please enter another!</p>}
    </div>

);

export default Search;