import "./TransactionsTable.css";

function TransactionsTable({ transactions, actions }) {
  return (
    <div className="transactionBox">
      <div className="tableHeader">
        <h2>Spending History</h2>
        {actions}
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
            <tr key={transaction.TransactionID}>
              <td>{transaction.Name}</td>
              <td>{transaction.Date}</td>
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
