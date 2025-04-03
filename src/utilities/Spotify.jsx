const clientId = '464abfbc80244e468c2fa83506119bd5';
const clientSecret = 'ec97fc44ba1c4485815be68574ea1b19';
const redirectURI = "http://localhost:5173/callback";
const base = "https://api.spotify.com";
let accessToken;

const Spotify = {
  async getToken() {
    if(accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if(accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      setTimeout(() => accessToken = "", expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessUrl;
    }
  },

  async search(term) {
    try {
      const accessToken = await this.getToken();
      const response = await fetch(`${base}/v1/search?q=${encodeURIComponent(term)}&type=track&market=GB&limit=15&offset=0`, {
        headers: {
          "Authorization": `Bearer ${(accessToken)}`
        }
      });

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
  },

  async savePlaylist(playlistName, playlist) {
    try {
      const accessToken = await this.getToken();
      const header = {Authorization: `Bearer ${accessToken}`}
      const userIDResponse = await fetch("https://api.spotify.com/v1/me", {
        headers: header
      });
      const {id: user_id} = await userIDResponse.json();

      const createPlaylistResponse = await fetch(`${base}/v1/users/${user_id}/playlists`, {
        method: "POST",
        headers: header,
        body: JSON.stringify({
          "name": playlistName,
          "description" : "Playlist made by JAMMMING web app"
        })
      });
      const {id: playlist_id} = await createPlaylistResponse.json();
      const track_uris = playlist.map(track => track.uri)

      const savePlaylistResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
        method: "POST",
        headers: header,
        body: JSON.stringify({
            uris: track_uris, // Array of track URIs
        })
      });
      if(savePlaylistResponse.ok) {
        return "Playlist Created!";
      } else {
        return "Error Creating Playlist."
      }
    } catch(error) {
      console.log(error)
    }
  }
}

export default Spotify;
