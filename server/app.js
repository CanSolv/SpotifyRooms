/*
access_token: BQDrh2uwIEc7-zkph9oTX1BjRJdW21xJNJfg-JCkjnhiJHV8F9wKaWSgXX1DAaf9dHF8sNEVbNchxX23cYYf_4ugrU8K_eJOSeEiPQGhNdVnp8mbiI84kkm-PnYBYTWeoMShw53KB8c_VYg3QqzrI5SWz-r4lHl_1tofJqjGdsiVeLBWJpaNMNFRSWnDpLYQNCBmAv_PSyPQUe_pWUY2orED3qwuNxXGJjYZ9ypiMYwnRNn2JD8vP9pLSID_ALDx9wkg75Oe-JgjfUhwUCZnMx-jbThg0r_D6ZDSVJHhrVidkrkV0kpGU9dXGqgEzpXp
refresh_token: AQCGgt5ld9rRottuPN7jTXrobGdEr_t4ZIYWqa6bmo07bqrMDNy-84QpFGxA3gXQJdS4GjXCIPfoHnOTfUEuREzfOrn3C6UsmFl5b60dJzRiXpFpzaSAug4gpAKybV31YRA
*/

const SpotifyWebApi = require("spotify-web-api-node");
const token =
  "BQDrh2uwIEc7-zkph9oTX1BjRJdW21xJNJfg-JCkjnhiJHV8F9wKaWSgXX1DAaf9dHF8sNEVbNchxX23cYYf_4ugrU8K_eJOSeEiPQGhNdVnp8mbiI84kkm-PnYBYTWeoMShw53KB8c_VYg3QqzrI5SWz-r4lHl_1tofJqjGdsiVeLBWJpaNMNFRSWnDpLYQNCBmAv_PSyPQUe_pWUY2orED3qwuNxXGJjYZ9ypiMYwnRNn2JD8vP9pLSID_ALDx9wkg75Oe-JgjfUhwUCZnMx-jbThg0r_D6ZDSVJHhrVidkrkV0kpGU9dXGqgEzpXp";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GET MY PROFILE DATA
function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    // console.log(me.body);
    getUserPlaylists(me.body.id);
  })().catch((e) => {
    console.error(e);
  });
}

//GET MY PLAYLISTS
async function getUserPlaylists(userName) {
  const data = await spotifyApi.getUserPlaylists(userName);

  console.log("---------------+++++++++++++++++++++++++");
  let playlists = [];

  for (let playlist of data.body.items) {
    console.log(playlist.name + " " + playlist.id);

    let tracks = await getPlaylistTracks(playlist.id, playlist.name);
    // console.log(tracks);

    const tracksJSON = { tracks };
    let data = JSON.stringify(tracksJSON);
  }
}

//GET SONGS FROM PLAYLIST
async function getPlaylistTracks(playlistId, playlistName) {
  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 100,
    fields: "items",
  });

  // console.log('The playlist contains these tracks', data.body);
  // console.log('The playlist contains these tracks: ', data.body.items[0].track);
  // console.log("'" + playlistName + "'" + ' contains these tracks:');
  let tracks = [];

  for (let track_obj of data.body.items) {
    const track = track_obj.track;
    tracks.push(track);
    console.log(track.name + " : " + track.artists[0].name);
  }

  console.log("---------------+++++++++++++++++++++++++");
  return tracks;
}

module.exports = {
  getMyData,
  getUserPlaylists,
  getPlaylistTracks,
};
