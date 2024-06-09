import React from 'react';
import './Playlist.css';
import Track from '../Track/Track'

function Playlist(props) {
    console.log(props.tracklist);

    const updateName = (event) => {
        props.changePlaylistName(event.target.value)
    }

    const savePlaylist = () => {
        console.log(props.tracklist);
        const trackUris = props.tracklist.map((track) => track.uri)
        props.addPlaylist(props.title, trackUris);
    }

    const trackElements = props.tracklist.map((song) => {
        return (
            <Track 
                song={song}
                key={song.id}
                onRemove={props.onRemove}
            />
        )
    })
    return (
        <div className='container'>
            <input
                className='playlist-title'
                type='text'
                value={props.title}
                onChange={updateName}
                placeholder={props.title}
            />
            <hr className='horizontal-line'/>
            <div className='tracks-container'>
                {trackElements}
            </div>
            <button className='save-playlist-button' onClick={savePlaylist}>SAVE TO SPOTIFY</button>
        </div>
    )
}

export default Playlist;