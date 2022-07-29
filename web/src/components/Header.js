import "../assets/css/header.css";

function Header(props) {
  return (
    <header>
      <div className="bar tbar">
        <div className="search-container">
          <input
            id="searchInput"
            type="text"
            maxLength="200"
            placeholder="Search..."
          />
        </div>

        <div className="speech"></div>

        <div className="profile-buttons">
          <a>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKH-duOReqDWeZ_plPcMTnFoKwpa-Y8xnQg&usqp=CAU"
              alt="profile picture"
              className="pfp"
            />
          </a>
          <div className="hoverable">
            <a href="#" className="notifications">
              <span className="icon icon-noti"></span>
            </a>
            <a href="#" className="settings">
              <span className="icon icon-set"></span>
            </a>
            <a href="#" className="bookmarks">
              <span className="icon icon-bookmark"></span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
