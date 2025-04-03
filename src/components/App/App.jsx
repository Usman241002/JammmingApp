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
  const [search, setSearch] = useState("")
  const [message, setMessage] = useState("");

  async function onChange(event) {
    setSearch(event.target.value);
  }

  async function searchSong(event) {
    event.preventDefault()
    const term = event.target.songInput.value;
    const results = await Spotify.search(term);
    setSongResults(results);
  }

  async function savePlaylist(event) {
    event.preventDefault();
    const playlistName = event.target.playlistName.value;
    setMessage(await Spotify.savePlaylist(playlistName, playlist));
  }

  async function addSong(track) {
    setPlaylist(prev => ([...prev, track]));
    await console.log(playlist);
  }

  function removeSong(trackId) {
    event.preventDefault();
    setPlaylist(prev => prev.filter(track => track.id !== trackId));
  }

  return(
    <>
      <Header />
      <Hero searchSong = {searchSong} onChange = {onChange} text = {search}/>
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
            {message && <p id = "message">{message}</p>}
          </form>

        </section>
      </main> : ""}
    </>
  )
}
