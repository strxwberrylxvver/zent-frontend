import Action from "../../UI/Actions";
import "./TransactionView.css";

function TransactionView({ transaction, onEdit, onDelete, onClose }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  return (
    <div className="transactionView">
      <div className="row">
        <h3>Name:</h3>
        <p>{transaction.Name} </p>
      </div>

      <div className="row">
        <h3>Date:</h3>
        <p>{formatDate(transaction.Date)}</p>
      </div>

      <div className="row">
      <h3>Amount:</h3>
        <p> £{transaction.Amount}</p>
      </div>

      <div className="row">
        <h3>Category:</h3> 
        <p>{transaction.Category}</p>
      </div>

      <div className="row">
        <h3>Payment Method:</h3>
        <p>{transaction.PaymentMethod}</p>
      </div>

      <Action.Tray>
        <Action.Edit showText onClick={onEdit} />
        <Action.Delete showText onClick={onDelete} />
        <Action.Cancel showText onClick={onClose} />
      </Action.Tray>
    </div>
  );
}
export default TransactionView;
