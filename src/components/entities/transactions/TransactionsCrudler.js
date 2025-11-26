import "./TransactionsCrudler.css";
import { useEffect, useState } from "react";
import { API } from "../../api/API.js";
import TransactionForm from "./TransactionsForm.js";
import Action from "../../UI/Actions.js";
import TransactionsTable from "./TransactionsTable";
import { useModal, Modal } from "../../UI/Modal.js";

export default function TransactionsCrudler({ endpoint }) {
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
    <section className="TransactionCrudler">
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
        <Modal show={showDetails} title={<h1>"Add new transaction"</h1>}>
          <TransactionForm onCancel={handleCancel} onSuccess={handleSuccess} />
        </Modal>
      )}
    </section>
  );
}
