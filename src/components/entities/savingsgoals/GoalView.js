import Action from "../../UI/Actions";
import "./GoalView.css";

function GoalView({ goal, onEdit, onDelete, onClose }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  return (
    <div className="GoalView">
      <div className="row">
        <h3>Name:</h3>
        <p>{goal.GoalName} </p>
      </div>

      <div className="row">
        <h3>Saved Amount:</h3>
        <p> £{goal.SavedAmount}</p>
      </div>

      <div className="row">
        <h3>Target Amount:</h3>
        <p> £{goal.TargetAmount}</p>
      </div>

      <div className="row">
        <h3>Date:</h3>
        <p>{formatDate(goal.TargetDate)}</p>
      </div>


      <Action.Tray>
        <Action.Edit showText onClick={onEdit} />
        <Action.Delete showText onClick={onDelete} />
        <Action.Cancel showText onClick={onClose} />
      </Action.Tray>
    </div>
  );
}
export default GoalView;
