const clientID = 'c49f8c8e614c406092aa479409024154';
const redirectURI = 'http://localhost:3000/';

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

    }
};

export default Spotify;