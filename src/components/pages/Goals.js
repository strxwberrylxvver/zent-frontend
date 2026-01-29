import GoalsCrudler from "../entities/savingsgoals/GoalsCrudler";

function Goals() {
  const loggedinUserID = "c41b8df7-8e57-4744-aa3c-215657baf916";
  const goalsendpoint = `/savingsgoals/users/${loggedinUserID}`;
  return (
    <section>
      <h1>Savings Goals</h1>
      <GoalsCrudler endpoint={goalsendpoint} />
    </section>
  );
}

export default Goals;
