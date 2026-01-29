import PropTypes from "prop-types";
import "./GoalsCard.css";

function GoalsCard({ goal }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  return (
    <div className="goalsCard">
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
    </div>
  );
}

GoalsCard.prototypes = {
  goal: PropTypes.shape({
    GoalName: PropTypes.string.isRequired,
  }).isRequired,
};
export default GoalsCard;
