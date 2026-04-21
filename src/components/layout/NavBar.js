import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import "./NavBar.css";
import DashboardIcon from "../assets/icons/DashboardIcon.png";
import BudgetsIcon from "../assets/icons/BudgetsIcon.png";
import TransactionsIcon from "../assets/icons/TransactionsIcon.png";
import GoalsIcon from "../assets/icons/GoalsIcon.png";
import AnalyticsIcon from "../assets/icons/AnalyticsIcon.png";
import HouseholdIcon from "../assets/icons/HouseholdIcon.png";

function NavBar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const isParent = user?.userType === "Parent";
  const isAdvisor = user?.userType === "Financial Advisor";

  const getLinkStyle = ({ isActive }) =>
    isActive ? "navLink navSelected" : "navLink";

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <nav>
      <div className="navLinks">
        <div className="navItem">
          <NavLink to="/" className={getLinkStyle}>
            <img src={DashboardIcon} alt="dashboard" className="nav-icon" />
            <h2 className="nav-text">Dashboard</h2>
          </NavLink>
        </div>

        {!isParent && !isAdvisor && (
          <>
            <div className="navItem">
              <NavLink to="/transactions" className={getLinkStyle}>
                <img
                  src={TransactionsIcon}
                  alt="transactions"
                  className="nav-icon"
                />
                <h2 className="nav-text">Transactions</h2>
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
                <img
                  src={HouseholdIcon}
                  alt="shared bills"
                  className="nav-icon"
                />
                <h2 className="nav-text">Shared Bills</h2>
              </NavLink>
            </div>
          </>
        )}
      </div>

      <div className="navBottom">
        <div className="navItem">
          <NavLink to="/contact" className={getLinkStyle}>
            <span className="nav-icon navBottomIcon">?</span>
            <h2 className="nav-text">Help</h2>
          </NavLink>
        </div>
        <div className="navItem">
          <button className="navLink navLogoutBtn" onClick={handleLogout}>
            <span className="nav-icon navBottomIcon">↪</span>
            <h2 className="nav-text">Log out</h2>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
