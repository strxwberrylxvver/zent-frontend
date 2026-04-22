import GoalsCrudler from "../entities/savingsgoals/GoalsCrudler";
import { useAuth } from "../auth/useAuth";

function Goals() {
  const {user} = useAuth();
  const goalsendpoint = `/savingsgoals/users/${user?.userID}`;
  return (
    <section>
      <section className="goalsPageView">
        <h1>Savings Goals</h1>
        <div className="caption">
          <p>An overview of your savings goals</p>
        </div>
        <GoalsCrudler endpoint={goalsendpoint} showTitle={false}/>
      </section>
    </section>
  );
}

export default Goals;
