import "./TransactionsCrudler.css";
import useLoad from "../../api/useLoad.js";
import TransactionForm from "./TransactionsForm.js";
import Action from "../../UI/Actions.js";
import TransactionsTable from "./TransactionsTable";
import { useModal, Modal } from "../../UI/Modal.js";

export default function TransactionsCrudler({ endpoint }) {
  const [transactions, , loadingMessage, loadTransactions] = useLoad(endpoint);
  const [showDetails, , openDetails, closeDetails] = useModal(false);

  const handleAdd = () => openDetails();
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
        <TransactionsTable transactions={transactions} actions ={<Action.Tray>
          <Action.Add showText onClick={handleAdd} />
        </Action.Tray>} />
      )}
      {/* <Action.Tray>
        <Action.Add showText onClick={handleAdd} />
      </Action.Tray> */}
      {showDetails && (
        <Modal show={showDetails} title={<h1>Add new transaction</h1>}>
          <TransactionForm onCancel={handleCancel} onSuccess={handleSuccess} />
        </Modal>
      )}
    </section>
  );
}
