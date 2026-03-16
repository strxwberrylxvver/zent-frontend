import useLoad from "../../api/useLoad";
import { useState } from "react";
import { API } from "../../api/API.js";
import BudgetsForm from "./BudgetsForm";
import BudgetView from "./BudgetView.js";
import { useModal, Modal } from "../../UI/Modal.js";
import BudgetsCardContainer from "./BudgetsCardContainer.js";
import Action from "../../UI/Actions.js";
import BudgetGauge from "./BudgetGauge";
import BudgetRecentTransactions from "./BudgetRecentTransactions";
import "./BudgetsCrudler.css";

function BudgetsCrudler({ endpoint, showTitle = true }) {
  const [budgets, , loadingMessage, loadBudgets] = useLoad(endpoint);
  const [showDetails, , openDetails, closeDetails] = useModal(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [mode, setMode] = useState("add");
  const [transactions] = useLoad("/transactions");

  const handleAdd = () => {
    setSelectedBudget(null);
    setMode("add");
    openDetails();
  };

  const handleSelect = (budget) => {
    setSelectedBudget(budget);
    setMode("view");
    openDetails();
  };

  const handleCancel = () => closeDetails();

  const handleSuccess = async () => {
    closeDetails();
    setSelectedBudget(null);
    await loadBudgets(endpoint);
  };

  return (
    <section className="budgetsCrudler">
      {showTitle}
      <div className="budgetsCards">
        <div className="contentArea">
          <div className="mainSection">
            <div className="topBar"></div>
            {!budgets ? (
              <p>{loadingMessage}</p>
            ) : budgets.length === 0 ? (
              <p>No goals.</p>
            ) : (
              <BudgetsCardContainer
                budgets={budgets}
                onSelect={handleSelect}
                onClick={handleAdd}
              />
            )}
            {showDetails && (
              <Modal
                show={showDetails}
                title={
                  mode === "add" ? (
                    <h1>Add new budget</h1>
                  ) : mode === "view" ? (
                    <h1>Budget details</h1>
                  ) : mode === "edit" ? (
                    <h1>Edit budget</h1>
                  ) : mode === "delete" ? (
                    <h1>Delete budget</h1>
                  ) : null
                }
              >
                {mode === "add" && (
                  <BudgetsForm
                    onCancel={handleCancel}
                    onSuccess={handleSuccess}
                  />
                )}

                {mode === "view" && selectedBudget && (
                  <BudgetView
                    budget={selectedBudget}
                    onEdit={() => setMode("edit")}
                    onDelete={() => setMode("delete")}
                    onClose={handleCancel}
                  />
                )}

                {mode === "edit" && selectedBudget && (
                  <BudgetsForm
                    initialBudget={selectedBudget}
                    onCancel={() => setMode("view")}
                    onSuccess={handleSuccess}
                    reloadBudgets={() => {
                      loadBudgets(endpoint);
                    }}
                  />
                )}
                {mode === "delete" && selectedBudget && (
                  <>
                    <p>Are you sure you want to delete this budget?</p>

                    <Action.Tray>
                      <Action.Yes
                        showText
                        onClick={async () => {
                          await API.delete(
                            `/savingsgoals/${selectedBudget.BudgetID}`
                          );
                          await loadBudgets(endpoint);
                          closeDetails();
                          setSelectedBudget(null);
                          setMode("add");
                        }}
                      />
                      <Action.No showText onClick={() => setMode("view")} />
                    </Action.Tray>
                  </>
                )}
              </Modal>
            )}
          </div>
          <div className="sideSection">
            <BudgetGauge budgets={budgets} />
            <BudgetRecentTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </section>
  );
}
export default BudgetsCrudler;
