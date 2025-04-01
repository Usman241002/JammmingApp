const clientId = '464abfbc80244e468c2fa83506119bd5';
const clientSecret = 'ec97fc44ba1c4485815be68574ea1b19';
const redirectURI = "http://localhost:5173/callback";
const base = "https://api.spotify.com";

const Spotify = {
  async getToken() {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
    })

    const data = await response.json();
    console.log(data);


  }
}

export default Spotify;
