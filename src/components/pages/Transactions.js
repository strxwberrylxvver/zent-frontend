import TransactionsCrudler from "../entities/transactions/TransactionsCrudler.js";
import "./Transactions.css";
function Budgets() {
  const loggedinUserID = "c41b8df7-8e57-4744-aa3c-215657baf916";
  const transactionsendpoint = `/transactions/users/${loggedinUserID}`;
  return (
    <section>
      <section className="transactionPageView">
        <h1>Transactions</h1>
        <div className="caption">
          <p>Overview of your transactions</p>
        </div>
        <TransactionsCrudler endpoint={transactionsendpoint} />
      </section>
    </section>
  );
}

export default Budgets;
