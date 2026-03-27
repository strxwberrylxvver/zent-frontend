import GoalsCrudler from "../entities/savingsgoals/GoalsCrudler";
import { useAuth } from "../auth/useAuth";

function Goals() {
  const {user} = useAuth();
  const goalsendpoint = `/savingsgoals/users/${user?.UserID}`;
  return (
    <section>
      <section className="goalsPageView">
        <h1>Savings Goals</h1>
        <GoalsCrudler endpoint={goalsendpoint} showTitle={false}/>
      </section>
    </section>
  );
}

export default Goals;
