import React from 'react';

const Search = ({ handleLocation, apiError }) => (
    <div className="location-input">
        {apiError && <p className="api-error">Location not found, please enter another!</p>}
        <form onSubmit={handleLocation} className="location-form">
            <input type="text" name="location" placeholder="Search" className="location-input__text" />
            <input type="image" name="submit" src='./images/search.svg' className="search-icon" borders="0"  />
        </form>
    </div>
);

export default Search;