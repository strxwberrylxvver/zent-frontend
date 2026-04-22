import TransactionsTable from "../entities/transactions/TransactionsTable";
import useLoad from "../api/useLoad";
import { useAuth } from "../auth/useAuth";
import { useMemo } from "react";
import "./StudentDashBoard.css";

const MONTH_LABELS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const MOCK_BILLS = [
  { id: 1, name: "Monthly Rent",     amount: 2300, split: 4, paid: ["you", "alice"] },
  { id: 2, name: "Internet",         amount: 60,   split: 4, paid: ["you", "alice", "bob"] },
  { id: 3, name: "Electricity",      amount: 120,  split: 4, paid: ["alice"] },
  { id: 4, name: "Groceries (Week)", amount: 280,  split: 4, paid: ["you"] },
  { id: 5, name: "Council Tax",      amount: 180,  split: 4, paid: ["you", "alice", "bob", "carol"] },
  { id: 6, name: "Netflix",          amount: 18,   split: 4, paid: [] },
];

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

function GoalsOverview({ goals }) {
  if (!goals) return <p className="dashLoading">Loading...</p>;
  if (goals.length === 0) return <p className="dashEmpty">No goals yet.</p>;

  const recent = [...goals]
    .sort((a, b) => new Date(b.TargetDate) - new Date(a.TargetDate))
    .slice(0, 3);

  return (
    <div className="dashGoalsOverview">
      {recent.map((goal) => {
        const saved = parseFloat(goal.SavedAmount) || 0;
        const target = parseFloat(goal.TargetAmount) || 1;
        const pct = Math.min(Math.round((saved / target) * 100), 100);
        const isComplete = saved >= target;
        return (
          <div key={goal.GoalID} className="dashGoalItem">
            <div className="dashGoalTop">
              <span className="dashGoalName">{goal.GoalName}</span>
              {isComplete && <span className="dashGoalBadge">✓ Done</span>}
            </div>
            <div className="dashGoalBar">
              <div className="dashGoalFill" style={{ width: `${pct}%` }} />
              <span className="dashGoalPct">{pct}%</span>
            </div>
            <div className="dashGoalAmounts">
              <span>£{saved.toFixed(2)} saved</span>
              <span>£{target.toFixed(2)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StudentDashBoard() {
  const { user } = useAuth();
  const transactionsEndpoint = `/transactions/users/${user?.userID}`;
  const goalsEndpoint = `/savingsgoals/users/${user?.userID}`;
  const budgetsEndpoint = `/budgets/users/${user?.userID}`;

  const [transactions] = useLoad(transactionsEndpoint);
  const [goals] = useLoad(goalsEndpoint);
  const [budgets] = useLoad(budgetsEndpoint);

  const stats = useMemo(() => {
    if (!transactions) return null;
    const now = new Date();
    const income  = transactions.filter((t) => Number(t.Amount) > 0).reduce((s, t) => s + Number(t.Amount), 0);
    const expense = transactions.filter((t) => Number(t.Amount) < 0).reduce((s, t) => s + Math.abs(Number(t.Amount)), 0);
    const balance = income - expense;
    const txCount = transactions.length;
    return { balance, txCount };
  }, [transactions]);

  const monthlyBudget = useMemo(() => {
    if (!budgets) return null;
    const now = new Date();
    const thisMonth = budgets.filter((b) => {
      const d = new Date(b.BudgetDate);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    return thisMonth.reduce((s, b) => s + Number(b.TotalAmount), 0);
  }, [budgets]);

  const sharedBillsOwed = useMemo(() => {
    return MOCK_BILLS.reduce((s, b) => {
      if (!b.paid.includes("you")) return s + b.amount / b.split;
      return s;
    }, 0);
  }, []);

  const sorted = transactions
    ? [...transactions].sort((a, b) => new Date(b.Date) - new Date(a.Date)).slice(0, 8)
    : [];

  return (
    <div className="studentDash">
      {stats && (
        <div className="dashStatsRow">
          <StatCard label="Total Balance"   {...fmt(stats.balance)}      sub={`${stats.txCount} transactions`} accent="#8fbc8f" />
          <StatCard label="Monthly Budget"  {...fmt(monthlyBudget ?? 0)} sub="this month's total"              accent="#66bb6a" />
          <StatCard label="Shared Bills"    {...fmt(sharedBillsOwed)}    sub="you still owe"                   accent="#b7d4b3" />
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

        <div className="dashGoalsBox">
          <div className="dashSectionHeader">
            <h2>Savings Goals</h2>
          </div>
          <GoalsOverview goals={goals} />
        </div>
      </div>
    </div>
  );
}

export default StudentDashBoard;