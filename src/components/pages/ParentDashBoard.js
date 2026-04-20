import { useState } from "react";
import { useAuth } from "../auth/useAuth";
import { API } from "../api/API";
import useLoad from "../api/useLoad";
import "./ParentDashBoard.css";

const fmt = (n) => `£${Math.abs(Number(n)).toFixed(2)}`;

function LinkStudentForm({ onLinked }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLink = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    const res = await API.post("/links", { studentEmail: email.trim(), linkType: "parent" });
    if (res.isSuccess) {
      setEmail("");
      onLinked();
    } else {
      setError(res.message);
    }
    setLoading(false);
  };

  return (
    <div className="parentLinkForm">
      <h2>Link a child's account</h2>
      <p>Ask your child for their Zent email address to view their dashboard.</p>
      <div className="parentLinkRow">
        <input
          type="email"
          placeholder="child@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="parentLinkInput"
        />
        <button className="parentLinkBtn" onClick={handleLink} disabled={loading}>
          {loading ? "Linking…" : "+ Link child"}
        </button>
      </div>
      {error && <p className="parentError">{error}</p>}
    </div>
  );
}

function StudentOverview({ student }) {
  const [transactions] = useLoad(`/transactions/users/${student.StudentID}`);
  const [goals] = useLoad(`/savingsgoals/users/${student.StudentID}`);
  const [budgets] = useLoad(`/budgets/users/${student.StudentID}`);

  const income  = (transactions || []).filter((t) => Number(t.Amount) > 0).reduce((s, t) => s + Number(t.Amount), 0);
  const expense = (transactions || []).filter((t) => Number(t.Amount) < 0).reduce((s, t) => s + Math.abs(Number(t.Amount)), 0);
  const balance = income - expense;

  return (
    <div className="parentStudentCard">
      <h2 className="parentStudentName">{student.FirstName}'s Dashboard</h2>

      <div className="parentStatRow">
        <div className="parentStat">
          <span className="parentStatLabel">Total Balance</span>
          <span className="parentStatValue">{fmt(balance)}</span>
        </div>
        <div className="parentStat">
          <span className="parentStatLabel">Monthly Budget</span>
          <span className="parentStatValue">
            {budgets ? fmt(budgets.reduce((s, b) => s + Number(b.TotalAmount), 0)) : "—"}
          </span>
        </div>
        <div className="parentStat">
          <span className="parentStatLabel">Active Goals</span>
          <span className="parentStatValue">{goals?.length ?? "—"}</span>
        </div>
      </div>

      {budgets && budgets.length > 0 && (
        <div className="parentSection">
          <h3>Budget Overview</h3>
          {budgets.slice(0, 4).map((b) => {
            const pct = Math.min((b.UsedAmount / b.TotalAmount) * 100, 100);
            return (
              <div key={b.BudgetID} className="parentBudgetRow">
                <span className="parentBudgetName">{b.BudgetName}</span>
                <div className="parentBudgetTrack">
                  <div
                    className="parentBudgetFill"
                    style={{ width: `${pct}%`, background: pct > 90 ? "#e57373" : "#8fbc8f" }}
                  />
                </div>
                <span className="parentBudgetMeta">
                  {fmt(b.UsedAmount)}/{fmt(b.TotalAmount)}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {goals && goals.length > 0 && (
        <div className="parentSection">
          <h3>Savings Goals</h3>
          <div className="parentGoalsRow">
            {goals.slice(0, 3).map((g) => {
              const pct = Math.min((g.SavedAmount / g.TargetAmount) * 100, 100);
              return (
                <div key={g.GoalID} className="parentGoalCard">
                  <p className="parentGoalName">{g.GoalName}</p>
                  <div className="parentBudgetTrack">
                    <div className="parentBudgetFill" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="parentBudgetMeta">{fmt(g.SavedAmount)} / {fmt(g.TargetAmount)}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ParentDashBoard() {
  const { user } = useAuth();
  const [students, , , reloadStudents] = useLoad("/links/my-students");

  return (
    <div className="parentDash">
      <LinkStudentForm onLinked={() => reloadStudents("/links/my-students")} />

      {!students ? (
        <p className="parentLoading">Loading linked children…</p>
      ) : students.length === 0 ? (
        <div className="parentEmpty">
          <span>👨‍👩‍👧</span>
          <p>No children linked yet. Enter their email above to get started.</p>
        </div>
      ) : (
        students.map((s) => <StudentOverview key={s.StudentID} student={s} />)
      )}
    </div>
  );
}

export default ParentDashBoard;