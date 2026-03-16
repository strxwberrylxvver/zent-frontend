import "./TransactionsTable.css";

function TransactionsTable({ transactions, onSelect }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatAmount = (amount) => {
    const val = parseFloat(amount);
    const sign = val >= 0 ? "+" : "";
    return `${sign}£${Math.abs(val).toFixed(2)}`;
  };

  return (
    <div className="transactionBox">
      <table className="transactionTable">
        
        <thead>
          <tr>
            <th>NAME</th>
            <th>DATE</th>
            <th>AMOUNT</th>
            <th>CATEGORY</th>
            <th>PAYMENT METHOD</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.TransactionID} onClick={() => onSelect(transaction)}>
              <td>{transaction.Name}</td>
              <td>{formatDate(transaction.Date)}</td>
              <td className={parseFloat(transaction.Amount) >= 0 ? "amountPositive" : "amountNegative"}>
                {formatAmount(transaction.Amount)}
              </td>
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