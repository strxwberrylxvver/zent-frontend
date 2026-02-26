
function BudgetsCard({ budget }) {
  return (
    <div className="budgetCard">
      <div className="budgetHeader">
        <h3>{budget.BudgetName}</h3>
      </div>
      <div className="budgetHeader">
        <h3>
          {budget.UsedAmount} / {budget.TotalAmount}
        </h3>
      </div>
      <div className="budgetHeader">
        <h3>{budget.BudgetDate}</h3>
      </div>
    </div>
  );
}

export default BudgetsCard;
