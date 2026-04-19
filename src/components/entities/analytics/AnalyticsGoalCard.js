import "./AnalyticsGoalCard.css";

function AnalyticsGoalCard({ goal }) {
  const saved = parseFloat(goal.SavedAmount) || 0;
  const target = parseFloat(goal.TargetAmount) || 1;
  const pct = Math.min(Math.round((saved / target) * 100), 100);
  const remaining = Math.max(target - saved, 0);
  const daysLeft = goal.TargetDate
    ? Math.ceil((new Date(goal.TargetDate) - Date.now()) / 86400000)
    : null;
  const isComplete = pct >= 100;

  return (
    <div className={`analyticsGoalCard${isComplete ? " analyticsGoalCard--complete" : ""}`}>
      <div className="analyticsGoalHeader">
        <span className="analyticsGoalName">{goal.GoalName}</span>
        <span className="analyticsGoalPct">{pct}%</span>
      </div>

      <div className="analyticsGoalTrack">
        <div
          className="analyticsGoalFill"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="analyticsGoalMeta">
        <span>£{saved.toFixed(2)} of £{target.toFixed(2)}</span>
        {!isComplete && <span>£{remaining.toFixed(2)} to go</span>}
        {daysLeft !== null && (
          <span className={daysLeft < 30 && !isComplete ? "analyticsGoalUrgent" : ""}>
            {isComplete ? "✓ Complete" : daysLeft > 0 ? `${daysLeft}d left` : "Overdue"}
          </span>
        )}
      </div>
    </div>
  );
}

export default AnalyticsGoalCard;