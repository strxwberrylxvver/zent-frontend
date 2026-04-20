import { useState } from "react";
import { API } from "../api/API";
import useLoad from "../api/useLoad";
import "./AdvisorDashBoard.css";

const fmt = (n) => `£${Math.abs(Number(n)).toFixed(2)}`;

const MONTH_LABELS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function LinkStudentForm({ onLinked }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLink = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    const res = await API.post("/links", { studentEmail: email.trim(), linkType: "advisor" });
    if (res.isSuccess) { setEmail(""); onLinked(); }
    else setError(res.message);
    setLoading(false);
  };

  return (
    <div className="advisorLinkForm">
      <h2>Add a student</h2>
      <p>Enter the student's Zent email to link their account.</p>
      <div className="advisorLinkRow">
        <input
          type="email" placeholder="student@email.com"
          value={email} onChange={(e) => setEmail(e.target.value)}
          className="advisorLinkInput"
        />
        <button className="advisorLinkBtn" onClick={handleLink} disabled={loading}>
          {loading ? "Linking…" : "+ Add student"}
        </button>
      </div>
      {error && <p className="advisorError">{error}</p>}
    </div>
  );
}

function SpendingChart({ transactions }) {
  const now = new Date();
  const map = {};
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    map[`${d.getFullYear()}-${d.getMonth()}`] = { label: MONTH_LABELS[d.getMonth()], value: 0 };
  }
  (transactions || []).forEach((t) => {
    const d = new Date(t.Date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (key in map) map[key].value += Math.abs(Number(t.Amount));
  });
  const bars = Object.values(map);
  const max = Math.max(...bars.map((b) => b.value), 1);

  return (
    <div className="advisorChartWrap">
      <div className="advisorChartBars">
        {bars.map(({ label, value }) => (
          <div key={label} className="advisorChartGroup">
            <div className="advisorChartTrack">
              <div
                className="advisorChartFill"
                style={{ height: `${(value / max) * 100}%` }}
                title={fmt(value)}
              />
            </div>
            <span className="advisorChartLabel">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentPanel({ student, onRemove }) {
  const [transactions] = useLoad(`/transactions/users/${student.StudentID}`);
  const [goals]        = useLoad(`/savingsgoals/users/${student.StudentID}`);
  const [budgets]      = useLoad(`/budgets/users/${student.StudentID}`);

  const income  = (transactions || []).filter((t) => Number(t.Amount) > 0).reduce((s, t) => s + Number(t.Amount), 0);
  const expense = (transactions || []).filter((t) => Number(t.Amount) < 0).reduce((s, t) => s + Math.abs(Number(t.Amount)), 0);
  const thisMonthExpense = (transactions || []).filter((t) => {
    const d = new Date(t.Date); const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() && Number(t.Amount) < 0;
  }).reduce((s, t) => s + Math.abs(Number(t.Amount)), 0);

  return (
    <div className="advisorStudentPanel">
      <div className="advisorStudentHeader">
        <div className="advisorStudentAvatar">
          {student.FirstName?.[0]}{student.LastName?.[0]}
        </div>
        <div>
          <h2 className="advisorStudentName">{student.FirstName} {student.LastName}</h2>
          <p className="advisorStudentSub">Overview of {student.FirstName}'s financial health</p>
        </div>
        <button className="advisorRemoveBtn" onClick={() => onRemove(student.LinkID)} title="Remove student">✕</button>
      </div>

      <div className="advisorStatsRow">
        <div className="advisorStat">
          <span className="advisorStatLabel">Balance</span>
          <span className="advisorStatValue">{fmt(income - expense)}</span>
        </div>
        <div className="advisorStat">
          <span className="advisorStatLabel">This month's expense</span>
          <span className="advisorStatValue">{fmt(thisMonthExpense)}</span>
        </div>
        <div className="advisorStat">
          <span className="advisorStatLabel">Total transactions</span>
          <span className="advisorStatValue">{transactions?.length ?? "—"}</span>
        </div>
        <div className="advisorStat">
          <span className="advisorStatLabel">Goals</span>
          <span className="advisorStatValue">{goals?.length ?? "—"}</span>
        </div>
      </div>

      <div className="advisorPanelGrid">
        {budgets && budgets.length > 0 && (
          <div className="advisorCard">
            <h3>Budget Overview</h3>
            {budgets.slice(0, 5).map((b) => {
              const pct = Math.min((b.UsedAmount / b.TotalAmount) * 100, 100);
              return (
                <div key={b.BudgetID} className="advisorBudgetRow">
                  <span className="advisorBudgetName">{b.BudgetName}</span>
                  <div className="advisorBudgetTrack">
                    <div
                      className="advisorBudgetFill"
                      style={{ width: `${pct}%`, background: pct > 90 ? "#e57373" : "#8fbc8f" }}
                    />
                  </div>
                  <span className="advisorBudgetMeta">{fmt(b.UsedAmount)}/{fmt(b.TotalAmount)}</span>
                </div>
              );
            })}
          </div>
        )}

        <div className="advisorCard">
          <h3>Total Balance Overview</h3>
          <SpendingChart transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

function AdvisorDashBoard() {
  const [students, , , reloadStudents] = useLoad("/links/my-students");

  const handleRemove = async (linkID) => {
    await API.delete(`/links/${linkID}`);
    reloadStudents("/links/my-students");
  };

  return (
    <div className="advisorDash">
      <LinkStudentForm onLinked={() => reloadStudents("/links/my-students")} />

      {!students ? (
        <p className="advisorLoading">Loading students…</p>
      ) : students.length === 0 ? (
        <div className="advisorEmpty">
          <span>👨‍🏫</span>
          <p>No students linked yet. Add a student above to get started.</p>
        </div>
      ) : (
        students.map((s) => (
          <StudentPanel key={s.StudentID} student={s} onRemove={handleRemove} />
        ))
      )}
    </div>
  );
}

export default AdvisorDashBoard;