import { useState } from "react";
import PropTypes from "prop-types";
import FormItem from "../../UI/Form";
import { API } from "../../api/API";
import Action from "../../UI/Actions";

const emptyGoal = {
  GoalName: "",
  SavedAmount: 0,
  TargetAmount: 0,
  TargetDate: "",
  UserID: "c41b8df7-8e57-4744-aa3c-215657baf916",
};

export default function GoalForm({
  initialGoal = emptyGoal,
  onCancel,
  onSuccess,
  reloadGoals,
}) {
  const isEdit = Boolean(initialGoal.GoalID);

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  const isValid = {
    GoalName: (name) => name.trim().length > 2,
    SavedAmount: (amount) => amount !== 0 && !isNaN(amount),
    TargetAmount: (amount) => amount !== 0 && !isNaN(amount),
    TargetDate: (date) => Boolean(date),
  };
  const errorMessage = {
    GoalName: "Your goal name is too short",
    SavedAmount: "Your amount is invalid",
    TargetAmount: "Your amount is invalid",
    TargetDate: "Your date is invalid",
  };

  const [goal, setgoal] = useState({
    ...initialGoal,
    TargetDate: formatDateForInput(initialGoal.TargetDate),
  });
  const [errors, setErrors] = useState(
    Object.keys(initialGoal).reduce(
      (accum, key) => ({ ...accum, [key]: null }),
      {}
    )
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = name === "Amount" ? parseFloat(value) : value;
    setgoal({ ...goal, [name]: newValue });
    setErrors({
      ...errors,
      [name]: isValid[name]
        ? isValid[name](newValue)
          ? null
          : errorMessage[name]
        : null,
    });
  };

  const validateAll = () => {
    const newErrors = {};

    for (const key in isValid) {
      const value = goal[key];
      newErrors[key] = isValid[key](value) ? null : errorMessage[key];
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((e) => e === null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateAll()) return;
    let result;
    if (isEdit) {
      result = await API.put(`/savingsgoals/${goal.GoalID}`, goal);
      reloadGoals();
    } else {
      result = await API.post("/savingsgoals", goal);
    }
    if (result.isSuccess) onSuccess();
    else alert(result.message);
  };

  return (
    <form className="BorderedForm">
      <FormItem
        label="Goal Name"
        htmlFor="GoalName"
        advice="Please enter the name of the goal"
        error={errors.GoalName}
      >
        <input
          type="text"
          name="GoalName"
          placeholder="Netflix..."
          value={goal.GoalName}
          onChange={handleChange}
        />
      </FormItem>
      <br></br>

      <FormItem
        label="Amount saved"
        htmlFor="SavedAmount"
        advice="Please enter the saved amount"
        error={errors.SavedAmount}
      >
        <input
          type="number"
          step="0.01"
          name="SavedAmount"
          placeholder="PPlease enter the saved amount"
          value={goal.SavedAmount}
          onChange={handleChange}
        />
      </FormItem>

      <br></br>
      <FormItem
        label="Target amount"
        htmlFor="TargetAmount"
        advice="Please enter the target amount of the goal"
        error={errors.TargetAmount}
      >
        <input
          type="number"
          step="0.01"
          name="TargetAmount"
          placeholder="Please enter the target amount of the goal"
          value={goal.TargetAmount}
          onChange={handleChange}
        />
      </FormItem>
      <br></br>

      <FormItem
        label="Target date"
        htmlFor="TargetDate"
        advice="Please enter the target date of the goal"
        error={errors.TargetDate}
      >
        <input
          type="date"
          name="TargetDate"
          placeholder="Please enter the target date of the goal"
          value={goal.TargetDate}
          onChange={handleChange}
        />
      </FormItem>
      <br></br>

      <Action.Tray>
        <Action.Submit showText buttonText="Submit" onClick={handleSubmit} />
        <Action.Cancel showText buttonText="Cancel" onClick={onCancel} />
      </Action.Tray>
    </form>
  );
}

GoalForm.propTypes = {
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
};
