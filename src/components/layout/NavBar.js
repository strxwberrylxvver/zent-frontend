import { NavLink } from "react-router-dom";
import "./NavBar.css";
import DashboardIcon from "../assets/icons/DashboardIcon.png";

function NavBar() {
  const getLinkStyle = ({ isActive }) => (isActive ? "navSelected" : null);

  return (
    <nav>
      <div className="navItem">
        <img src={DashboardIcon} alt="dashboard" />
        <NavLink to="/dashboard" className={getLinkStyle}>
          DashBoard
        </NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/budgets" className={getLinkStyle}>
          Budgets
        </NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/goals" className={getLinkStyle}>
          Goals
        </NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/analytics" className={getLinkStyle}>
          Analytics
        </NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/sharedbills" className={getLinkStyle}>
          Shared Bills
        </NavLink>
      </div>
      
    </nav>
  );
}

export default NavBar;
