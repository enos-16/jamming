const clientID = 'c49f8c8e614c406092aa479409024154';
const redirectURI = 'http://spotify-jamming-proj.surge.sh/';

let accessToken;

const Spotify = {
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        } 
        
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

        if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            let expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const authURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = authURL;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
          }).then(response => {return response.json()}).then(jsonResponse => {
              if(!jsonResponse.tracks) {
                  return [];
              }
              return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
              }))
          });
    },

    savePlaylist(playlistName, trackURIs) {
        if(!playlistName || !trackURIs.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userID;

        return fetch(`https://api.spotify.com/v1/me`, {headers: headers}).then(response => response.json()).then(jsonResponse => {
            jsonResponse.id = userID;
            return fetch(`http://api.spotify.com/v1/users/${userID}/playlists`, {headers: headers, method: 'POST', body: JSON.stringify({name: playlistName})}).then(response => response.json()).then(jsonResponse => {
                const playlistID = jsonResponse.id
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {headers: headers, method: 'POST', body: JSON.stringify({uris: trackURIs})
                });
            });
        });
    }

};

export default Spotify;