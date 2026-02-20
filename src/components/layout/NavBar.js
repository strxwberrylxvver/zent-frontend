import { NavLink } from "react-router-dom";
import "./NavBar.css";
import DashboardIcon from "../assets/icons/DashboardIcon.png";
import BudgetsIcon from "../assets/icons/BudgetsIcon.png";
import GoalsIcon from "../assets/icons/GoalsIcon.png";
import AnalyticsIcon from "../assets/icons/AnalyticsIcon.png";
import HouseholdIcon from "../assets/icons/HouseholdIcon.png";

function NavBar() {
  const getLinkStyle = ({ isActive }) => (isActive ? "navSelected" : null);

  return (
    <nav>
      <div className="navItem">
        <NavLink to="/dashboard" className={getLinkStyle}>
          <img src={DashboardIcon} alt="dashboard" className="nav-icon" />
          <h2 className="nav-text">DashBoard</h2>
        </NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/budgets" className={getLinkStyle}>
          <img src={BudgetsIcon} alt="budgets" className="nav-icon" />
          <h2 className="nav-text">Budgets</h2>
        </NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/goals" className={getLinkStyle}>
          <img src={GoalsIcon} alt="goals" className="nav-icon" />
          <h2 className="nav-text">Goals</h2>
        </NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/analytics" className={getLinkStyle}>
          <img src={AnalyticsIcon} alt="analytics" className="nav-icon" />
          <h2 className="nav-text">Analytics</h2>
        </NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/sharedbills" className={getLinkStyle}>
          <img src={HouseholdIcon} alt="shared bills" className="nav-icon" />
          <h2 className="nav-text">Shared Bills</h2>
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
