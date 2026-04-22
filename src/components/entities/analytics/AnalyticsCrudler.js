import { useMemo } from "react";
import useLoad from "../../api/useLoad.js";
import { useAuth } from "../../auth/useAuth.js";
import AnalyticsStatCard from "./AnalyticsStatCard.js";
import AnalyticsBarChart from "./AnalyticsBarChart.js";
import AnalyticsCategoryChart from "./AnalyticsCategoryChart.js";
import AnalyticsGoalCard from "./AnalyticsGoalCard.js";
import EmptyState from "../../UI/EmptyState.js";
import "./AnalyticsCrudler.css";

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function useAnalyticsData(transactions, goals) {
  return useMemo(() => {
    if (!transactions || !goals) return null;

    const now = new Date();

    const thisMonth = transactions.filter((t) => {
      const d = new Date(t.Date);
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    });

    const totalSpend = transactions.reduce(
      (s, t) => s + Math.abs(Number(t.Amount)),
      0
    );
    const monthSpend = thisMonth.reduce(
      (s, t) => s + Math.abs(Number(t.Amount)),
      0
    );
    const avgTx = transactions.length ? totalSpend / transactions.length : 0;

    const monthlyMap = {};
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${MONTH_LABELS[d.getMonth()]}`;
      monthlyMap[key] = 0;
    }
    transactions.forEach((t) => {
      const d = new Date(t.Date);
      const key = MONTH_LABELS[d.getMonth()];
      if (key in monthlyMap) monthlyMap[key] += Math.abs(Number(t.Amount));
    });
    const monthly = Object.entries(monthlyMap).map(([label, value]) => ({
      label,
      value,
    }));

    const categoryMap = {};
    transactions.forEach((t) => {
      const cat = t.Category || "Other";
      categoryMap[cat] = (categoryMap[cat] || 0) + Math.abs(Number(t.Amount));
    });
    const categories = Object.entries(categoryMap)
      .sort(([, a], [, b]) => b - a)
      .map(([label, value]) => ({ label, value }));

    return { totalSpend, monthSpend, avgTx, monthly, categories };
  }, [transactions, goals]);
}

function AnalyticsCrudler() {
  const { user } = useAuth();
  const [transactions] = useLoad(`/transactions/users/${user?.userID}`);
  const [goals] = useLoad(`/savingsgoals/users/${user?.userID}`);

  const data = useAnalyticsData(transactions, goals);
  const isLoading = !transactions || !goals;
  const isEmpty = !isLoading && transactions.length === 0 && goals.length === 0;

  const fmt = (n) => `£${Number(n).toFixed(2)}`;

  return (
    <section className="analyticsPage">
      <div className="analyticsHeader"></div>

      {isLoading && <p className="analyticsLoadingText">Loading your data…</p>}

      {isEmpty && (
        <EmptyState
          icon="🌱"
          title="Nothing to show yet"
          message="Add some transactions and savings goals to start seeing your analytics."
        />
      )}

      {!isLoading && !isEmpty && data && (
        <>
          <div className="analyticsStatsRow">
            <AnalyticsStatCard
              label="This Month"
              value={fmt(data.monthSpend)}
              sub={`${
                transactions.filter((t) => {
                  const d = new Date(t.Date);
                  const now = new Date();
                  return (
                    d.getMonth() === now.getMonth() &&
                    d.getFullYear() === now.getFullYear()
                  );
                }).length
              } transactions`}
              accent="#8fbc8f"
            />
            <AnalyticsStatCard
              label="All-Time Spend"
              value={fmt(data.totalSpend)}
              sub={`${transactions.length} total`}
              accent="#b7d4b3"
            />
            <AnalyticsStatCard
              label="Avg. Transaction"
              value={fmt(data.avgTx)}
              accent="#a8d5a2"
            />
            <AnalyticsStatCard
              label="Active Goals"
              value={goals.length}
              sub={`${
                goals.filter((g) => g.SavedAmount >= g.TargetAmount).length
              } completed`}
              accent="#66bb6a"
            />
          </div>

          <div className="analyticsChartsRow">
            <div className="analyticsCard">
              <h2 className="analyticsCardTitle">Spending — Last 6 Months</h2>
              <AnalyticsBarChart data={data.monthly} color="#8fbc8f" />
            </div>

            <div className="analyticsCard">
              <h2 className="analyticsCardTitle">By Category</h2>
              <AnalyticsCategoryChart categories={data.categories} />
            </div>
          </div>

          {goals.length > 0 && (
            <div className="analyticsCard analyticsCard--full">
              <h2 className="analyticsCardTitle">Savings Goals Progress</h2>
              <div className="analyticsGoalsGrid">
                {goals.map((g) => (
                  <AnalyticsGoalCard key={g.GoalID} goal={g} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default AnalyticsCrudler;
