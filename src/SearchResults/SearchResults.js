import React from 'react';
import './SearchResults.css';
import Track from '../Track/Track';


function SearchResults(props) {
    const trackObjects = props.results;
    const trackElements = trackObjects.map((song) => {
        return (
            <Track 
                song={song}
                key={song.id}
                onAdd={props.onAdd}
            />
        )
    })

    return (
        <div className='main-container'>
            <h2 className='main-container-title'>Results</h2>
            {trackElements}
        </div>
    )

}

export default SearchResults;