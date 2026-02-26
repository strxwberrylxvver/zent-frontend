function BudgetsCard({budget}) {
  return (
    <div className="budgetCard">
      <div className="budgetHeader">
        <h3>{budget.BudgetName}</h3>
      </div>
    </div>
  );
}

export default BudgetsCard;
