import GoalsCrudler from "../entities/savingsgoals/GoalsCrudler";
import TransactionsTable from "../entities/transactions/TransactionsTable";
import useLoad from "../api/useLoad";
import { useAuth } from "../auth/useAuth";
import { useMemo } from "react";
import "./StudentDashBoard.css";

const MONTH_LABELS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const fmt = (n) => {
  const abs = Math.abs(Number(n));
  const whole = Math.floor(abs).toLocaleString("en-GB");
  const dec = (abs % 1).toFixed(2).slice(1);
  return { whole, dec, sign: Number(n) >= 0 ? "" : "-" };
};

function StatCard({ label, whole, dec, sign, sub, accent }) {
  return (
    <div className="dashStatCard" style={{ "--accent": accent }}>
      <div className="dashStatLabel">{label}</div>
      <div className="dashStatValue">
        {sign}£{whole}<span className="dashStatDec">{dec}</span>
      </div>
      {sub && <div className="dashStatSub">{sub}</div>}
    </div>
  );
}

function SpendingChart({ transactions }) {
  const bars = useMemo(() => {
    if (!transactions) return [];
    const now = new Date();
    const map = {};
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      map[`${d.getFullYear()}-${d.getMonth()}`] = { label: MONTH_LABELS[d.getMonth()], income: 0, expense: 0 };
    }
    transactions.forEach((t) => {
      const d = new Date(t.Date);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (!(key in map)) return;
      const amt = Number(t.Amount);
      if (amt >= 0) map[key].income += amt;
      else map[key].expense += Math.abs(amt);
    });
    return Object.values(map);
  }, [transactions]);

  const max = Math.max(...bars.flatMap((b) => [b.income, b.expense]), 1);

  return (
    <div className="dashChart">
      <div className="dashChartHeader">
        <span className="dashChartTitle">Money flow</span>
        <div className="dashChartLegend">
          <span className="dashLegendDot" style={{ background: "#8fbc8f" }} />Income
          <span className="dashLegendDot" style={{ background: "#b7d4b3", marginLeft: 12 }} />Expense
        </div>
      </div>
      <div className="dashChartBars">
        {bars.map(({ label, income, expense }) => (
          <div key={label} className="dashChartGroup">
            <div className="dashChartBarPair">
              <div className="dashChartBar dashChartBar--income" style={{ height: `${(income / max) * 100}%` }} title={`Income £${income.toFixed(2)}`} />
              <div className="dashChartBar dashChartBar--expense" style={{ height: `${(expense / max) * 100}%` }} title={`Expense £${expense.toFixed(2)}`} />
            </div>
            <span className="dashChartLabel">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentDashBoard() {
  const { user } = useAuth();
  const transactionsEndpoint = `/transactions/users/${user?.userID}`;
  const goalsEndpoint = `/savingsgoals/users/${user?.userID}`;
  const [transactions] = useLoad(transactionsEndpoint);

  const stats = useMemo(() => {
    if (!transactions) return null;
    const now = new Date();
    const income = transactions.filter((t) => Number(t.Amount) > 0).reduce((s, t) => s + Number(t.Amount), 0);
    const expense = transactions.filter((t) => Number(t.Amount) < 0).reduce((s, t) => s + Math.abs(Number(t.Amount)), 0);
    const balance = income - expense;
    const monthTx = transactions.filter((t) => {
      const d = new Date(t.Date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    const monthSpend = monthTx.filter((t) => Number(t.Amount) < 0).reduce((s, t) => s + Math.abs(Number(t.Amount)), 0);
    return { balance, income, expense, monthSpend, txCount: transactions.length };
  }, [transactions]);

  const sorted = transactions
    ? [...transactions].sort((a, b) => new Date(b.Date) - new Date(a.Date)).slice(0, 8)
    : [];

  return (
    <div className="studentDash">
      {stats && (
        <div className="dashStatsRow">
          <StatCard label="Total Balance" {...fmt(stats.balance)} sub={`${stats.txCount} transactions`} accent="#8fbc8f" />
          <StatCard label="Total Income"  {...fmt(stats.income)}  sub="all time" accent="#66bb6a" />
          <StatCard label="Total Expense" {...fmt(-stats.expense)} sub="all time" accent="#b7d4b3" />
          <StatCard label="This Month"    {...fmt(-stats.monthSpend)} sub="spending" accent="#a8d5a2" />
        </div>
      )}

      <div className="dashMidRow">
        <SpendingChart transactions={transactions} />
      </div>

      <div className="dashboardGrid">
        <div className="transactionsBox">
          <div className="dashSectionHeader">
            <h2>Recent Transactions</h2>
          </div>
          {!transactions ? (
            <p className="dashLoading">Loading...</p>
          ) : transactions.length === 0 ? (
            <p className="dashEmpty">No transactions yet.</p>
          ) : (
            <TransactionsTable transactions={sorted} onSelect={() => {}} />
          )}
        </div>

        <div className="dashGoals">
          <GoalsCrudler endpoint={goalsEndpoint} />
        </div>
      </div>
    </div>
  );
}

export default StudentDashBoard;