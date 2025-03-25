import React, {useState, useEffect} from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Results from "./components/Results";
import "./App.css";

const CLIENT_ID = "464abfbc80244e468c2fa83506119bd5";
const CLIENT_SECRET = "ec97fc44ba1c4485815be68574ea1b19";

export default function App() {
  const [searchInput, setSearchInput] = useState("");

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
    setSearchInput(inputValue);

    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchInput)}&type=track&limit=10`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,  // Use the access token here
      },
    });

    const data = await response.json();
    console.log(data)
  }

  return(
    <>
      <Header />
      <Hero searchSong = {searchSong} />
      <main className = "flexContainer">
        <section id = "resultsCard" className = "flexContainer">
          <h2>Results</h2>

          <p>Example</p>
        </section>

        <section id = "playlistCard" className = "flexContainer">
          <input type = "text" value = "My Playlist"/>

          <p>Example</p>
        </section>
      </main>
    </>
  )
}
