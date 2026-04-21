import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import "./TopBar.css";

function TopBar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const unreadCount = 3;

  return (
    <div className="topSection">
      <div className="topBarRight">

        <button
          className="topBarBtn"
          onClick={() => navigate("/notifications")}
          aria-label="Notifications"
        >
          <span className="topBarIcon">🔔</span>
          {unreadCount > 0 && (
            <span className="notifBadge">{unreadCount}</span>
          )}
        </button>

        <button
          className="topBarBtn topBarAvatarBtn"
          onClick={() => navigate("/profile")}
          aria-label="Profile"
        >
          <div className="topBarAvatar">
            {user?.firstName?.[0]?.toUpperCase() ?? "?"}
          </div>
          <span className="topBarName">{user?.firstName}</span>
        </button>

      </div>
    </div>
  );
}

export default TopBar;