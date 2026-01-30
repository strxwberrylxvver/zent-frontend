import "./GoalsCard.css";

function GoalsCard({ goal, onClick }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const progress = (goal.SavedAmount / goal.TargetAmount) * 100;
  return (
    <div className="goalsCard" onClick={onClick}>
      <div className="goalHeader">
        <h3> {goal.GoalName}</h3>
      </div>
      <div className="goalDate">
        <h3> {formatDate(goal.TargetDate)}</h3>
      </div>
      <div className="goalAmount">
        <h3>
          £{goal.SavedAmount} / £{goal.TargetAmount} saved
        </h3>
      </div>
      <div className="progressBar">
        <div className="progressFill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export default GoalsCard;
