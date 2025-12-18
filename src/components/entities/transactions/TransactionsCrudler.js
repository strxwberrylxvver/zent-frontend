import "./TransactionsCrudler.css";
import { useState } from "react";
import { API } from "../../api/API.js";
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

  // const handleDelete = async (id) => {
  //   const response = await API.delete(`${"/transactions"}/${id}`);
  //   loadTransactions(endpoint);
  //   handleCancel();
  // };
  // const showDeleteModal = (id) => showDetails(
  //   {
  //     show: true,
  //     title: "Confirmation Request",
  //     content: <h3> Are you sure you want to delete this transaction? </h3>,
  //     actions: [
  //       <Action.Yes showText onClick={()=>handleDelete(id)} />,
  //       <Action.No showText onClick={closeDetails} />
  //     ]
  //   }
  // );

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
    setSelectedTransaction(null);
    await loadTransactions(endpoint);
  };

  return (
    <section className="TransactionCrudler">
      {!transactions ? (
        <p>{loadingMessage}</p>
      ) : transactions.length === 0 ? (
        <p>No transactions.</p>
      ) : (
        <TransactionsTable
          transactions={transactions}
          onSelect={handleSelect}
          actions={
            <Action.Tray>
              <Action.Add showText onClick={handleAdd} />
            </Action.Tray>
          }
        />
      )}
      {showDetails && (
        <Modal
          show={showDetails}
          title={
            mode === "add" ? (
              <h1>Add new transaction</h1>
            ) : mode === "view" ? (
              <h1>Transaction details</h1>
            ) : mode === "edit" ? (
              <h1>Edit transaction</h1>
            ) : mode === "delete" ? (
              <h1>Delete transaction</h1>
            ) : null
          }
        >
          {mode === "add" && (
            <TransactionForm
              onCancel={handleCancel}
              onSuccess={handleSuccess}
            />
          )}

          {mode === "view" && selectedTransaction && (
            <TransactionView
              transaction={selectedTransaction}
              onEdit={() => setMode("edit")}
              onDelete={() => setMode("delete")}
              onClose={handleCancel}
            />
          )}

          {mode === "edit" && selectedTransaction && (
            <TransactionForm
              initialTransaction={selectedTransaction}
              onCancel={() => setMode("view")}
              onSuccess={handleSuccess}
              reloadTransactions={() => {
                loadTransactions(endpoint);
              }}
            />
          )}
          {mode === "delete" && selectedTransaction && (
            <>
              <p>Are you sure you want to delete this transaction?</p>

              <Action.Tray>
                <Action.Yes
                  showText
                  onClick={async () => {
                    await API.delete(
                      `/transactions/${selectedTransaction.TransactionID}`
                    );
                    await loadTransactions(endpoint);
                    closeDetails();
                    setSelectedTransaction(null);
                    setMode("add");
                  }}
                />
                <Action.No showText onClick={() => setMode("view")} />
              </Action.Tray>
            </>
          )}
        </Modal>
      )}
    </section>
  );
}
