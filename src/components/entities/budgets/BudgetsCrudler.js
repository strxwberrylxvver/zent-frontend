import useLoad from "../../api/useLoad";
import BudgetsCardContainer from "./BudgetsCardContainer.js";

function BudgetsCrudler({ endpoint }) {
  const [budgets, , loadingMessage] = useLoad(endpoint);

  return (
    <section className="budgetsCrudler">
      <div className="budgetsCards">
        {!budgets ? (
          <p>{loadingMessage}</p>
        ) : budgets.length === 0 ? (
          <p>No goals.</p>
        ) : (
          <BudgetsCardContainer
            budgets={budgets}
            />
        )}
        
      </div>
    </section>
  );
}
export default BudgetsCrudler;
