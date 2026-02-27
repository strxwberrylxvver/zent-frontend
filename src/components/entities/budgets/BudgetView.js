import Action from "../../UI/Actions";

function BudgetView({ budget, onEdit, onDelete, onClose }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  return (
    <div className="BudgetView">
      <div className="row">
        <h3>Name:</h3>
        <p>{budget.BudgetName} </p>
      </div>

      <div className="row">
        <h3>Used Amount:</h3>
        <p> £{budget.UsedAmount}</p>
      </div>

      <div className="row">
        <h3>Total Amount:</h3>
        <p> £{budget.TotalAmount}</p>
      </div>

      <div className="row">
        <h3>Date:</h3>
        <p>{formatDate(budget.BudgetDate)}</p>
      </div>

      <Action.Tray>
        <Action.Edit showText onClick={onEdit} />
        <Action.Delete showText onClick={onDelete} />
        <Action.Cancel showText onClick={onClose} />
      </Action.Tray>
    </div>
  );
}
export default BudgetView;
