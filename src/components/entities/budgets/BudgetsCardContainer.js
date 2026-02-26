import BudgetsCard from "./BudgetsCard";

function BudgetsCardContainer({ budgets }) {
    return (
      <>
        <div className="budgetsCardContainer">
          {budgets.map((budget) => (
            <BudgetsCard
              key={budget.BudgetID}
              budget={budget}
            />
          ))}
        </div>
      </>
    );
  }
  
  export default BudgetsCardContainer;
  