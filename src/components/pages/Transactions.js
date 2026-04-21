import TransactionsCrudler from "../entities/transactions/TransactionsCrudler.js";
import "../../global.css";
import { useAuth } from "../auth/useAuth";

function Transactions() {
  const {user} = useAuth();
  const transactionsendpoint = `/transactions/users/${user?.userID}`;
  
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

export default Transactions;

