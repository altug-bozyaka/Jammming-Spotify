import React from 'react';
import './SearchBar.css';
import Spotify from '../Spotify';

function SearchBar(props) {
    const [searchTerm, setSearchTerm] = React.useState("");

    const handleChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.search(searchTerm);
    }


    return (
        <form className='form-container' onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Enter A Song Title" 
                className="searchbox" 
                onChange={handleChange}
                value={searchTerm}
            ></input>
            <button type="submit" className="search-button">Search</button>
        </form>
    )
}

export default SearchBar;