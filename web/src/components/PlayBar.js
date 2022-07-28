import '../assets/css/player-bar.css'

function PlayBar(props) {
  return (
    <footer className="bar pbar">
      <input className="time-bar" type="range" min="0" max="100" step="1" />
      <div className="player">
        <div className="current">
          <img
            src="https://via.placeholder.com/100"
            alt="current music thumbnail"
          />
          <div className="text">
            <p id="current-name">playing music name</p>
            <p id="current-artist">artist name</p>
          </div>
          <button>
            <span className="icon likesong"></span>
          </button>
        </div>

        <div className="controls">
          <button className="back-btn">
            <span className="icon icon-skip-back"></span>
          </button>
          <button className="pause-btn">
            <span className="icon icon-pause2"></span>
          </button>
          <button className="forward-btn">
            <span className="icon icon-skip-forward"></span>
          </button>
        </div>

        {/* <div className="audio">
                <button className="volume-mute"><span className="icon icon-audio"></span></button>
                <input className="vol" type="range" min="0" max="1" step="0.005" />
            </div> 
        
            <div className="extra">
                <button className="repeat"><span className="icon icon-repeat"></span></button>
                <button className="mix"><span className="icon icon-mix"></span></button>
                <button className="queue"><span className="icon icon-queue"></span></button>
            </div> */}
      </div>
    </footer>
  );
}

export default PlayBar;
