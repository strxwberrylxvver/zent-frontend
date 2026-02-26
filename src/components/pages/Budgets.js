import BudgetsCrudler from "../entities/budgets/BudgetsCrudler.js";

function Budgets() {
  const loggedinUserID = "c41b8df7-8e57-4744-aa3c-215657baf916";
  const budgetsendpoint = `/budgets/users/${loggedinUserID}`;
  return (
    <section>
      <section className="budgetsPageView">
        <h1>Budgets</h1>
        <BudgetsCrudler endpoint={budgetsendpoint} />
      </section>
    </section>
  );
}

export default Budgets;
