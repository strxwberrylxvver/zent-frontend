import GoalsCrudler from "../entities/savingsgoals/GoalsCrudler";
import TransactionsCrudler from "../entities/transactions/TransactionsCrudler";

function DashBoard() {
  const loggedinUserID = "c41b8df7-8e57-4744-aa3c-215657baf916";
  const transactionsendpoint = `/transactions/users/${loggedinUserID}`;
  const goalsendpoint = `/savingsgoals/users/${loggedinUserID}`;

  return (
    <section>
      <h1>Welcome back, Merrone</h1>
      <TransactionsCrudler endpoint={transactionsendpoint} />
      <GoalsCrudler endpoint={goalsendpoint} />
    </section>
  );
}
export default DashBoard;
