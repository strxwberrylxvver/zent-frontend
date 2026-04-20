import { useState } from "react";
import { useAuth } from "../auth/useAuth";
import { API } from "../api/API";
import useLoad from "../api/useLoad";
import FormItem from "../UI/Form";
import "./ProfilePage.css";

const LEVEL_COLORS = ["#8fbc8f","#66bb6a","#43a047","#2e7d32","#1b5e20"];
const xpForNextLevel = (level) => level * 100;

function XPBar({ xp, level }) {
  const needed = xpForNextLevel(level);
  const pct = Math.min((xp / needed) * 100, 100);
  return (
    <div className="profileXpSection">
      <div className="profileXpHeader">
        <span className="profileXpLevel" style={{ color: LEVEL_COLORS[Math.min(level - 1, 4)] }}>
          Level {level}
        </span>
        <span className="profileXpCount">{xp} / {needed} XP</span>
      </div>
      <div className="profileXpTrack">
        <div className="profileXpFill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function ProfilePage() {
  const { user, login } = useAuth();
  const [xpData] = useLoad("/xp/me");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    FirstName: user?.firstName || "",
    LastName: user?.lastName || "",
    Email: user?.email || "",
  });
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");
    const res = await API.put(`/users/${user.userID}`, form);
    if (res.isSuccess) {
      login({ ...user, firstName: form.FirstName, lastName: form.LastName, email: form.Email });
      setSuccess("Profile updated.");
      setEditing(false);
    } else {
      setError(res.message);
    }
    setSaving(false);
  };

  const handlePasswordChange = async () => {
    if (pwForm.next !== pwForm.confirm) return setError("New passwords don't match.");
    setSaving(true);
    setError("");
    const res = await API.post("/auth/change-password", {
      currentPassword: pwForm.current,
      newPassword: pwForm.next,
    });
    if (res.isSuccess) {
      setSuccess("Password changed.");
      setPwForm({ current: "", next: "", confirm: "" });
    } else {
      setError(res.message);
    }
    setSaving(false);
  };

  const initials = `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase() || "?";

  return (
    <section className="profilePage">
      <div className="profileHero">
        <div className="profileAvatar">{initials}</div>
        <div className="profileHeroInfo">
          <h1 className="profileName">{user?.firstName} {user?.lastName}</h1>
          <span className="profileHandle">@{user?.firstName?.toLowerCase()}</span>
          <span className="profileBadge">{user?.userType}</span>
        </div>
        {xpData && <XPBar xp={xpData.CurrentXP} level={xpData.Level} />}
      </div>

      <div className="profileGrid">
        <div className="profileCard">
          <div className="profileCardHeader">
            <h2>Profile info</h2>
            <p className="profileCardSub">View and edit your profile information</p>
            <button
              className="profileEditBtn"
              onClick={() => { setEditing((e) => !e); setError(""); setSuccess(""); }}
            >
              {editing ? "Cancel" : "✎ Edit"}
            </button>
          </div>

          <div className="profileFields">
            <FormItem label="First name" htmlFor="FirstName">
              <input
                id="FirstName" name="FirstName" type="text"
                value={form.FirstName} onChange={handleChange}
                disabled={!editing}
                className={editing ? "" : "profileFieldReadonly"}
              />
            </FormItem>
            <FormItem label="Last name" htmlFor="LastName">
              <input
                id="LastName" name="LastName" type="text"
                value={form.LastName} onChange={handleChange}
                disabled={!editing}
                className={editing ? "" : "profileFieldReadonly"}
              />
            </FormItem>
            <FormItem label="Email" htmlFor="Email">
              <input
                id="Email" name="Email" type="email"
                value={form.Email} onChange={handleChange}
                disabled={!editing}
                className={editing ? "" : "profileFieldReadonly"}
              />
            </FormItem>
            <FormItem label="User type" htmlFor="userType">
              <input id="userType" type="text" value={user?.userType} disabled className="profileFieldReadonly" />
            </FormItem>
          </div>

          {editing && (
            <button className="profileSaveBtn" onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </button>
          )}

          {error   && <p className="profileError">{error}</p>}
          {success && <p className="profileSuccess">{success}</p>}
        </div>

        <div className="profileCard">
          <div className="profileCardHeader">
            <h2>Change password</h2>
            <p className="profileCardSub">Keep your account secure</p>
          </div>
          <div className="profileFields">
            <FormItem label="Current password" htmlFor="current">
              <input id="current" type="password" value={pwForm.current}
                onChange={(e) => setPwForm((p) => ({ ...p, current: e.target.value }))} />
            </FormItem>
            <FormItem label="New password" htmlFor="next">
              <input id="next" type="password" value={pwForm.next}
                onChange={(e) => setPwForm((p) => ({ ...p, next: e.target.value }))} />
            </FormItem>
            <FormItem label="Confirm new password" htmlFor="confirm">
              <input id="confirm" type="password" value={pwForm.confirm}
                onChange={(e) => setPwForm((p) => ({ ...p, confirm: e.target.value }))} />
            </FormItem>
          </div>
          <button className="profileSaveBtn" onClick={handlePasswordChange} disabled={saving}>
            {saving ? "Saving…" : "Update password"}
          </button>
        </div>

        <div className="profileCard profileCard--badges">
          <div className="profileCardHeader">
            <h2>Badges</h2>
            <p className="profileCardSub">All the badges you've earned</p>
          </div>
          <div className="profileBadges">
            {[
              { icon: "🌱", name: "First Step",    desc: "Added your first transaction" },
              { icon: "🎯", name: "Goal Setter",   desc: "Created your first savings goal" },
              { icon: "💰", name: "Budget Master", desc: "Stayed under budget for a month" },
              { icon: "⭐", name: "Level 5",       desc: "Reached Level 5", locked: (xpData?.Level ?? 0) < 5 },
              { icon: "🔥", name: "On a Roll",     desc: "10 transactions in a month",    locked: true },
              { icon: "🏆", name: "Zent Pro",      desc: "Used Zent for 3 months",        locked: true },
            ].map(({ icon, name, desc, locked }) => (
              <div key={name} className={`profileBadge${locked ? " profileBadge--locked" : ""}`}>
                <span className="profileBadgeIcon">{icon}</span>
                <span className="profileBadgeName">{name}</span>
                <span className="profileBadgeDesc">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;