import "./TransactionsTable.css";

function TransactionsTable({ transactions }) {

  // const handleAdd = () => setShowNewModuleForm

  return (
    <div className="transactionBox">
      <div className="tableHeader">
      <h2>Spending History</h2>
      {/* <Action.Tray>
        <Action.Add showText onClick = {handleAdd} />
      </Action.Tray> */}
      <button> + </button>
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
