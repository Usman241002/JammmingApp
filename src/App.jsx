import React, {useState, useEffect} from "react";
import "./App.css";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Results from "./components/Results";
import Playlist from "./components/Playlist";

const CLIENT_ID = "464abfbc80244e468c2fa83506119bd5";
const CLIENT_SECRET = "ec97fc44ba1c4485815be68574ea1b19";

export default function App() {
  const [songResults, setSongResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  async function getAccessToken() {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET), // Basic Auth: Client ID + Client Secret
        'Content-Type': 'application/x-www-form-urlencoded', // Sending form data
      },
      body: 'grant_type=client_credentials', // Telling Spotify that we're using client credentials flow
    });

    const data = await response.json(); // The response will be in JSON format
    return data.access_token; // Return the access token from the response
  }

  async function searchSong(event) {
    event.preventDefault();

    const accessToken = await getAccessToken();
    const inputValue = event.target.songInput.value;

    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(inputValue)}&type=track&limit=20`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,  // Use the access token here
      },
    });

    const data = await response.json();
    setSongResults(data.tracks.items.map(tracks => ({
      id: tracks.id,
      name: tracks.name,
      artists: tracks.artists.map(artist => artist.name).join(", "),
    })));
  }

  async function savePlaylist(event) {
    event.preventDefault();
    const accessToken = await getAccessToken();
    const playlistName = event.target.playlistName.value;

    const createPlaylistResponse = await fetch("https://api.spotify.com/v1/me/playlists", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,  // Use the access token here
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: playlistName, // Playlist name
        description: 'My custom playlist created with Jammming',
        public: false, // Set to true if you want it public
    })
  });

    const createdPlaylist = await createPlaylistResponse.json();

    const trackUris = playlist.map((track) => `spotify:track:${track.id}`);

    const addTrackResponse = await fetch(`https://api.spotify.com/v1/playlists/${createdPlaylist.id}/tracks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: trackUris, // Track URIs to be added
      }),
    });

  const addedTracks = await addTrackResponse.json();
  console.log('Tracks added:', addedTracks);

  }

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
      <Hero searchSong = {searchSong} />
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
