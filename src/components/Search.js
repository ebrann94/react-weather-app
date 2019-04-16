import React, { useState } from 'react';

const Search = ({ handleLocation, apiError }) => {
    const [locationInput, setLocationInput] = useState('');
    return (
        <div className="location-input">
            {apiError && <p className="api-error">Location not found, please enter another!</p>}
            <form onSubmit={e => {
                    e.preventDefault();
                    if (locationInput) {
                        setLocationInput('');
                        e.target.location.blur();
                        handleLocation(locationInput);
                    }
                }} 
                className="location-form"
            >
                <input 
                    type="text" 
                    name="location" 
                    placeholder="Search" 
                    className="location-input__text"
                    value={locationInput}
                    onChange={e => setLocationInput(e.target.value)}
                />
                <input type="image" name="submit" src='./images/search.svg' className="search-icon" borders="0"  />
            </form>
        </div>
    );
}
export default Search;