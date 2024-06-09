import React from 'react'
import './App.css'
import SearchResults from "../SearchResults/SearchResults"
import SearchBar from '../SearchBar/SearchBar';
import Spotify from '../Spotify';
import Playlist from '../Playlist/Playlist';


function App() {
  const [searchResults, setSearchResults] = React.useState([]);
  const [playlistTracks, setPlaylistTracks] = React.useState([]);
  const [playlistName, setPlaylistName] = React.useState("New Playlist");


  const searchForSongs = async (searchTerm) => {
    console.log('kelimeyi aratiyorum')
    const results = await Spotify.search(searchTerm);
    console.log(results);
    setSearchResults(results);
    console.log('searchresults olusturuldu')
  }

  const addSong = (addedSong) => {
    if (!playlistTracks.some((track) => track.id === addedSong.id)) {
      setPlaylistTracks(prev => [...prev, addedSong]);
    }
  }  

  const removeSong = (removedSong) => {
    setPlaylistTracks(prev => prev.filter((track) => track.id !== removedSong.id))
  }

  const changePlaylistName = (newName) => {
    setPlaylistName(newName);
  }

  const addPlaylist = (name, tracklist) => {
    Spotify.savePlaylist(name, tracklist);
  }

  return (
    <>
      <div className='navbar'>
        Ja<span className='purple'>mmm</span>ing
      </div>
      <div className='page-container'>
        <SearchBar search={searchForSongs} />
        <div className='menu-container'>
          <SearchResults results={searchResults} onAdd={addSong}/>
          <Playlist 
            tracklist={playlistTracks} 
            onAdd={addSong} 
            onRemove={removeSong}
            title={playlistName} 
            changePlaylistName={changePlaylistName}
            addPlaylist={addPlaylist}
          />
        </div>
      </div>
    </>
  )
}


export default App;
