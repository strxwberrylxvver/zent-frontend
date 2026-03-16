import "./BudgetRecentTransactions.css";

const categoryColors = {
  Entertainment: "#b7d4b3",
  Groceries: "#8fbc8f",
  Transport: "#a8d5a2",
  Bills: "#c8e6c9",
  Income: "#66bb6a",
  Rent: "#81c784",
  Other: "#b7b5b5",
};

function BudgetRecentTransactions({ transactions }) {
  const recent = [...(transactions || [])]
    .sort((a, b) => new Date(b.Date) - new Date(a.Date))
    .slice(0, 6);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  };

  return (
    <div className="recentTransactions">
      <div className="recentHeader">
        <h3>Recent transactions</h3>
        <span className="recentCount">This month</span>
      </div>
      <div className="recentList">
        {recent.map((t) => (
          <div className="recentItem" key={t.TransactionID}>
            <div
              className="recentDot"
              style={{ backgroundColor: categoryColors[t.Category] || "#b7b5b5" }}
            />
            <div className="recentInfo">
              <p className="recentName">{t.Name}</p>
              <p className="recentCategory">{t.Category}</p>
            </div>
            <div className="recentRight">
              <p className="recentAmount">£{parseFloat(t.Amount).toFixed(2)}</p>
              <p className="recentDate">{formatDate(t.Date)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BudgetRecentTransactions;