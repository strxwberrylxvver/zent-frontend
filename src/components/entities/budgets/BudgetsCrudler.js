import useLoad from "../../api/useLoad";
import BudgetsCardContainer from "./BudgetsCardContainer.js";
import "./BudgetsCrudler.css";
import Action from "../../UI/Actions.js";

function BudgetsCrudler({ endpoint }) {
  const [budgets, , loadingMessage] = useLoad(endpoint);

  return (
    <section className="budgetsCrudler">
      <div className="budgetsCards">
        <p>space for calendar, sorting/filtering, amount and reset all</p>
        <Action.Tray>
          <Action.Add showText />
        </Action.Tray>
        {!budgets ? (
          <p>{loadingMessage}</p>
        ) : budgets.length === 0 ? (
          <p>No goals.</p>
        ) : (
          <BudgetsCardContainer budgets={budgets} />
        )}
      </div>
    </section>
  );
}
export default BudgetsCrudler;
