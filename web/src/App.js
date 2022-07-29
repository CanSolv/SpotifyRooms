import { useState } from "react";
import request from "axios";

import Favs from "./components/Favs";
import Friends from "./components/Friends";
import Header from "./components/Header";
import Nav from "./components/Nav";
import NewTracks from "./components/NewTracks";
import PlayBar from "./components/PlayBar";
import RoomsForYou from "./components/RoomsForYou";

function App() {
  const [data, setData] = useState([]);

  return (
    <>
      <Header />
      <div className="content">
        <div className="wrapper">
          <button
            type="button"
            onClick={() => {
              request
                .get("http://localhost:8888/getPlayList")
                .then((res) => {
                  setData(res.data.data);
                })
                .catch((err) => console.log(err));
            }}
          >
            Get Play List
          </button>

          {data.length > 0 ? (
            <>
              {data.map((item, key) => {
                return <div key={key}>{item.playlistName}</div>;
              })}
            </>
          ) : (
            <div>no data to display</div>
          )}

          <RoomsForYou />
          <Favs />
          <Friends />
          <NewTracks />
        </div>
      </div>
      <PlayBar />
      <Nav />
    </>
  );
}

export default App;
