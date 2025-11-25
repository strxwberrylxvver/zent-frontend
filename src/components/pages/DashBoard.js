import { useEffect, useState } from "react";
import { API } from "../api/API";
import TransactionForm from "../entities/transactions/TransactionsForm.js";
import Action from "../UI/Actions.js";
import TransactionsTable from "../entities/transactions/TransactionsTable";
import { useModal, Modal } from "../UI/Modal.js";

function DashBoard() {
  const loggedinUserID = "c41b8df7-8e57-4744-aa3c-215657baf916";
  const endpoint = `/transactions/users/${loggedinUserID}`;

  const [transactions, setTransactions] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading records...");
  const [showDetails, , openDetails, closeDetails] = useModal(false);

  const apiCall = async (endpoint) => {
    const response = await API.get(endpoint);
    response.isSuccess
      ? setTransactions(response.result)
      : setLoadingMessage(response.message);
  };

  const handleAdd = () => openDetails();
  const handleCancel = () => closeDetails();
  const handleSuccess = async () => {
    closeDetails();
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
      {showDetails && (
        <Modal show={showDetails}>
          <TransactionForm onCancel={handleCancel} onSuccess={handleSuccess} />
        </Modal>
      )}
    </section>
  );
}
export default DashBoard;
