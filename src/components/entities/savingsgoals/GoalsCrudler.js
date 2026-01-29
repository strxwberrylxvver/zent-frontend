import useLoad from "../../api/useLoad";
import GoalsCard from "./GoalsCard";
import "./GoalsCrudler.css";

function GoalsCrudler({ endpoint }) {
  const [goals, , loadingMessage] = useLoad(endpoint);

  return (
    <section className="goalsCrudler">
      <h2>Savings Goals</h2>
      <div className="goalsCards">
        {!goals ? (
          <p>{loadingMessage}</p>
        ) : goals.length === 0 ? (
          <p>No goals.</p>
        ) : (
          goals.map((goal) => <GoalsCard key={goal.GoalID} goal={goal} />)
        )}
      </div>
    </section>
  );
}
export default GoalsCrudler;
