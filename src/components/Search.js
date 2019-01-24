import React from 'react';

const Search = (props) => (
    <div className="location-input">
        <form onSubmit={props.handleLocation}>
            <input type="text" name="location" placeholder="Location"/>
        </form>
    </div>

);

export default Search;