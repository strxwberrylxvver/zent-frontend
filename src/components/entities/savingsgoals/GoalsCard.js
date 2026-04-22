import "./GoalsCard.css";

function GoalsCard({ goal, onClick }) {
  const { GoalName, SavedAmount, TargetAmount, TargetDate } = goal;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  const saved = parseFloat(SavedAmount) || 0;
  const target = parseFloat(TargetAmount) || 1;
  const pct = Math.min(Math.round((saved / target) * 100), 100);
  const remaining = (target - saved).toFixed(2);
  const isComplete = saved >= target;

  return (
    <div className={`goalsCard ${isComplete ? "goalsCardComplete" : ""}`}>
      <div className="goalsCardTop">
        <h2 className="goalsCardName">{GoalName}</h2>
        <div className="goalsCardRight">
          {isComplete && <span className="goalsCardBadge">✓ Complete</span>}
          <button className="goalEditBtn" onClick={onClick}>✎</button>
        </div>
      </div>

      <p className="goalDateLabel">Due {formatDate(TargetDate)}</p>

      <div className="goalsCardAmounts">
        <span className="goalRemainingAmt">£{remaining}</span>
        <span className="goalTotalAmt"> / £{target.toFixed(2)} remaining</span>
      </div>

      <div className="goalsProgressBarWrap">
        <div className="goalsProgressFill" style={{ width: `${pct}%` }} />
        <span className="goalsProgressLabel">{pct}%</span>
      </div>

      <p className="goalsSavedLabel">£{saved.toFixed(2)} saved of £{target.toFixed(2)}</p>
    </div>
  );
}

export default GoalsCard;