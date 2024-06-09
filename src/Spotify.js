const clientId = '0b4a602cf43746bcb957baff5af20806';
const clientSecret = '01eb844914e1411fbbd55cee49d96f99';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const redirectUri = 'http://localhost:3000'
let accessToken;

const Spotify = {
    getAccessToken: async function getAccessToken() {
        if (accessToken) return accessToken;

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = "", expiresIn * 1000)
            window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    search: async function search(term) {
        const accessToken = await Spotify.getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}&limit=8`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        
        const jsonResponse = await response.json()
        if (!jsonResponse.tracks) {
            console.log('burdayim')
            return [];
        }
        console.log(jsonResponse);
        return jsonResponse.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }))
    },

    savePlaylist: async function savePlaylist(name, trackUris) {
        if (!name || !trackUris) {
            console.log('trackuri bos')
            return;
        }

        const accessToken = await Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', {
            headers: headers
        })
        .then(response => response.json())
        .then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            }).then(response => response.json())
            .then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({uris: trackUris})
                })
            })
        })
    }
}

export default Spotify;