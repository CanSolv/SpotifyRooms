const SpotifyWebApi = require("spotify-web-api-node");
const express = require("express");
const application = require("./app");

require("dotenv").config();

let accessToken = "";

const { CALLBACK_URL, CLIENT_ID, CLIENT_SECRET } = process.env;

const api_settings = {
  redirectUri: CALLBACK_URL,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
};

const scopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "app-remote-control",
  "user-read-email",
  "user-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-modify-private",
  "user-library-modify",
  "user-library-read",
  "user-top-read",
  "user-read-playback-position",
  "user-read-recently-played",
  "user-follow-read",
  "user-follow-modify",
];

const spotifyApi = new SpotifyWebApi(api_settings);
const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});

app.get("/login", (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

app.get("/callback", (req, res) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error("Callback Error:", error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      try {
        const access_token = data.body["access_token"];
        const refresh_token = data.body["refresh_token"];
        const expires_in = data.body["expires_in"];

        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        console.log("access_token:", access_token);
        console.log("refresh_token:", refresh_token);

        res.send("Success! You can now close the window.");

        application.initApplication(access_token);

        accessToken = access_token;

        setInterval(async () => {
          const data = await spotifyApi.refreshAccessToken();
          const access_token = data.body["access_token"];

          console.log("The access token has been refreshed!");
          console.log("access_token:", access_token);
          spotifyApi.setAccessToken(access_token);
        }, (expires_in / 2) * 1000);
      } catch (error) {
        res.redirect(spotifyApi.createAuthorizeURL(scopes));
      }
    })
    .catch((error) => {
      console.error("Error getting Tokens:", error);
      res.send(`Error getting Tokens: ${error}`);
    });
});

app.get("/getPlayList", async (req, res) => {
  if (accessToken) {
    const data = await application.getMyData();
    res.send(JSON.stringify({ data }));
  } else {
    res.send(false);
  }
});

app.listen(8888, () => console.log("Listening 8888 port"));
