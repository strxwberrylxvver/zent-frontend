import "./TransactionsTable.css";

function TransactionsTable({ transactions, onSelect, actions }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  return (
    <div className="transactionBox">
      <div className="tableHeader">
        <h2>Spending History</h2>
      </div>
      <table className="transactionTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.TransactionID}
              onClick={() => onSelect(transaction)}
            >
              <td>{transaction.Name}</td>
              <td>{formatDate(transaction.Date)}</td>
              <td>{transaction.Amount}</td>
              <td>{transaction.Category}</td>
              <td>{transaction.PaymentMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default TransactionsTable;
