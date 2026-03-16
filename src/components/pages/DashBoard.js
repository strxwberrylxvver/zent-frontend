import GoalsCrudler from "../entities/savingsgoals/GoalsCrudler";
import TransactionsTable from "../entities/transactions/TransactionsTable";
import useLoad from "../api/useLoad";
import "./DashBoard.css";

function DashBoard() {
  const loggedinUserID = "c41b8df7-8e57-4744-aa3c-215657baf916";
  const transactionsEndpoint = `/transactions/users/${loggedinUserID}`;
  const goalsEndpoint = `/savingsgoals/users/${loggedinUserID}`;
  const [transactions] = useLoad(transactionsEndpoint);

  return (
    <section className="dashboard">
      <h1>Welcome back, Merrone</h1>

      <div className="dashboardGrid">
        <div className="dashTransactions">
          <div className="TransactionCrudler">
            <div className="dashSectionHeader">
              <h2>Recent Transactions</h2>
            </div>
            {!transactions ? (
              <p>Loading...</p>
            ) : transactions.length === 0 ? (
              <p>No transactions.</p>
            ) : (
              <TransactionsTable
                transactions={[...transactions]
                  .sort((a, b) => new Date(b.Date) - new Date(a.Date))
                  .slice(0, 8)}
                onSelect={() => {}}
              />
            )}
          </div>
        </div>

        <div className="dashGoals">
          <GoalsCrudler endpoint={goalsEndpoint} />
        </div>
      </div>
    </section>
  );
}

export default DashBoard;
