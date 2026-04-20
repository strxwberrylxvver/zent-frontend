import { useState } from "react";
import "./NotificationsPage.css";

const DUMMY_NOTIFICATIONS = [
  { id: 1, type: "goal",        title: "Goal milestone reached!",          body: "You're 75% of the way to your Emergency Fund goal.",   time: "2h ago",  read: false },
  { id: 2, type: "budget",      title: "Budget warning — Groceries",       body: "You've used 90% of your Groceries budget this month.",  time: "4h ago",  read: false },
  { id: 3, type: "xp",          title: "Level up! 🎉",                     body: "You reached Level 2. Keep tracking to earn more XP.",  time: "6h ago",  read: false },
  { id: 4, type: "transaction", title: "New transaction added",            body: "£94.00 — Bamboo Cotton Tank Top was logged.",          time: "1d ago",  read: true  },
  { id: 5, type: "budget",      title: "Budget exceeded — Transport",      body: "You've gone over your Transport budget by £12.00.",    time: "2d ago",  read: true  },
  { id: 6, type: "goal",        title: "New Phone goal completed! 🏆",     body: "You hit your £55.00 target. Time to set a new goal.",  time: "3d ago",  read: true  },
  { id: 7, type: "xp",          title: "XP earned",                        body: "You earned 10 XP for adding a transaction.",           time: "3d ago",  read: true  },
  { id: 8, type: "transaction", title: "Large transaction detected",       body: "£5,000.07 — Special Chicken Nuggets. Was this you?",   time: "5d ago",  read: true  },
];

const TYPE_ICONS = {
  goal:        "🎯",
  budget:      "💰",
  xp:          "⭐",
  transaction: "💳",
};

function NotificationsPage() {
  const [notifications, setNotifications] = useState(DUMMY_NOTIFICATIONS);
  const [filter, setFilter] = useState("all");

  const markAllRead = () =>
    setNotifications((n) => n.map((item) => ({ ...item, read: true })));

  const markRead = (id) =>
    setNotifications((n) => n.map((item) => item.id === id ? { ...item, read: true } : item));

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = filter === "unread"
    ? notifications.filter((n) => !n.read)
    : notifications;

  return (
    <section className="notificationsPage">
      <div className="notificationsHeader">
        <div>
          <h1 className="notificationsTitle">Notifications</h1>
          <p className="notificationsSub">Your inbox</p>
        </div>
        <div className="notificationsActions">
          <div className="notificationsFilters">
            <button
              className={`notifFilter${filter === "all" ? " notifFilter--active" : ""}`}
              onClick={() => setFilter("all")}
            >All</button>
            <button
              className={`notifFilter${filter === "unread" ? " notifFilter--active" : ""}`}
              onClick={() => setFilter("unread")}
            >Unread {unreadCount > 0 && <span className="notifBadge">{unreadCount}</span>}</button>
          </div>
          {unreadCount > 0 && (
            <button className="notifMarkAll" onClick={markAllRead}>Mark all read</button>
          )}
        </div>
      </div>

      <p className="notifCount">{filtered.length} of {notifications.length}</p>

      <div className="notifList">
        {filtered.length === 0 && (
          <div className="notifEmpty">
            <span>🎉</span>
            <p>You're all caught up!</p>
          </div>
        )}
        {filtered.map((n) => (
          <div
            key={n.id}
            className={`notifItem${n.read ? "" : " notifItem--unread"}`}
            onClick={() => markRead(n.id)}
          >
            <div className="notifIcon">{TYPE_ICONS[n.type]}</div>
            <div className="notifContent">
              <p className="notifItemTitle">{n.title}</p>
              <p className="notifItemBody">{n.body}</p>
            </div>
            <div className="notifRight">
              <span className="notifTime">{n.time}</span>
              {!n.read && <span className="notifDot" />}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NotificationsPage;