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
import useFilters, { buildQueryString, currentMonth } from "../../api/useFilters.js";
import EmptyState from "../../UI/EmptyState.js";
import "./BudgetsCrudler.css";

function BudgetsCrudler({ endpoint, showTitle = true }) {
  const { filters, setFilter, reset } = useFilters({ month: currentMonth() });
  const filteredEndpoint = endpoint + buildQueryString(filters);

  const [budgets, , loadingMessage, loadBudgets] = useLoad(filteredEndpoint);
  const [showDetails, , openDetails, closeDetails] = useModal(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [mode, setMode] = useState("add");
  const [transactions] = useLoad("/transactions");

  const handleAdd = () => { setSelectedBudget(null); setMode("add"); openDetails(); };
  const handleSelect = (budget) => { setSelectedBudget(budget); setMode("view"); openDetails(); };
  const handleCancel = () => closeDetails();
  const handleSuccess = async () => {
    closeDetails();
    setSelectedBudget(null);
    await loadBudgets(filteredEndpoint);
  };

  return (
    <section className="budgetsCrudler">
      {showTitle}
      <div className="budgetsCards">
        <div className="contentArea">
          <div className="mainSection">
            {!budgets ? (
              <p>{loadingMessage}</p>
            ) : (
              <BudgetsCardContainer
                budgets={budgets}
                onSelect={handleSelect}
                onClick={handleAdd}
                filters={filters}
                onFilterChange={setFilter}
                onReset={reset}
              />
            )}
            {showDetails && (
              <Modal
                show={showDetails}
                title={
                  mode === "add"    ? <h2>Add new budget</h2>
                  : mode === "view" ? <h2>Budget details</h2>
                  : mode === "edit" ? <h2>Edit budget</h2>
                  : <h2>Delete budget</h2>
                }
              >
                {mode === "add" && (
                  <BudgetsForm onCancel={handleCancel} onSuccess={handleSuccess} />
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
                    reloadBudgets={() => loadBudgets(filteredEndpoint)}
                  />
                )}
                {mode === "delete" && selectedBudget && (
                  <>
                    <p>Are you sure you want to delete this budget?</p>
                    <Action.Tray>
                      <Action.Yes showText onClick={async () => {
                        await API.delete(`/savingsgoals/${selectedBudget.BudgetID}`);
                        await loadBudgets(filteredEndpoint);
                        closeDetails();
                        setSelectedBudget(null);
                        setMode("add");
                      }} />
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