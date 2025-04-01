import React, {useState, useEffect} from "react";
import "./App.css";

import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import Results from "../Results/Results";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../utilities/Spotify";

export default function App() {
  const [songResults, setSongResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  Spotify.getToken(); //Grants and console.logs Access token

  function addSong(track) {
    setPlaylist(prev => ([...prev, track]));
  }

  function removeSong(trackId) {
    event.preventDefault();
    setPlaylist(prev => prev.filter(track => track.id !== trackId));
  }

  return(
    <>
      <Header />
      <Hero //Add search song function
      />
      {songResults.length ? <main className = "flexContainer">
        <section id = "resultsCard" className = "flexContainer">
          <h2>Results</h2>

          <Results results = {songResults} addSong = {addSong}/>
        </section>

        <section id = "playlistCard" className = "flexContainer">
          <form id = "savePlaylistForm" onSubmit = {savePlaylist} className = "flexContainer">
            <input id = "playlistName" name = "playlistName" type = "text" placeholder = "My Playlist" required />
            <Playlist playlist = {playlist} removeSong = {removeSong}/>
            {playlist.length ? <input type = "submit" value = "Save To Spotify" className = "button flexContainer"/> : ""}
          </form>

        </section>
      </main> : ""}
    </>
  )
}
