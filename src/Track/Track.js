import React from 'react';
import './Track.css'

function Track(props) {
    const [isAdded, setIsAdded] = React.useState(false);
    const saveToPlaylist = () => {
        props.onAdd(props.song);
        setIsAdded(prev => !prev);
    }

    const removeFromPlaylist = () =>  {
        props.onRemove(props.song);
        setIsAdded(prev => !prev)
    }

    const renderButton = () => {
        if (props.onRemove) {
            return (
                <button 
                    className='track-button' 
                    onClick={removeFromPlaylist}
                >-</button>
            )
        } else {
            return (
                <button 
                    className='track-button' 
                    onClick={saveToPlaylist}
                >+</button>
            )
        }
    }

    return (
        <div className='search-result-container'>
            <div className='track-container'>
                <div className='track-info-box'>
                    <h3 className='song-name'>{props.song.name.substring(0,40)}</h3>
                    <p className='song-description'>{`${props.song.artist} | ${props.song.album.substring(0, 40)}`}</p>
                </div>
                {renderButton()}
            </div>
            <hr className='horizontal-line'/>
        </div>
    )
}

export default Track;