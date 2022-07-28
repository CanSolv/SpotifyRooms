import '../assets/css/nav.css'

function Nav(props) {
  return (
    <nav className="bar nbar">
      <a href="/" className="bar lbar home">
        <span className="icon icon-home"></span>
      </a>
      <a href="/" className="bar lbar explore">
        <span className="icon icon-explore"></span>
      </a>
      <a href="/" className="bar lbar library">
        <span className="icon icon-library"></span>
      </a>
    </nav>
  );
}

export default Nav;
