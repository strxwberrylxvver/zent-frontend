import GoalsCard from "./GoalsCard";
import "./GoalsCardContainer.css";

function GoalsCardContainer({ goals, onSelect, actions }) {
  return (
    <>
      <div className="actionTray">{actions}</div>
      <div className="goalsCardContainer">
        {goals.map((goal) => (
          <GoalsCard
            key={goal.GoalID}
            goal={goal}
            onClick={() => onSelect(goal)}
          />
        ))}
      </div>
    </>
  );
}

export default GoalsCardContainer;
