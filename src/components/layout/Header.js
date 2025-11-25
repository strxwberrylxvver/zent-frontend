import { Link } from "react-router-dom";
import "./Header.css";
import LotusIcon from "../assets/icons/LotusIcon.png";

function Header() {
  return (
    <header>
      <Link to="/">
        <img src={LotusIcon} alt="lotus flower" />
      </Link>
      <Link to="/">
        <h1> Zent </h1>
      </Link>
      <div className="login"></div>
    </header>
  );
}

export default Header;
