import "./TransactionsCrudler.css";
import { useState } from "react";
import useLoad from "../../api/useLoad.js";
import TransactionForm from "./TransactionsForm.js";
import TransactionView from "./TransactionView.js";
import Action from "../../UI/Actions.js";
import TransactionsTable from "./TransactionsTable";
import { useModal, Modal } from "../../UI/Modal.js";

export default function TransactionsCrudler({ endpoint }) {
  const [transactions, , loadingMessage, loadTransactions] = useLoad(endpoint);
  const [showDetails, , openDetails, closeDetails] = useModal(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [mode, setMode] = useState("add");

  const handleAdd = () => {
    setSelectedTransaction(null);
    setMode("add");
    openDetails();
  };

  const handleSelect = (transaction) => {
    setSelectedTransaction(transaction);
    setMode("view");
    openDetails();
  };
  
    const handleCancel = () => closeDetails();
  const handleSuccess = async () => {
    closeDetails();
    await loadTransactions(endpoint);
  };

  return (
    <section className="TransactionCrudler">
      {!transactions ? (
        <p>{loadingMessage}</p>
      ) : transactions.length === 0 ? (
        <p>No transactions.</p>
      ) : (
        <TransactionsTable transactions={transactions} onSelect={handleSelect} actions ={<Action.Tray>
          <Action.Add showText onClick={handleAdd} />
        </Action.Tray>} />
      )}
      {showDetails && (
  <Modal
    show={showDetails}
    title={
      mode === "add"
        ? <h1>Add new transaction</h1>
        : mode === "view"
        ? <h1>Transaction details</h1>
        : <h1>Edit transaction</h1>
    }
  >
    {mode === "add" && (
      <TransactionForm
        onCancel={closeDetails}
        onSuccess={handleSuccess}
      />
    )}

    {mode === "view" && selectedTransaction && (
      <TransactionView
        transaction={selectedTransaction}
        onEdit={() => setMode("edit")}
        onDelete={() => alert("Delete coming soon")}
        onClose={closeDetails}
      />
    )}

    {mode === "edit" && selectedTransaction && (
      <TransactionForm
        initialTransaction={selectedTransaction}
        onCancel={() => setMode("view")}
        onSuccess={handleSuccess}
      />
    )}
  </Modal>
)}

    </section>
  );
}
