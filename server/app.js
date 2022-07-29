const SpotifyWebApi = require("spotify-web-api-node");
const spotifyApi = new SpotifyWebApi();

let accessToken = "";
let refreshToken = "";

function initApplication(token) {
  accessToken = token;
  spotifyApi.setAccessToken(token);
}

//GET MY PROFILE DATA
function getMyData() {
  return new Promise(async (resolve, reject) => {
    const me = await spotifyApi.getMe();
    console.log(me);
    const data = await getUserPlaylists(me.body.id);

    resolve(data);
  });
}

//GET MY PLAYLISTS
async function getUserPlaylists(userName) {
  const data = await spotifyApi.getUserPlaylists(userName);
  let playlists = [];

  for (let playlist of data.body.items) {
    const tracks = await getPlaylistTracks(playlist.id, playlist.name);

    playlists.push({
      playlistName: playlist.name,
      playlistId: playlist.id,
      tracks,
    });
  }

  return playlists;
}

//GET SONGS FROM PLAYLIST
async function getPlaylistTracks(playlistId, playlistName) {
  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 100,
    fields: "items",
  });

  let tracks = [];

  for (let track_obj of data.body.items) {
    const track = track_obj.track;
    tracks.push(track);
  }  

  console.log("tracks \n");
  return tracks;
}

module.exports = {
  initApplication,
  getMyData,
  getUserPlaylists,
  getPlaylistTracks,
};