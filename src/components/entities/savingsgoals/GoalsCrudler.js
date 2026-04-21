import useLoad from "../../api/useLoad";
import { useState } from "react";
import { API } from "../../api/API.js";
import GoalsForm from "./GoalsForm";
import GoalView from "./GoalView.js";
import Action from "../../UI/Actions.js";
import { useModal, Modal } from "../../UI/Modal.js";
import GoalsCardContainer from "./GoalsCardContainer.js";
import useFilters, { buildQueryString, currentMonth } from "../../api/useFilters.js";
import "./GoalsCrudler.css";

function GoalsCrudler({ endpoint, showTitle = true }) {
  const { filters, setFilter, reset } = useFilters({ month: currentMonth() });
  const filteredEndpoint = endpoint + buildQueryString(filters);

  const [goals, , loadingMessage, loadGoals] = useLoad(filteredEndpoint);
  const [showDetails, , openDetails, closeDetails] = useModal(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [mode, setMode] = useState("add");

  const handleAdd = () => { setSelectedGoal(null); setMode("add"); openDetails(); };
  const handleSelect = (goal) => { setSelectedGoal(goal); setMode("view"); openDetails(); };
  const handleCancel = () => closeDetails();
  const handleSuccess = async () => {
    closeDetails();
    setSelectedGoal(null);
    await loadGoals(filteredEndpoint);
  };

  return (
    <section className="goalsCrudler">
      {showTitle && <h2>Savings Goals</h2>}
      <div className="goalsCards">
        {!goals ? (
          <p>{loadingMessage}</p>
        ) : (
          <GoalsCardContainer
            goals={goals}
            onSelect={handleSelect}
            onAdd={handleAdd}
            filters={filters}
            onFilterChange={setFilter}
            onReset={reset}
          />
        )}
        {showDetails && (
          <Modal
            show={showDetails}
            title={
              mode === "add"    ? <h1>Add new savings goal</h1>
              : mode === "view" ? <h1>Savings goal details</h1>
              : mode === "edit" ? <h1>Edit savings goal</h1>
              : <h1>Delete savings goal</h1>
            }
          >
            {mode === "add" && (
              <GoalsForm onCancel={handleCancel} onSuccess={handleSuccess} />
            )}
            {mode === "view" && selectedGoal && (
              <GoalView
                goal={selectedGoal}
                onEdit={() => setMode("edit")}
                onDelete={() => setMode("delete")}
                onClose={handleCancel}
              />
            )}
            {mode === "edit" && selectedGoal && (
              <GoalsForm
                initialGoal={selectedGoal}
                onCancel={() => setMode("view")}
                onSuccess={handleSuccess}
                reloadGoals={() => loadGoals(filteredEndpoint)}
              />
            )}
            {mode === "delete" && selectedGoal && (
              <>
                <p>Are you sure you want to delete this goal?</p>
                <Action.Tray>
                  <Action.Yes showText onClick={async () => {
                    await API.delete(`/savingsgoals/${selectedGoal.GoalID}`);
                    await loadGoals(filteredEndpoint);
                    closeDetails();
                    setSelectedGoal(null);
                    setMode("add");
                  }} />
                  <Action.No showText onClick={() => setMode("view")} />
                </Action.Tray>
              </>
            )}
          </Modal>
        )}
      </div>
    </section>
  );
}

export default GoalsCrudler;