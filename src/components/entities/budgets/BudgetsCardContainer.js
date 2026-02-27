import BudgetsCard from "./BudgetsCard";
import "./BudgetsCardContainer.css";

function BudgetsCardContainer({ budgets, onSelect, actions }) {
  return (
    <>
      <div className="actionTray">{actions}</div>
      <div className="budgetsCardContainer">
        {budgets.map((budget) => (
          <BudgetsCard
            key={budget.BudgetID}
            budget={budget}
            onClick={() => onSelect(budget)}
          />
        ))}
      </div>
    </>
  );
}

export default BudgetsCardContainer;
