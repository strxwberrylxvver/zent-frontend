import BudgetsCrudler from "../entities/budgets/BudgetsCrudler.js";
import { useAuth } from "../auth/useAuth.js";
import "../../global.css";
function Budgets() {
  const {user} = useAuth();
  const budgetsendpoint = `/budgets/users/${user?.UserID}`;
  return (
    <section>
      <section className="budgetsPageView">
        <h1>Budgets</h1>
        <div className="caption">
          <p>Create and keep track of your budgets</p>
        </div>
        <BudgetsCrudler endpoint={budgetsendpoint} />
      </section>
    </section>
  );
}

export default Budgets;
