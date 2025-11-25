import { useEffect, useState } from "react";
import { API } from "../api/API";
import TransactionForm from "../entities/transactions/TransactionsForm.js";
import Action from "../UI/Actions.js";
import TransactionsTable from "../entities/transactions/TransactionsTable";

function DashBoard() {
  const loggedinUserID = "c41b8df7-8e57-4744-aa3c-215657baf916";
  const endpoint = `/transactions/users/${loggedinUserID}`;

  const [transactions, setTransactions] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading records...");
  const [ShowNewTransactionForm, setShowNewTransactionForm] = useState(false);

  const apiCall = async (endpoint) => {
    const response = await API.get(endpoint);
    response.isSuccess
      ? setTransactions(response.result)
      : setLoadingMessage(response.message);
  };
  const handleAdd = () => setShowNewTransactionForm(true);
  const handleCancel = () => setShowNewTransactionForm(false);
  const handleSuccess = async () => {
    handleCancel();
    await apiCall(endpoint);
  };

  useEffect(() => {
    apiCall(endpoint);
  }, [endpoint]);

  return (
    <section>
      <h1> Welcome, Merrone </h1>
      {!transactions ? (
        <p>{loadingMessage}</p>
      ) : transactions.length === 0 ? (
        <p>No transactions.</p>
      ) : (
        <TransactionsTable transactions={transactions} />
      )}
      <Action.Tray>
        <Action.Add showText onClick={handleAdd} />
      </Action.Tray>
      {ShowNewTransactionForm && (
        <TransactionForm onCancel={handleCancel} onSuccess={handleSuccess} />
      )}
    </section>
  );
}
export default DashBoard;
