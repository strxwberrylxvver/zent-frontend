import "./BudgetsCard.css";

function CircleProgress({ pct, spent }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="circleProgress">
      <svg viewBox="0 0 90 90">
        <circle className="track" cx="45" cy="45" r={r} />
        <circle
          className="fill"
          cx="45"
          cy="45"
          r={r}
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="circleLabel">
        <span className="pctText">{pct}% spent</span>
        <span className="amtText">£{spent}</span>
      </div>
    </div>
  );
}

function BudgetsCard({ budget, onClick }) {
  const { BudgetName, UsedAmount, TotalAmount } = budget;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const used = parseFloat(UsedAmount) || 0;
  const total = parseFloat(TotalAmount) || 1;
  const pct = Math.min(Math.round((used / total) * 100), 100);
  const remaining = (total - used).toFixed(2);

  return (
    <div className="budgetCard">
      <h2 className="budgetCardName">{BudgetName}</h2>

      <button className="editBtn" onClick={onClick}>
        ✎
      </button>

      <div className="budgetCardBody">
        <CircleProgress pct={pct} spent={used.toFixed(2)} />

        <div className="budgetDetails">
          <div className="detailLabel">
            <p>Remaining</p>
          </div>
          <div className="remainingAmt">
            <p>£{remaining}</p>
          </div>
          <div className="totalAmt">
            <p>/£{total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetsCard;
