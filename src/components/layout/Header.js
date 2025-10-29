import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  // Properties---------------------------
  // Hooks--------------------------------
  // Context------------------------------
  // Methods------------------------------
  // View---------------------------------

  return (
    <header>
        <Link to ="/">
        <img
          src="https://ih1.redbubble.net/image.1830038662.8518/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
          alt="flowers"
        />
      </Link>
      <Link to ="/">
      <h1> Zent </h1>
      </Link>
      <div className="login">
        <p> Welcome Merrone </p>
      </div>
    </header>
  );
}

export default Header;
