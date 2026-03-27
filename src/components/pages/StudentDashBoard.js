import GoalsCrudler from "../entities/savingsgoals/GoalsCrudler";
import TransactionsTable from "../entities/transactions/TransactionsTable";
import useLoad from "../api/useLoad";
import { useAuth } from "../auth/useAuth";

function StudentDashBoard() {
  const { user } = useAuth();
  const transactionsEndpoint = `/transactions/users/${user?.userID}`;
  const goalsEndpoint = `/savingsgoals/users/${user?.userID}`;
  const [transactions] = useLoad(transactionsEndpoint);

  return (
    <div className="dashboardGrid">
      <div className="dashTransactions">
        <div className="transactionsBox">
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
  );
}

export default StudentDashBoard;