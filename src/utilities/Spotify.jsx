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
    return data;
  },

  async search(term) {
    try {
      const accessToken = await this.getToken();
      const response = await fetch(`${base}/v1/search?q=${encodeURIComponent(term)}&type=track&market=GB&limit=15&offset=0`, {
        headers: {
          "Authorization": `Bearer ${(accessToken.access_token)}`
        }
      })

      const data = await response.json()
      return data.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    } catch(error) {
      console.log(error)
    }
  }
}

export default Spotify;
