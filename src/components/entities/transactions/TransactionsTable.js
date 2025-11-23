import "./TransactionsTable.css";

function TransactionsTable({ transactions }) {
  return (
    <div className="transactionBox">
      <h2>Spending History</h2>
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
            <tr key={transactions.TransactionID}>
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
