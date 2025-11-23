import { NavLink } from "react-router-dom";
import "./NavBar.css";
import DashboardIcon from "../assets/icons/DashboardIcon.png";

function NavBar() {
  // Properties---------------------------
  // Hooks--------------------------------
  // Context------------------------------
  // Methods------------------------------

  const getLinkStyle = ({ isActive }) => (isActive ? "navSelected" : null);

  // View---------------------------------

  return (
    <nav>
      <div className="navItem">
        <img src={DashboardIcon} alt="dashboard" />

        <NavLink to="/" className={getLinkStyle}>
          DashBoard
        </NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/signin" className={getLinkStyle}>
          Sign In
        </NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/contact" className={getLinkStyle}>
          Contact Us
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
