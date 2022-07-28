import Favs from "./components/Favs";
import Friends from "./components/Friends";
import Header from "./components/Header";
import Nav from "./components/Nav";
import NewTracks from "./components/NewTracks";
import PlayBar from "./components/PlayBar";
import RoomsForYou from "./components/RoomsForYou";

function App() {
  return (
    <>
      <Header />
      <div className="content">
        <div className="wrapper">
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
