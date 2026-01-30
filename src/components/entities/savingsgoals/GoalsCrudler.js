import useLoad from "../../api/useLoad";
import { useState } from "react";
import { API } from "../../api/API.js";
import GoalsCard from "./GoalsCard";
import GoalsForm from "./GoalsForm";
import GoalView from "./GoalView.js";
import Action from "../../UI/Actions.js";
import { useModal, Modal } from "../../UI/Modal.js";
import "./GoalsCrudler.css";

function GoalsCrudler({ endpoint }) {
  const [goals, , loadingMessage, loadGoals] = useLoad(endpoint);
  const [showDetails, , openDetails, closeDetails] = useModal(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [mode, setMode] = useState("add");

  const handleAdd = () => {
    setSelectedGoal(null);
    setMode("add");
    openDetails();
  };

  const handleSelect = (goal) => {
    setSelectedGoal(goal);
    setMode("view");
    openDetails();
  };

  const handleCancel = () => closeDetails();

  const handleSuccess = async () => {
    closeDetails();
    setSelectedGoal(null);
    await loadGoals(endpoint);
  };
  return (
    <section className="goalsCrudler">
      <h2>Savings Goals</h2>
      <div className="goalsCards">
        {!goals ? (
          <p>{loadingMessage}</p>
        ) : goals.length === 0 ? (
          <p>No goals.</p>
        ) : (
          goals.map((goal) => (
            <GoalsCard
              key={goal.GoalID}
              goal={goal}
              onSelect={handleSelect}
              actions={
                <Action.Tray>
                  <Action.Add showText onClick={handleAdd} />
                </Action.Tray>
              }
            />
          ))
        )}
        {showDetails && (
          <Modal
            show={showDetails}
            title={
              mode === "add" ? (
                <h1>Add new savings goal</h1>
              ) : mode === "view" ? (
                <h1>Savings goal details</h1>
              ) : mode === "edit" ? (
                <h1>Edit savings goal</h1>
              ) : mode === "delete" ? (
                <h1>Delete savings goal</h1>
              ) : null
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
                reloadGoals={() => {
                  loadGoals(endpoint);
                }}
              />
            )}
            {mode === "delete" && selectedGoal && (
              <>
                <p>Are you sure you want to delete this goal?</p>

                <Action.Tray>
                  <Action.Yes
                    showText
                    onClick={async () => {
                      await API.delete(`/savingsgoals/${selectedGoal.GoalID}`);
                      await loadGoals(endpoint);
                      closeDetails();
                      setSelectedGoal(null);
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
    </section>
  );
}
export default GoalsCrudler;
